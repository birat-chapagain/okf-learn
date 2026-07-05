# Google Cloud Knowledge Catalog OKF Repo Notes

Last checked: 2026-07-04

Repo: https://github.com/GoogleCloudPlatform/knowledge-catalog

## Verdict

Useful, but for a different "OKF" than the Open Knowledge Foundation material.

In this repo, OKF means Open Knowledge Format: a draft, vendor-neutral format for representing knowledge as markdown files with YAML frontmatter. It is aimed at humans, agents, export pipelines, static servers, search indexes, and graph viewers.

This is directly useful for building an agent skill because it gives us a concrete file format for the agent's knowledge artifacts.

## What It Is

The top-level repo is about Google Cloud Knowledge Catalog, formerly Dataplex. Google describes Knowledge Catalog as an agent context and governance product for enterprise data, with semantic search, governed retrieval, metadata harvesting, business semantics, and MCP/context APIs.

The repo itself is samples and tools, not an official Google product. It is Apache-2.0 licensed.

The important folder is:

- `okf/`: Open Knowledge Format spec, reference agent, tests, samples, generated bundles, and visualizer.

## Why It Matters

Open Knowledge Format gives us a simple target shape:

- a bundle is just a directory tree;
- every concept is a `.md` file;
- each concept has YAML frontmatter;
- only `type` is required;
- `title`, `description`, `resource`, `tags`, and `timestamp` are recommended;
- markdown links express relationships;
- `index.md` supports progressive disclosure;
- `log.md` can track update history;
- citations go under `# Citations`.

That fits agent skills well because it is readable, diffable, git-friendly, and easy to consume without a service dependency.

## How It Relates To Our Earlier OKF Notes

Do not mix these:

- OKFN / Open Knowledge Foundation: nonprofit, open data movement, Open Definition, CKAN, licenses, Open Data Commons.
- GoogleCloudPlatform OKF / Open Knowledge Format: markdown + YAML format for agent-readable knowledge bundles.

They can complement each other:

- Use OKFN/CKAN/Open Definition to discover and evaluate open data.
- Store the curated agent knowledge as Google OKF-style bundles.

## Suggested Skill Direction

Minimum useful skill:

1. Read a CKAN/open-data dataset.
2. Extract metadata, license, schema, resources, caveats, and citations.
3. Write one OKF concept per dataset/resource/table.
4. Generate `index.md`.
5. Preserve citations and source URLs.

Skipped for now:

- Google Cloud Knowledge Catalog API integration;
- BigQuery billing/auth flow;
- Gemini-powered crawler;
- graph visualizer customization.

Add those only if we decide to target Google Cloud specifically.

## Is The Spec Enough To Build An Open Source Tool?

Yes, enough for a small tool. Not enough for a strict ecosystem standard yet.

Good enough today:

- parse a bundle directory;
- parse markdown files with YAML frontmatter;
- require `type` on concept documents;
- ignore or preserve unknown frontmatter keys;
- generate `index.md`;
- scan markdown links into a simple graph;
- check citations exist as a section;
- render a static HTML viewer;
- export/import from simple sources.

Still underspecified:

- no formal machine-readable schema;
- no official JSON Schema for frontmatter;
- no canonical list of concept `type` values;
- no strict citation format beyond markdown convention;
- no relationship typing beyond prose around links;
- unclear rules for frontmatter in root `index.md` versus other `index.md` files;
- no package manifest with bundle name/version/license/provenance;
- no compatibility tests or reference corpus for validators;
- no security model for untrusted markdown/HTML rendering;
- no guidance for binary assets, large files, private links, or redacted sources.

Earlier open-source first idea:

```text
okf validate <bundle>
okf index <bundle>
okf graph <bundle>
okf render <bundle>
okf new concept <path> --type <type> --title <title>
```

This idea is now background research, not the recommended product direction.

Update after more research: a plain OKF CLI is no longer the sharpest gap because early OKF CLIs, validators, and generators now exist. A better project target is an agent context packer and retrieval evaluator for OKF bundles.

Better future tool:

```text
knowpack context <bundle> "can this customer get a refund?"
knowpack eval <bundle> <tests.yml>
knowpack inspect <bundle>
```

Do not start with Google Cloud integration.
