# Foundations

Knowpack has one job:

```text
turn an OKF bundle into the smallest useful model context for a task
```

Everything else is support.

## Core Objects

### Bundle

A directory of OKF Markdown files.

Example:

```text
examples/billing-okf/
```

### Concept

One Markdown file with YAML frontmatter.

Example:

```text
policies/refund-window.md
```

### Query

The task or question an agent needs context for.

Example:

```text
Can I refund this customer?
```

### Context Pack

The compact output sent to the model.

It contains only the concepts, caveats, citations, and source pointers needed for the query.

### Retrieval Test

A golden test that says which concepts must or must not appear for a query.

## Product Boundary

Knowpack consumes OKF. It does not own OKF.

Knowpack should:

- parse OKF bundles;
- check enough structure to avoid broken context;
- retrieve relevant concepts;
- preserve citations and caveats;
- emit compact context packs;
- evaluate retrieval quality.

Knowpack should not:

- invent a new knowledge format;
- compete with Google Cloud Knowledge Catalog;
- become a generic OKF generator;
- become a full linter as its main value;
- fetch the internet by default;
- write to production systems.

## First Domain

The first proof domain is the billing demo:

```text
examples/billing-okf
```

It proves OKF can describe:

- APIs;
- metrics;
- policies;
- playbooks;
- references.

This matters because the project must not look database-only.

## First User Story

```text
As an agent,
when asked "Can I refund this customer?",
I need refund policy, refund API, caveats, and citations,
so I do not invent approval rules or call the wrong endpoint.
```

## First Success Condition

The first successful future implementation returns a context pack containing:

- `policies/refund-window.md`;
- `apis/refund-payment.md`;
- `references/support-policy.md`;
- `references/billing-api-docs.md`;
- refund-window caveats;
- support-ticket caveat.

It must not center `apis/create-invoice.md`.

## Retrieval Rule 0

Exact and boring beats clever.

The first retrieval strategy can be:

1. match query terms against title, type, tags, headings, and body;
2. include directly linked reference files;
3. include backlinks only when they explain the answer;
4. trim unrelated concepts;
5. preserve caveats and citations.

No embeddings, no vector database, no model calls.

