# Work Plan

## Current Stage

Stage: product proof, no implementation code.

Goal: prove Knowpack is a real gap and define exactly what the first tiny implementation must do.

## Current Project Definition

Knowpack is an agent-first context packer and retrieval evaluator for OKF bundles.

It should answer:

```text
Given an agent question, which OKF concepts, caveats, and citations should enter model context?
```

## Next Work Items

### 0. Review and refine findings

Status: complete.

Done when:

- one source-of-truth findings document exists;
- stale "first CLI" and "Google alternative" positioning is rejected;
- next no-code artifact is clear.

### 1. Tighten the demo bundle

Check whether the billing demo contains enough signal for retrieval tests.

Done when:

- every retrieval test has required concepts;
- required concepts contain matching caveats and citations;
- no test depends on guesswork.

### 1b. Add a second domain fixture

Status: complete.

Done when:

- `examples/software-okf` exists;
- software retrieval tests exist;
- first implementation is required to pass billing and software fixtures.

### 2. Define context output

Write the exact JSON shape for `knowpack context`.

Done when:

- one refund example is written by hand;
- one revenue example is written by hand;
- fields are minimal.

### 3. Define evaluation output

Write the exact terminal output for `knowpack eval`.

Done when:

- pass output exists;
- fail output exists;
- output is readable in GitHub Actions logs.

### 4. Deep-dive Google repo

Status: complete.

Study only the relevant parts:

- `okf/SPEC.md`;
- `okf/tests`;
- `okf/src/reference_agent`;
- `okf/bundles`;
- `toolbox/mdcode`.

Done when:

- notes say what to reuse conceptually;
- notes say what to avoid;
- no code is copied.

### 5. Rewrite README for public GitHub

Make the landing page honest and sharp.

Done when:

- pitch is clear in one minute;
- it does not claim to be first OKF CLI;
- it does not compete with Google Cloud Knowledge Catalog;
- it shows the demo question and expected context.

## Not Doing Yet

- implementation;
- package setup;
- publishing;
- MCP;
- viewer;
- converters;
- vector search;
- model calls.

## First Implementation Gate

Implementation starts only after:

- context output spec exists;
- evaluation output spec exists;
- retrieval strategy v0 exists;
- expected context/eval outputs exist for billing and software fixtures;
- README pitch is settled;
- Google repo deep-dive notes exist.
