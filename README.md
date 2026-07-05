# Knowpack

Knowpack tests and packs Open Knowledge Format bundles into compact, cited context for AI agents.

Open Knowledge Format, or OKF, is a simple directory of Markdown files with YAML frontmatter. It is useful because agents need project knowledge that is current, specific, linked, and cited. Knowpack is the agent-side layer that checks whether an OKF bundle can give a model the right context for a real task.

Status: tiny proof implementation. One dependency-free Node CLI exists; package setup, MCP, viewer, generator, and automated repo ingestion are not built yet.

## Why This Exists

Models should not guess from scattered docs.

Project knowledge usually lives across:

- API docs;
- metric definitions;
- policies;
- playbooks;
- source references;
- tribal notes.

OKF gives that knowledge a file format. Knowpack retrieves the right pieces and packs them for the model.

```text
OKF bundle -> parser -> retriever -> context packer -> model
                         -> retrieval evaluator
```

## What Knowpack Does

Current commands:

```bash
node knowpack.js check ./examples/billing-okf
node knowpack.js check ./examples/software-okf
node knowpack.js check ./examples/full-stack-fastapi-okf
node knowpack.js check ./examples/broken-okf
node knowpack.js context ./examples/billing-okf "Can I refund this customer?"
node knowpack.js context ./examples/software-okf "Why are API requests returning 503 after deploy?"
node knowpack.js eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml
node knowpack.js eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml --json
node knowpack.js eval ./examples/software-okf ./examples/software-okf.retrieval-tests.yml
node knowpack.js eval ./examples/full-stack-fastapi-okf ./examples/full-stack-fastapi-okf.retrieval-tests.yml
./scripts/smoke-test.sh
npm test
```

Implemented behavior:

- read local OKF bundles;
- retrieve relevant concepts for an agent question;
- preserve caveats, citations, and source resources;
- emit compact JSON context for a model;
- check basic bundle health;
- run golden retrieval tests.
- emit eval results as text or JSON.

Planned behavior:

- give humans an inspection view of what the agent would see.

## What This Is Not

Knowpack is not Google Cloud Knowledge Catalog.

Google Cloud Knowledge Catalog is a managed enterprise layer for metadata harvesting, enrichment, governance, search, access control, APIs, MCP tools, data products, and SLAs. Knowpack is local, open-source, and file-first.

Knowpack is also not trying to be the first OKF CLI. Early OKF tools already exist. This project focuses on context packing and retrieval evaluation.

## Demo

The fixtures cover different domains so Knowpack does not become secretly tied to one example.

Fixture 1 is a fictional SaaS billing project:

```text
examples/billing-okf/
  apis/
    create-invoice.md
    refund-payment.md
  metrics/
    net-revenue.md
    churn-rate.md
  policies/
    refund-window.md
    trial-eligibility.md
  playbooks/
    investigate-revenue-drop.md
  references/
    billing-api-docs.md
    finance-metric-spec.md
    support-policy.md
```

Demo question:

```text
Can I refund this customer?
```

Expected context:

- [Refund Window policy](examples/billing-okf/policies/refund-window.md)
- [Refund Payment API](examples/billing-okf/apis/refund-payment.md)
- [Support Policy Manual](examples/billing-okf/references/support-policy.md)
- [Billing API Docs](examples/billing-okf/references/billing-api-docs.md)

Expected context pack:

- [examples/billing-okf.expected-context.refund.json](examples/billing-okf.expected-context.refund.json)

Fixture 2 is a fictional software project for coding agents:

```text
examples/software-okf/
  services/
    api-gateway.md
  configs/
    rate-limits.md
  modules/
    auth-middleware.md
  runbooks/
    debug-503.md
  tests/
    request-routing.md
  databases/
    gateway-db.md
  references/
    gateway-ops.md
    service-architecture.md
    testing-guide.md
```

Demo question:

```text
Why are API requests returning 503 after deploy?
```

Expected context:

- [Debug 503 runbook](examples/software-okf/runbooks/debug-503.md)
- [API Gateway service](examples/software-okf/services/api-gateway.md)
- [Rate Limits config](examples/software-okf/configs/rate-limits.md)
- [Gateway Operations Manual](examples/software-okf/references/gateway-ops.md)
- [Service Architecture Note](examples/software-okf/references/service-architecture.md)

Expected context pack:

- [examples/software-okf.expected-context.503.json](examples/software-okf.expected-context.503.json)

Fixture 3 is a real-repo fixture from `fastapi/full-stack-fastapi-template`:

```text
examples/full-stack-fastapi-okf/
  services/
    backend.md
    frontend.md
  configs/
    docker-compose.md
    environment.md
  runbooks/
    local-development.md
    deployment.md
  tests/
    backend-tests.md
    frontend-e2e.md
  references/
    *.md
```

Fixture 4 is intentionally broken:

- [examples/broken-okf](examples/broken-okf/index.md)
- [examples/broken-okf.expected-check.txt](examples/broken-okf.expected-check.txt)

## Retrieval Tests

Knowpack uses golden retrieval tests before model-based evaluation.

Test files:

- [examples/billing-okf.retrieval-tests.yml](examples/billing-okf.retrieval-tests.yml)
- [examples/software-okf.retrieval-tests.yml](examples/software-okf.retrieval-tests.yml)
- [examples/full-stack-fastapi-okf.retrieval-tests.yml](examples/full-stack-fastapi-okf.retrieval-tests.yml)

Expected eval output:

- [examples/billing-okf.expected-eval-pass.txt](examples/billing-okf.expected-eval-pass.txt)
- [examples/billing-okf.expected-eval-fail.txt](examples/billing-okf.expected-eval-fail.txt)
- [examples/software-okf.expected-eval-pass.txt](examples/software-okf.expected-eval-pass.txt)
- [examples/software-okf.expected-eval-fail.txt](examples/software-okf.expected-eval-fail.txt)

The first evaluator checks:

- required concepts are present;
- required citations are present;
- required caveats are present;
- forbidden concepts are absent.

## Retrieval Strategy

Version 0 uses deterministic retrieval:

```text
title match       +8
tag match         +5
type match        +4
description match +4
heading match     +3
path match        +3
body match        +1
```

No embeddings, model calls, or vector database in v0. BM25 is documented as a later experiment, not the default.

See:

- [Retrieval Strategy v0](docs/retrieval-strategy-v0.md)
- [BM25 Experiment Plan](docs/bm25-experiment-plan.md)

## Project Foundation

Start here:

- [Refined Findings](docs/refined-findings.md)
- [Foundations](docs/foundations.md)
- [Context Pack Spec](docs/context-pack-spec.md)
- [Eval Output Spec](docs/eval-output-spec.md)
- [Retrieval Test Spec](docs/retrieval-test-spec.md)
- [CLI](docs/cli.md)
- [Google Repo Deep Dive](docs/google-repo-deep-dive.md)
- [Engineering Principles](docs/engineering-principles.md)
- [Work Plan](docs/work-plan.md)
- [Decision Log](docs/decision-log.md)
- [Agent Target Surface](docs/agent-target-surface.md)

Research reports:

- [OKF Project Blueprint](reports/okf-project-blueprint.html)
- [OKF Opportunity Report](reports/okf-opportunity-report.html)

Background material:

- [Google OKF Repo Notes](materials/google-okf-repo-notes.md)
- [Source Map](materials/source-map.md)

## Current State

Completed:

- project positioning;
- upstream research;
- billing OKF bundle;
- software OKF bundle;
- real-repo OKF fixture;
- broken OKF fixture;
- context-pack contract;
- eval-output contract;
- retrieval-test contract;
- retrieval strategy;
- expected output fixtures;
- tiny dependency-free CLI for `check`, `context`, and `eval`;
- smoke test script.

Next:

```text
Add a broken fixture to prove check failures,
then decide whether package setup is worth it.
```

No platform, no generator, no MCP, no viewer until this proof is stronger.
