#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const RESERVED = new Set(["index.md", "log.md"]);
const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "before", "can", "did",
  "do", "for", "how", "i", "is", "it", "of", "on", "or", "should",
  "the", "this", "to", "what", "when", "where", "which", "why", "with"
]);
const SECTION_CAVEAT_RE = /^(caveats?|constraints?|warnings?|failure modes?|security|operational notes?|do not|limits?)$/i;
const CAVEAT_LINE_RE = /\b(must not|do not|requires?|required|excluded|only|unless|approval|cannot|should|healthy|shadow|enforce|token|schema|bypass)\b/i;

function usage() {
  console.error(`Usage:
  node knowpack.js check <bundle>
  node knowpack.js context <bundle> "<query>"
  node knowpack.js eval <bundle> <tests.yml>
  node knowpack.js eval <bundle> <tests.yml> --json`);
  process.exit(2);
}

function main() {
  const [command, ...args] = process.argv.slice(2);
  try {
    if (command === "check") {
      const [bundle] = args;
      if (!bundle) usage();
      const result = check(bundle);
      console.log(formatCheck(result));
      process.exit(result.errors.length ? 1 : 0);
    }
    if (command === "context") {
      const [bundle, ...queryParts] = args;
      const query = queryParts.join(" ");
      if (!bundle || !query) usage();
      console.log(JSON.stringify(context(bundle, query), null, 2));
      return;
    }
    if (command === "eval") {
      const json = args.includes("--json");
      const positional = args.filter((arg) => arg !== "--json");
      const [bundle, testsFile] = positional;
      if (!bundle || !testsFile) usage();
      const result = evaluate(bundle, testsFile);
      console.log(json ? JSON.stringify(toEvalJson(result), null, 2) : formatEval(result));
      process.exit(result.result === "pass" ? 0 : 1);
    }
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exit(2);
  }
  usage();
}

function check(bundle) {
  const root = path.resolve(bundle);
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    return {
      bundle: normalizePath(bundle),
      concepts: 0,
      errors: [`bundle path is not a directory: ${bundle}`],
      warnings
    };
  }

  const files = walk(root).filter((file) => file.endsWith(".md"));
  const conceptFiles = files.filter((file) => !RESERVED.has(path.basename(file)));
  const concepts = conceptFiles.map((file) => parseConcept(root, file, normalizePath(path.relative(root, file))));
  const conceptPaths = new Set(concepts.map((concept) => concept.path));

  if (!fs.existsSync(path.join(root, "index.md"))) warnings.push("missing index.md");
  if (!concepts.length) errors.push("no concept files found");

  for (const concept of concepts) {
    if (!concept.hasFrontmatter) errors.push(`${concept.path}: missing YAML frontmatter`);
    if (!concept.type) errors.push(`${concept.path}: missing required frontmatter field type`);
    for (const field of ["title", "description", "resource", "timestamp"]) {
      if (!concept[field]) warnings.push(`${concept.path}: missing recommended frontmatter field ${field}`);
    }
    if (!concept.tags.length) warnings.push(`${concept.path}: missing recommended frontmatter field tags`);
    if (!concept.headings.some((heading) => /^citations$/i.test(heading))) {
      warnings.push(`${concept.path}: missing Citations section`);
    }
    for (const href of concept.rawLinks) {
      const rel = linkTarget(root, concept.path, href);
      if (rel && !conceptPaths.has(rel) && !RESERVED.has(path.basename(rel))) {
        warnings.push(`${concept.path}: broken link ${href}`);
      }
    }
  }

  return { bundle: normalizePath(bundle), concepts: concepts.length, errors, warnings };
}

function context(bundle, query) {
  const root = path.resolve(bundle);
  const health = check(bundle);
  if (health.errors.length) {
    throw new Error(`bundle failed check: ${health.errors.join("; ")}`);
  }
  const concepts = loadBundle(root);
  const ranked = rankConcepts(concepts, query);
  const rankedByPath = new Map(ranked.map((item) => [item.concept.path, item]));
  const primary = ranked
    .filter((item) => item.score > 0 && item.concept.type.toLowerCase() !== "reference")
    .slice(0, 3);
  const selected = new Map();

  for (const item of primary) selected.set(item.concept.path, item.concept);

  for (const item of primary) {
    const type = item.concept.type.toLowerCase();
    if (type === "playbook" || type === "runbook") {
      for (const link of item.concept.links) {
        const linked = concepts.byPath.get(link);
        const linkedRank = rankedByPath.get(link);
        if (linked && linkedRank && linkedRank.score > 0 && linked.type.toLowerCase() !== "reference") {
          selected.set(linked.path, linked);
        }
      }
    }
  }

  for (const concept of Array.from(selected.values())) {
    for (const link of concept.links) {
      const linked = concepts.byPath.get(link);
      if (linked && linked.type.toLowerCase() === "reference" && selected.size < primary.length + 6) {
        selected.set(linked.path, linked);
      }
    }
  }

  return {
    version: "0.1",
    bundle: normalizePath(bundle),
    query,
    status: selected.size ? "ok" : "empty",
    concepts: Array.from(selected.values()).map((concept) => packConcept(concept, ranked)),
    missing: [],
    warnings: demoWarnings(concepts)
  };
}

function evaluate(bundle, testsFile) {
  if (!fs.existsSync(testsFile)) {
    throw new Error(`tests file does not exist: ${testsFile}`);
  }
  const tests = parseRetrievalTests(fs.readFileSync(testsFile, "utf8"));
  if (!tests.length) {
    throw new Error(`no retrieval tests found: ${testsFile}`);
  }
  const results = tests.map((test) => {
    const pack = context(bundle, test.query);
    const paths = new Set(pack.concepts.map((concept) => concept.path));
    const citations = new Set();
    const caveats = [];

    for (const concept of pack.concepts) {
      if (concept.type === "Reference") citations.add(concept.path);
      for (const citation of concept.citations) citations.add(citation);
      for (const caveat of concept.caveats) caveats.push(caveat);
    }

    const requiredConcepts = countRequired(test.require.concepts, paths);
    const requiredCitations = countRequired(test.require.citations, citations);
    const requiredCaveats = countCaveats(test.require.caveats, caveats);
    const forbiddenPresent = (test.forbid.concepts || []).filter((item) => paths.has(item));
    const result = requiredConcepts.missing.length ||
      requiredCitations.missing.length ||
      requiredCaveats.missing.length ||
      forbiddenPresent.length
      ? "fail"
      : "pass";

    return {
      id: test.id,
      query: test.query,
      result,
      requiredConcepts,
      requiredCitations,
      requiredCaveats,
      forbiddenPresent
    };
  });

  return {
    bundle: normalizePath(bundle),
    tests: results,
    result: results.every((test) => test.result === "pass") ? "pass" : "fail"
  };
}

function loadBundle(root) {
  const files = walk(root).filter((file) => file.endsWith(".md"));
  const concepts = [];
  for (const file of files) {
    const rel = normalizePath(path.relative(root, file));
    if (RESERVED.has(path.basename(rel))) continue;
    concepts.push(parseConcept(root, file, rel));
  }

  const byPath = new Map(concepts.map((concept) => [concept.path, concept]));
  for (const concept of concepts) {
    concept.links = concept.rawLinks
      .map((link) => resolveConceptLink(root, concept.path, link))
      .filter((link) => link && byPath.has(link));
  }

  return { root, concepts, byPath };
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function parseConcept(root, file, rel) {
  const text = fs.readFileSync(file, "utf8");
  const { frontmatter, body } = splitFrontmatter(text);
  const meta = parseFrontmatter(frontmatter);
  const headings = Array.from(body.matchAll(/^#{1,6}\s+(.+)$/gm), (match) => match[1].trim());
  const rawLinks = Array.from(body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g), (match) => match[1]);
  return {
    path: rel,
    hasFrontmatter: Boolean(frontmatter),
    type: String(meta.type || ""),
    title: String(meta.title || path.basename(rel, ".md")),
    description: String(meta.description || ""),
    resource: String(meta.resource || ""),
    timestamp: String(meta.timestamp || ""),
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    headings,
    body,
    rawLinks,
    links: [],
    caveats: extractCaveats(body),
    citations: extractCitationLinks(root, rel, body)
  };
}

function splitFrontmatter(text) {
  if (!text.startsWith("---\n")) return { frontmatter: "", body: text };
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return { frontmatter: "", body: text };
  return {
    frontmatter: text.slice(4, end),
    body: text.slice(end + 5)
  };
}

function parseFrontmatter(src) {
  const result = {};
  for (const line of src.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((item) => item.trim()).filter(Boolean);
    }
    result[key] = value;
  }
  return result;
}

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function rankConcepts(bundle, query) {
  const tokens = Array.from(new Set(tokenize(query)));
  const ranked = bundle.concepts.map((concept) => {
    const matches = [];
    let score = 0;
    score += scoreField(tokens, concept.title, 8, "title", matches);
    score += scoreField(tokens, concept.tags.join(" "), 5, "tags", matches);
    score += scoreField(tokens, concept.type, 4, "type", matches);
    score += scoreField(tokens, concept.description, 4, "description", matches);
    score += scoreField(tokens, concept.headings.join(" "), 3, "headings", matches);
    score += scoreField(tokens, concept.path, 3, "path", matches);
    score += scoreField(tokens, concept.body, 1, "body", matches);
    return { concept, score, matches };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const titleDelta = exactTitleHits(b, tokens) - exactTitleHits(a, tokens);
    if (titleDelta) return titleDelta;
    if (a.concept.path.length !== b.concept.path.length) return a.concept.path.length - b.concept.path.length;
    return a.concept.path.localeCompare(b.concept.path);
  });
  return ranked;
}

function scoreField(tokens, value, weight, field, matches) {
  const text = String(value).toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (text.includes(token)) {
      score += weight;
      matches.push(`${field}:${token}`);
    }
  }
  return score;
}

function exactTitleHits(item, tokens) {
  const titleTokens = new Set(tokenize(item.concept.title));
  return tokens.filter((token) => titleTokens.has(token)).length;
}

function packConcept(concept, ranked) {
  const rank = ranked.find((item) => item.concept.path === concept.path);
  return {
    path: concept.path,
    type: concept.type,
    title: concept.title,
    why: rank && rank.matches.length
      ? `Matched query via ${Array.from(new Set(rank.matches.map((match) => match.split(":")[0]))).join(", ")}.`
      : "Included because it is linked supporting context.",
    summary: summarize(concept),
    caveats: concept.caveats,
    citations: concept.citations,
    resource: concept.resource
  };
}

function summarize(concept) {
  if (concept.description) return concept.description;
  const lines = concept.body
    .replace(/^#{1,6}\s+.+$/gm, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines[0] || "";
}

function extractCaveats(body) {
  const caveats = [];
  let currentHeading = "";
  for (const rawLine of body.split(/\r?\n/)) {
    const heading = rawLine.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      currentHeading = heading[1].trim();
      continue;
    }
    const line = rawLine.trim().replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "");
    if (!line || line.includes("| --- |")) continue;
    if (SECTION_CAVEAT_RE.test(currentHeading) || CAVEAT_LINE_RE.test(line)) {
      if (!line.startsWith("|") && !caveats.includes(line)) caveats.push(line);
    }
  }
  return caveats;
}

function extractCitationLinks(root, rel, body) {
  const citations = [];
  const citationIndex = body.search(/^#{1,6}\s+Citations\s*$/im);
  if (citationIndex === -1) return citations;
  const section = body.slice(citationIndex);
  for (const match of section.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const resolved = resolveConceptLink(root, rel, match[1]);
    if (resolved) citations.push(resolved);
  }
  if (!citations.length) {
    for (const line of section.split(/\r?\n/)) {
      const text = line.replace(/^\[\d+\]\s*/, "").trim();
      if (text && !text.startsWith("#")) citations.push(text);
    }
  }
  return Array.from(new Set(citations));
}

function resolveConceptLink(root, fromRel, href) {
  const rel = linkTarget(root, fromRel, href);
  return rel || "";
}

function linkTarget(root, fromRel, href) {
  if (!href || /^[a-z]+:/i.test(href) || href.startsWith("#")) return "";
  const target = href.split("#")[0];
  if (!target.endsWith(".md")) return "";
  const abs = path.resolve(root, path.dirname(fromRel), target);
  const rel = normalizePath(path.relative(root, abs));
  return rel.startsWith("..") ? "" : rel;
}

function parseRetrievalTests(src) {
  const tests = [];
  let current = null;
  let section = "";
  let key = "";

  for (const line of src.split(/\r?\n/)) {
    let match = line.match(/^  - id:\s*(.+)$/);
    if (match) {
      current = newTest(match[1]);
      tests.push(current);
      section = "";
      key = "";
      continue;
    }
    if (!current) continue;

    match = line.match(/^    query:\s*(.+)$/);
    if (match) {
      current.query = match[1];
      continue;
    }
    match = line.match(/^    (require|forbid):\s*$/);
    if (match) {
      section = match[1];
      key = "";
      continue;
    }
    match = line.match(/^      (concepts|citations|caveats):\s*$/);
    if (match) {
      key = match[1];
      continue;
    }
    match = line.match(/^        -\s*(.+)$/);
    if (match && section && key) {
      current[section][key].push(match[1]);
    }
  }
  return tests;
}

function newTest(id) {
  return {
    id,
    query: "",
    require: { concepts: [], citations: [], caveats: [] },
    forbid: { concepts: [] }
  };
}

function countRequired(required, actual) {
  const present = [];
  const missing = [];
  for (const item of required || []) {
    if (actual.has(item)) present.push(item);
    else missing.push(item);
  }
  return { present, missing, total: (required || []).length };
}

function countCaveats(required, actualCaveats) {
  const present = [];
  const missing = [];
  for (const item of required || []) {
    const wanted = normalizeText(item);
    if (actualCaveats.some((caveat) => {
      const actual = normalizeText(caveat);
      return actual.includes(wanted) || wanted.includes(actual);
    })) present.push(item);
    else missing.push(item);
  }
  return { present, missing, total: (required || []).length };
}

function normalizeText(value) {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .toLowerCase()
    .split(/[^a-z0-9_`]+/)
    .filter((token) => token && !STOPWORDS.has(token))
    .join(" ");
}

function formatEval(evalResult) {
  const lines = ["Knowpack eval", "", `Bundle: ${evalResult.bundle}`, `Tests: ${evalResult.tests.length}`, ""];

  for (const test of evalResult.tests) {
    lines.push(`${test.result.toUpperCase()} ${test.id}`);
    lines.push(`  query: ${test.query}`);
    formatGroup(lines, "required concepts", test.requiredConcepts);
    formatGroup(lines, "required citations", test.requiredCitations);
    formatGroup(lines, "required caveats", test.requiredCaveats);
    lines.push(`  forbidden concepts: ${test.forbiddenPresent.length} present`);
    for (const item of test.forbiddenPresent) lines.push(`    present: ${item}`);
    lines.push("");
  }

  lines.push(`Result: ${evalResult.result}`);
  return lines.join("\n");
}

function toEvalJson(evalResult) {
  return {
    version: "0.1",
    bundle: evalResult.bundle,
    result: evalResult.result,
    tests: evalResult.tests.map((test) => ({
      id: test.id,
      query: test.query,
      result: test.result,
      required_concepts: countJson(test.requiredConcepts),
      required_citations: countJson(test.requiredCitations),
      required_caveats: countJson(test.requiredCaveats),
      forbidden_concepts_present: test.forbiddenPresent
    }))
  };
}

function countJson(group) {
  return {
    passed: group.present.length,
    total: group.total,
    present: group.present,
    missing: group.missing
  };
}

function formatCheck(result) {
  const lines = ["Knowpack check", "", `Bundle: ${result.bundle}`, `Concepts: ${result.concepts}`, ""];
  for (const error of result.errors) lines.push(`ERROR ${error}`);
  for (const warning of result.warnings) lines.push(`WARN ${warning}`);
  if (result.errors.length || result.warnings.length) lines.push("");
  lines.push(`Result: ${result.errors.length ? "fail" : "pass"}`);
  return lines.join("\n");
}

function formatGroup(lines, label, group) {
  lines.push(`  ${label}: ${group.present.length}/${group.total}`);
  for (const item of group.present) lines.push(`    present: ${item}`);
  for (const item of group.missing) lines.push(`    missing: ${item}`);
}

function demoWarnings(bundle) {
  for (const concept of bundle.concepts) {
    if (concept.resource.includes("example.com") || concept.resource.includes(".test")) {
      return [{ kind: "demo_source", message: "This bundle uses fictional sources and placeholder URLs." }];
    }
  }
  return [];
}

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/\/$/, "");
}

main();
