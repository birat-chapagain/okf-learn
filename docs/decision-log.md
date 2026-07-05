# Decision Log

## 2026-07-04: Agent-first, not viewer-first

Decision: the model/agent is the primary consumer.

Reason: OKF exists to feed models compact, cited, structured context. The human viewer is only an inspector.

Consequence: prioritize context packing and retrieval evaluation over UI.

## 2026-07-04: Do not compete with Google Cloud Knowledge Catalog

Decision: Knowpack is not an alternative to Knowledge Catalog.

Reason: Knowledge Catalog is an enterprise product for harvesting, enrichment, governance, semantic search, access control, APIs, MCP tools, and SLAs.

Consequence: stay local, file-first, and open-source.

## 2026-07-04: Do not claim first OKF CLI

Decision: do not position this project as the first OKF CLI.

Reason: early OKF tools already exist, including Google's sample tooling, `okf.md`, `superops-team/okf`, and website generators.

Consequence: position around context packing and retrieval tests.

## 2026-07-04: Working name is Knowpack

Decision: use Knowpack as the working name.

Reason: "OKF" is crowded and ambiguous.

Consequence: command examples use `knowpack`, while docs explain that OKF is the input format.

## 2026-07-04: No code before output specs

Decision: implementation waits until context and eval output specs are written.

Reason: otherwise we will write plumbing before knowing what success looks like.

Consequence: next work is documentation and examples, not runtime code.

