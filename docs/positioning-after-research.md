# Positioning After New OKF Research

Last checked: 2026-07-04

## What Changed

The project should not claim to be the first standalone OKF CLI.

That claim is now weak because early OKF ecosystem tools already exist:

- GoogleCloudPlatform `knowledge-catalog/okf`: draft spec, reference enrichment agent, sample bundles, tests, and visualizer.
- `okf.md`: third-party OKF documentation site with spec, quickstart, tools page, and a browser validator page.
- `superops-team/okf`: Go CLI with repo scanning, linting, search, git hooks, and releases.
- Suganthan OKF generator: website/sitemap to OKF bundle generator.

## Correct Business Understanding

OKF itself is the free portable layer.

Google Cloud Knowledge Catalog is the managed enterprise layer:

- automated metadata harvesting;
- Gemini enrichment;
- semantic search;
- access control;
- governance;
- lineage, quality, profiling;
- context APIs and MCP tools;
- data products with SLAs.

We are not competing with that.

## New Project Angle

Working name: Knowpack

Knowpack is an agent-first context packer and evaluation harness for OKF bundles.

It answers:

```text
Given this agent question, what exact OKF concepts, caveats, and citations should go into the model context?
```

This is narrower and stronger than a generic validator.

## What We Should Build Later

Future commands should center on retrieval quality:

```text
knowpack context <bundle> "can this customer get a refund?"
knowpack eval <bundle> <tests.yml>
knowpack inspect <bundle>
```

Supporting commands can still exist:

```text
knowpack check <bundle>
knowpack graph <bundle>
```

But validation is not the main product. Existing linters can cover basic spec checks.

## What Makes This Different

Different from Google Knowledge Catalog:

- local and open-source;
- no enterprise scanning;
- no cloud governance;
- no SLA;
- no BigQuery/GCS dependency.

Different from `superops-team/okf`:

- not primarily repo scanning or git hooks;
- focuses on model-ready context packs and golden retrieval tests.

Different from `okf.md` validator:

- not just conformance checking;
- tests whether the right context is retrieved for real agent questions.

Different from website generators:

- not page-to-markdown conversion;
- consumes existing OKF bundles and tests agent usefulness.

## README Rule

Do not say:

```text
Alternative to Google Cloud Knowledge Catalog.
First OKF CLI.
Nobody has built OKF tools yet.
```

Say:

```text
Knowpack helps test and package OKF bundles into compact, cited context for agents.
```

