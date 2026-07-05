# Retrieval Strategy v0

This document defines the first retrieval strategy for:

```text
knowpack context <bundle> "<query>"
```

Goal:

```text
Return the smallest useful set of OKF concepts for a model question.
```

No embeddings. No model calls. No vector database.

## Why Start Simple

The first retriever must be boring enough to debug by reading the bundle.

If a retrieval test fails, we should be able to see why:

```text
query terms matched these concepts
links pulled in these references
forbidden concepts were trimmed
```

BM25 can come later as an experiment, but it needs a baseline to beat.

## Inputs

- OKF bundle path.
- Natural-language query.
- Optional max concept count.

## Concept Fields Used

For each concept:

- `path`
- `type`
- `title`
- `description`
- `tags`
- headings from body
- body text
- outgoing Markdown links
- backlinks
- citations
- caveat-like sections or lines

## Query Normalization

Version 0 should use simple normalization:

- lowercase;
- split on non-alphanumeric characters;
- drop empty tokens;
- drop very short tokens of length 1;
- keep domain terms like `refund`, `revenue`, `trial`, `invoice`.

No stemming in v0.

## Scoring

Use a transparent weighted score.

```text
title match:       +8
type match:        +4
tag match:         +5
description match: +4
heading match:     +3
body match:        +1
path match:        +3
```

Count each query token once per field. Repeated body mentions should not dominate.

## Include Rules

### Primary Concepts

Select concepts with the highest direct query scores.

Default limit:

```text
primary concepts: max 3
```

### Linked References

For selected primary concepts, include directly linked concepts when:

- linked concept type is `Reference`; or
- linked concept contains citations needed by the primary concept; or
- linked concept title/path matches a required citation in a retrieval test.

Default limit:

```text
linked references: max 3
```

### Backlinks

Include backlinks only when:

- the backlink concept has a non-zero direct query score; or
- the backlink is a playbook/policy/metric that explains how to use the selected concept.

Default:

```text
backlinks are off unless they improve the answer.
```

### Caveats

Extract caveats from:

- sections named `# Caveats` or `## Caveats`;
- lines containing `must not`, `do not`, `requires`, `excluded`, `only`, `unless`, `approval`, `cannot`.

Keep exact text where practical.

## Trim Rules

Remove concepts when:

- score is zero;
- concept is only weakly related and not linked from a selected concept;
- concept is listed as forbidden in a retrieval test;
- concept is a primary API/action unrelated to the user question.

Example:

For `Can I refund this customer?`, `apis/create-invoice.md` may be related to billing but should not be central context.

## Tie Breaking

When scores tie:

1. exact title token match wins;
2. type priority for query intent wins:
   - refund query: `Policy`, then `API Endpoint`, then `Reference`;
   - revenue query: `Metric`, then `Playbook`, then `Reference`;
3. shorter path wins;
4. alphabetical path wins.

## Context Pack Order

Order concepts by usefulness, not file path.

For refund query:

```text
1. policy
2. API endpoint
3. support/reference docs
```

For revenue query:

```text
1. metric definition
2. playbook
3. related metric
4. finance reference
```

## Evaluation

Use exact-path golden tests first.

Pass if:

- required concepts are included;
- required citations are included;
- required caveats are included;
- forbidden concepts are absent.

No fuzzy score in v0.

## BM25 Experiment

BM25 is a valid experiment after the baseline works.

Why BM25 is attractive:

- deterministic;
- local;
- no embeddings;
- no model calls;
- strong for keyword retrieval;
- easy to compare against the baseline using the same golden tests.

When to try it:

```text
after the simple weighted retriever passes the billing tests
```

Experiment rule:

```text
BM25 must beat or equal the simple retriever on golden tests without making outputs harder to explain.
```

Possible experiment command:

```text
knowpack eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml --retriever bm25
```

Do not add BM25 as default until it proves value.

## Non-Goals

Version 0 does not include:

- embeddings;
- reranking model;
- LLM judge;
- vector database;
- automatic query expansion;
- synonym dictionary;
- plugin architecture;
- multi-bundle retrieval.

