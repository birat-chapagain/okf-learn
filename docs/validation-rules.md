# OKF Validation Rules

This is the support target for a future `knowpack check <bundle>` command.

These rules are intentionally small. The tool should validate the file convention, not invent a new ontology.

## File Rules

- A bundle is a directory.
- `index.md` should exist at the bundle root.
- `log.md` may exist at the bundle root.
- Concept files are Markdown files ending in `.md`, excluding reserved files.
- Reserved files in version 0.1:
  - `index.md`
  - `log.md`
- Markdown files must be UTF-8 text.

## Frontmatter Rules

Every concept file must start with YAML frontmatter:

```md
---
type: Metric
title: Net Revenue
description: Canonical finance metric.
resource: metric://finance/net-revenue
tags: [finance, revenue]
timestamp: 2026-07-04
---
```

Required:

- `type`

Recommended:

- `title`
- `description`
- `resource`
- `tags`
- `timestamp`

Unknown keys are allowed and must be preserved.

## Link Rules

- Relative Markdown links should resolve to files inside the bundle.
- External links are allowed.
- Broken relative links are warnings in early versions.
- Later versions may support strict mode where broken relative links fail validation.

## Citation Rules

- Concept files should include a `## Citations` section.
- A citation can link to a local reference file or an external source.
- Missing citations are warnings at first.
- Claims about policies, metrics, safety, finance, legal, or production behavior should be cited.

## Validation Levels

### Error

Use errors for problems that make a bundle hard to parse:

- bundle path does not exist;
- concept file is not valid UTF-8;
- concept file has no frontmatter;
- concept file frontmatter is invalid YAML;
- concept file has empty or missing `type`.

### Warning

Use warnings for problems that reduce quality but can still be read:

- missing `index.md`;
- missing `log.md`;
- missing recommended frontmatter keys;
- broken relative Markdown link;
- missing `## Citations`;
- placeholder external URL;
- duplicate title;
- empty body after frontmatter.

## Expected Demo Result

The hand-written demo bundle should pass with warnings:

- [Billing OKF Demo Bundle](../examples/billing-okf/index.md)
- [Expected Validation Output](../examples/billing-okf.expected-validation.md)
