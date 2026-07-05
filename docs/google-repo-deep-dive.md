# Google Knowledge Catalog Repo Deep Dive

Last checked: 2026-07-04

Repo: https://github.com/GoogleCloudPlatform/knowledge-catalog

Scope studied:

- `okf/SPEC.md`
- `okf/README.md`
- `okf/tests/`
- `okf/src/reference_agent/`
- `okf/bundles/`
- `toolbox/mdcode/`

This was a source review only. No upstream code was copied.

## Executive Summary

Google's repo confirms our current direction.

OKF itself is intentionally tiny: Markdown files with YAML frontmatter, where only `type` is formally required on concept documents. The reference agent and tooling are stricter because they are producers, not because the OKF spec requires every field.

The useful gap for Knowpack remains:

```text
Given a query, prove which OKF concepts, caveats, and citations should enter model context.
```

Google's repo produces bundles and visualizes graph structure. It does not define golden retrieval tests or context-pack contracts for model input.

## 1. What The OKF Spec Actually Requires

Formal OKF v0.1 conformance requires:

- bundle is a directory tree of Markdown files;
- every non-reserved `.md` file is a concept document;
- every concept document has parseable YAML frontmatter;
- every concept frontmatter has non-empty `type`;
- reserved files are `index.md` and `log.md`;
- reserved files follow their described structures when present.

Important soft rules:

- `title`, `description`, `resource`, `tags`, and `timestamp` are recommended, not required by the spec.
- unknown `type` values must be tolerated;
- unknown frontmatter keys should be preserved;
- broken links must not make a bundle invalid;
- missing `index.md` must not make a bundle invalid;
- body sections like `# Schema`, `# Examples`, and `# Citations` are conventional, not required.

Implication for Knowpack:

```text
Hard validation should stay minimal.
Quality checks should be warnings or eval failures, not spec errors.
```

## 2. What The Tests Imply

The tests imply two layers:

### Spec-like parsing behavior

`OKFDocument.parse`:

- parses YAML frontmatter delimited by `---`;
- returns empty frontmatter when a file has no frontmatter;
- raises on unterminated frontmatter;
- round-trips frontmatter and body.

### Reference-agent producer behavior

The reference agent's `OKFDocument.validate` requires:

- `type`;
- `title`;
- `description`;
- `timestamp`.

That is stricter than OKF conformance. It is a producer rule for their agent, not the public spec.

The bundle tool tests imply more producer safety rules:

- web-pass writes should augment existing BigQuery table docs, not shrink them;
- existing schema fields should not disappear during web enrichment;
- existing citation entries should not be dropped;
- BQ pass can update schema when no web-pass augmentation guard is active;
- non-BigQuery reference docs do not get the same schema-shrink guard.

Index tests imply:

- generated `index.md` groups children by `type`;
- entries use local relative links;
- descriptions come from child frontmatter;
- empty directories are skipped;
- a directory with one child can reuse that child's description instead of model-synthesizing a summary.

Viewer tests imply:

- `index.md` is not a concept node;
- valid concept files become graph nodes;
- Markdown links become directed edges;
- missing link targets are skipped in the viewer graph;
- node colors are type-based;
- bundle-missing is a hard error for the visualizer.

Implication for Knowpack:

```text
We should separate parser errors, quality warnings, and retrieval-eval failures.
```

## 3. How The Reference Agent Structures Bundles

The reference agent is a proof-of-concept OKF producer.

It currently supports BigQuery as the implemented source:

- one concept for the dataset under `datasets/<dataset>.md`;
- one concept per table under `tables/<table>.md`;
- sharded tables can collapse into one wildcard family concept such as `tables/events_.md`;
- references from web enrichment go under `references/`;
- generated `index.md` files appear at relevant directory levels;
- `viz.html` can be generated beside a bundle.

The enrichment flow has two passes:

1. BQ pass: use BigQuery metadata to write primary concept docs.
2. Web pass: crawl explicit seed URLs, then either enrich existing concepts, mint `references/` docs, or skip.

The web pass is constrained:

- explicit seeds;
- max page budget;
- allowed hosts;
- allowed path prefixes;
- denied path substrings;
- max crawl depth.

The agent instructions emphasize:

- read existing docs before rewriting;
- use structured metadata first;
- optionally sample rows;
- list concepts to cross-link;
- write one concept doc per concept;
- cite only known/fetched URLs;
- preserve existing frontmatter/body structure during augmentation;
- avoid inventing fields, joins, URLs, or schema facts.

Implication for Knowpack:

```text
Our hand-written billing bundle is valid as a non-BigQuery proof domain.
We should not start with generation. Google's producer path is already substantial.
```

## 4. How The Visualizer Represents Graph And Backlinks

The visualizer walks the bundle and builds a graph:

- each non-`index.md` Markdown file becomes a concept node;
- concept ID is the path without `.md`;
- node data includes id, label/title, type, description, resource, tags, color, and size;
- directed edges are created from Markdown links in document bodies;
- self-links are ignored;
- duplicate edges are ignored;
- links to missing concepts are skipped;
- type palette is hard-coded for known types, with a default color for others;
- bundle bodies are serialized into the generated HTML;
- HTML embeds the graph as JSON and uses Cytoscape.js and marked.js.

The README says the viewer shows:

- force-directed graph;
- detail panel;
- rendered frontmatter/body;
- internal-link navigation;
- computed "Cited by" backlinks;
- title/id/tag search;
- type filters;
- switchable layouts.

Important limitation:

The viewer graph is useful for human inspection, but it is not a context-packing contract for a model.

Implication for Knowpack:

```text
We can reuse the conceptual graph model: nodes from concepts, directed edges from links, reverse edges for cited-by/backlinks.
But Knowpack should score/retrieve context, not just draw it.
```

## 5. What kcmd / MCP Already Does

`toolbox/mdcode` is Metadata as Code for Knowledge Catalog.

It is not pure OKF. It uses a Knowledge-Catalog-oriented local artifact model:

- manifest file: `catalog.yaml`;
- standard layout with YAML entry files;
- sidecar Markdown files for rich/unstructured aspects;
- document layout for knowledge-base scopes with Markdown and frontmatter;
- bidirectional sync with Knowledge Catalog;
- local authoring/review workflows;
- TypeScript/Python library surface;
- CLI named `kcmd`;
- MCP server.

The CLI supports:

- initialize a local snapshot from BigQuery datasets or entry groups;
- pull from Knowledge Catalog;
- status for local modifications;
- push back to Knowledge Catalog;
- dry-run support.

The MCP server exposes tools:

- `pull`;
- `push`;
- `list-entries`;
- `lookup-entry`;
- `modify-entry`.

It depends on Google Cloud auth via `gcloud`.

Implication for Knowpack:

```text
kcmd is about syncing metadata with Knowledge Catalog.
Knowpack should not enter that lane.
```

## 6. What Knowpack Should Reuse Conceptually

Reuse these ideas:

- bundle as the unit of work;
- concept ID equals bundle-relative path without `.md`;
- reserved files are not concepts;
- parse frontmatter and body separately;
- preserve unknown frontmatter keys;
- tolerate unknown concept types;
- treat Markdown links as directed graph edges;
- compute backlinks from reverse edges;
- keep missing links non-fatal;
- prefer progressive disclosure over loading the whole bundle;
- use generated or synthesized indexes only as navigation aids;
- keep references as first-class concepts;
- distinguish hard parse errors from soft quality problems;
- use explicit source/citation preservation as a quality signal.

Most important reusable producer lesson:

```text
Augment; do not overwrite.
```

For Knowpack, that becomes:

```text
Pack context; do not summarize away caveats and citations.
```

## 7. What Knowpack Should Avoid

Avoid:

- claiming to implement all of Knowledge Catalog;
- claiming to replace kcmd;
- claiming to be a full OKF generator;
- making Google Cloud auth required;
- starting with BigQuery-specific logic;
- building a crawler;
- adding a vector database;
- relying on an LLM judge for v0.1 evals;
- making `title`, `description`, or `timestamp` hard spec errors;
- rejecting unknown types;
- failing bundles because links are broken;
- using the human viewer as the AI runtime.

Specific trap:

Google's reference-agent validator requires `title`, `description`, and `timestamp`, but the OKF spec does not. Knowpack should report those as quality warnings unless a profile/test asks for them.

## 8. What Gap Remains For Context Packing / Eval

The upstream repo covers:

- OKF spec;
- producer proof-of-concept;
- BigQuery source;
- web enrichment;
- generated indexes;
- visualizer;
- Knowledge Catalog metadata-as-code sync and MCP.

The upstream repo does not define:

- a context-pack JSON shape for model input;
- golden retrieval tests for agent questions;
- pass/fail evaluation of whether a bundle retrieves the right concepts;
- required/forbidden concept assertions;
- citation/caveat presence assertions;
- a small local tool focused only on question-to-context quality.

That is Knowpack's gap.

Better product sentence:

```text
Knowpack tests whether an OKF bundle can produce the right compact, cited context for an agent question.
```

## Updates To Our Direction

Keep:

- agent-first design;
- context-pack spec;
- retrieval-test spec;
- billing demo bundle;
- no-code-first discipline.

Adjust:

- validation is support behavior, not the core product;
- use warnings for missing recommended fields;
- emphasize exact retrieval tests before fuzzy scoring;
- inspect graph/backlinks as retrieval features, not UI-only features.

Next non-code artifact:

```text
docs/retrieval-strategy-v0.md
```

It should define the first deterministic retrieval algorithm using:

- title/type/tag/body keyword match;
- direct links;
- references linked from required concepts;
- backlinks only when useful;
- exact-path golden tests.

## Sources

- OKF spec: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/SPEC.md
- OKF README: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/README.md
- Tests directory: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf/tests
- Document tests: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/tests/test_document.py
- Index tests: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/tests/test_index.py
- Viewer tests: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/tests/test_viewer.py
- BigQuery source tests: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/tests/test_bigquery_source.py
- Reference agent source: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf/src/reference_agent
- Reference instruction: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/src/reference_agent/prompts/reference_instruction.md
- Web ingestion instruction: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/src/reference_agent/prompts/web_ingestion_instruction.md
- Viewer generator: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/src/reference_agent/viewer/generator.py
- Metadata as Code README: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/toolbox/mdcode
- Metadata as Code concept doc: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/toolbox/mdcode/docs/concept.md

