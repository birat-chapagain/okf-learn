# BM25 Experiment Plan

BM25 is worth testing, but not as the first default.

It sits between simple keyword matching and embeddings:

```text
simple, local, deterministic, explainable enough
```

## Hypothesis

BM25 may retrieve better primary concepts than a hand-weighted keyword scorer when:

- body text is larger;
- terms repeat naturally across relevant docs;
- query wording differs slightly from titles;
- many concepts share the same domain words.

## Baseline To Beat

The baseline is `retrieval-strategy-v0`:

- explicit field weights;
- exact token matches;
- direct links;
- references;
- exact-path golden tests.

BM25 only matters if it improves retrieval quality against the same tests.

## Experiment Shape

Use the same command surface later:

```text
knowpack eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml --retriever simple
knowpack eval ./examples/billing-okf ./examples/billing-okf.retrieval-tests.yml --retriever bm25
```

Compare:

- required concepts included;
- forbidden concepts excluded;
- required citations included;
- required caveats included;
- output explanation clarity.

## BM25 Document Fields

Index one document per concept.

Candidate weighted text:

```text
title title title
type
tags tags
description description
headings
body
```

This keeps important frontmatter stronger without inventing complex scoring.

## Acceptance Rule

BM25 becomes an optional retriever only if:

- it passes all tests the simple retriever passes;
- it fixes at least one real miss;
- it does not pull in more forbidden concepts;
- it does not require a heavy dependency.

BM25 becomes the default only after multiple demo bundles prove it better.

## Stop Rule

Do not continue BM25 work if:

- the simple retriever already passes the early test suite;
- BM25 needs many custom boosts to behave;
- debugging failures becomes harder than the baseline;
- it pushes the project toward search-engine complexity too early.

