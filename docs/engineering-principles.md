# Engineering Principles

This project treats code as liability.

Every line must justify itself by reducing user work, reducing agent confusion, or proving a product assumption.

## Rules

- No implementation before a written test case or demo need exists.
- No platform work before the local file workflow works.
- No dependency before the standard library or runtime can clearly not do the job.
- No custom database.
- No hosted service.
- No Google Cloud dependency.
- No write actions in early agent/MCP surfaces.
- No generator until the context packer proves useful on hand-written bundles.
- No abstraction with one implementation.
- No "for later" scaffolding.

## Code Gate

Before writing implementation code, answer:

1. Which user question does this unlock?
2. Which file or fixture proves it?
3. What is the smallest output that shows success?
4. What can be skipped?
5. What breaks if this code is wrong?

If those answers are weak, do not write code.

## First Allowed Code

The first acceptable implementation is tiny but must be domain-neutral:

```text
Read any OKF bundle path
Return context for billing and software retrieval tests
```

Not a package. Not a plugin system. Not a server.

## Bias

Prefer:

- docs before code;
- fixtures before features;
- exact path checks before fuzzy scores;
- local files before APIs;
- deterministic logic before model calls;
- deletion over configuration.

## Stop Signs

Stop and rethink if we are about to add:

- background workers;
- auth;
- cloud sync;
- database storage;
- vector database;
- automatic crawler;
- config system;
- plugin architecture;
- UI framework;
- package publishing.

Those may become useful later. None are first.
