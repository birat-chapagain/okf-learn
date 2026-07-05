# GitHub Presentation Plan

## Repository Pitch

Knowpack is an agent-first context packer and evaluation harness for Open Knowledge Format bundles. It tests whether a bundle can give a model the right concepts, caveats, and citations for a real question.

## What To Show First

The README should show:

1. one-sentence pitch;
2. why agents need this;
3. small OKF file example;
4. demo bundle tree;
5. expected context pack;
6. context pack output;
7. retrieval test output;
8. what this is not.

## Demo Story

Use the billing demo.

Question:

```text
Can I refund this customer?
```

Expected retrieval:

- `policies/refund-window.md`
- `apis/refund-payment.md`
- `references/support-policy.md`
- `references/billing-api-docs.md`

Expected model behavior:

- check refund window;
- require support ticket;
- mention finance approval after 30 days;
- cite the source files;
- avoid calling the API without approval.

## Positioning

Different from Google Cloud Knowledge Catalog:

- local files, not managed cloud product;
- context packing and evaluation, not enterprise scanning/governance.

Different from `llms.txt`:

- multi-file concept graph, not one site summary file;
- typed concepts, links, citations, validation.

Different from OpenMetadata/DataHub:

- lightweight and repo-native;
- does not try to be a full metadata platform.

Different from a docs site:

- optimized for agent retrieval and context packing;
- viewer is secondary.

Different from existing OKF CLIs/generators:

- not primarily repo scanning, linting, git hooks, or website conversion;
- focuses on golden retrieval tests and compact model-ready context packs.

## GitHub Strengths

- Shows product thinking before code.
- Has a concrete demo bundle.
- Has validation rules before implementation.
- Has scoped roadmap.
- Avoids pretending to be a Google product.

## GitHub Risks

- Acronym confusion with Open Knowledge Foundation.
- Draft upstream OKF spec may change.
- Too much planning without a working validator can look unfinished.

## First Public Milestone

Publish only when the repo has:

- demo bundle;
- validation rules;
- basic context packer;
- at least three fixture bundles;
- README with one copy-paste example.
