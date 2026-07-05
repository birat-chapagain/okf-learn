# Refined Findings

Last reviewed: 2026-07-04

This is the current source of truth for what we learned and what Knowpack should become.

## Core Finding

OKF is not the product.

OKF is the input format: a portable directory of Markdown files with YAML frontmatter.

Knowpack should be the agent-side utility that answers:

```text
Given this OKF bundle and this agent question,
what exact concepts, caveats, citations, and source pointers should enter model context?
```

## What We Know Now

### 1. OKF is intentionally minimal

The formal OKF v0.1 spec requires very little:

- concept files are Markdown;
- concept files have YAML frontmatter;
- concept frontmatter has non-empty `type`;
- `index.md` and `log.md` are reserved.

Everything else is guidance:

- `title`;
- `description`;
- `resource`;
- `tags`;
- `timestamp`;
- `# Citations`;
- `# Schema`;
- `# Examples`;
- links;
- indexes.

This means Knowpack should not act like a strict format police tool. It should parse permissively and report quality warnings.

### 2. Google's reference agent is stricter than OKF

Google's producer tooling requires more fields when writing documents:

- `type`;
- `title`;
- `description`;
- `timestamp`.

That is not the same as OKF conformance. It is a producer contract for their reference agent.

Knowpack should treat missing recommended fields as quality problems, not hard spec failures, unless a user-defined profile asks for strictness.

### 3. Google sells the automation and serving layer

Google Cloud Knowledge Catalog is the enterprise layer:

- metadata harvesting;
- Gemini enrichment;
- semantic search;
- governance;
- access control;
- context APIs;
- MCP tools;
- data products;
- SLAs.

Knowpack should not compete there.

### 4. Existing OKF tools already exist

We should not claim to be first.

Known ecosystem pieces include:

- Google reference agent and visualizer;
- `okf.md`;
- `superops-team/okf`;
- Suganthan's website-to-OKF generator;
- Knowledge Catalog Metadata as Code / `kcmd`.

This makes a generic validator/CLI less interesting.

### 5. The useful gap is retrieval quality

Existing tools focus on:

- producing bundles;
- validating/linting bundles;
- syncing metadata;
- visualizing graph structure;
- converting websites or repos into OKF.

The gap we can own:

```text
Does this OKF bundle actually give an agent the right context for a real task?
```

That means:

- context packing;
- golden retrieval tests;
- required concept assertions;
- forbidden concept assertions;
- citation assertions;
- caveat assertions.

## Product Definition

Working name: Knowpack.

One sentence:

```text
Knowpack tests and packs OKF bundles into compact, cited context for AI agents.
```

Longer version:

```text
Knowpack is a local, open-source context packer and retrieval evaluator for Open Knowledge Format bundles. It helps agent builders verify that an OKF bundle returns the right concepts, caveats, and citations for a real model question.
```

## The Machine

```text
OKF bundle
  -> parser
  -> light validator
  -> concept index
  -> deterministic retriever
  -> context packer
  -> retrieval evaluator
  -> optional human inspector
```

The viewer is not the runtime. It is only a way for humans to inspect what the agent may see.

## MVP Shape

The future MVP should prove three commands:

```text
knowpack context ./examples/billing-okf "Can I refund this customer?"
knowpack eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml
knowpack inspect ./examples/billing-okf
```

Support command:

```text
knowpack check ./examples/billing-okf
```

`check` is useful, but not the main product.

## First Demo

The billing demo is still the right first proof because it shows OKF is not database-only.

It includes:

- APIs;
- metrics;
- policies;
- playbooks;
- references.

First golden question:

```text
Can I refund this customer?
```

Expected required context:

- `policies/refund-window.md`;
- `apis/refund-payment.md`;
- `references/support-policy.md`;
- `references/billing-api-docs.md`.

Expected forbidden context:

- `apis/create-invoice.md` as a primary answer source.

## Design Rules

Keep:

- local files;
- deterministic retrieval first;
- exact path evals first;
- warnings over hard failures when the OKF spec is permissive;
- citations and caveats as first-class output;
- no model calls in v0;
- no embeddings in v0;
- no vector database;
- no Google Cloud dependency;
- no hosted service.

Avoid:

- being an OKF generator first;
- being a generic linter first;
- being a Google Cloud alternative;
- crawling the internet;
- adding plugin architecture;
- strict ontology work;
- overbuilding the viewer.

## What We Have

Planning:

- product requirements;
- system design;
- roadmap;
- engineering principles;
- decision log;
- Google repo deep dive.

Contracts:

- context pack spec;
- eval output spec;
- retrieval test spec;
- validation rules.

Demo:

- billing OKF bundle;
- expected refund context pack;
- retrieval tests;
- expected validation output.

## What We Still Need Before Code

1. Retrieval strategy v0.
2. Final README pitch.
3. One failed retrieval example.
4. One expected `knowpack eval` pass output artifact.
5. One expected `knowpack eval` fail output artifact.

After those exist, the first code can be tiny and justified.

## Refined Next Step

Write:

```text
docs/retrieval-strategy-v0.md
```

It should define exactly how the first non-LLM retriever ranks and includes concepts:

- keyword matching;
- type/title/tag weighting;
- body and heading matching;
- direct links;
- reference inclusion;
- backlinks;
- trimming rules;
- deterministic tie-breaking;
- no embeddings.

