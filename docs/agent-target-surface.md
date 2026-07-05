# Agent Target Surface

Knowpack is for AI agents, not for one business domain.

The first practical target is coding agents because they already work inside repositories and need grounded project context.

## Agent Flavors

Knowpack should be useful for:

- coding agents;
- data agents;
- operations agents;
- support agents;
- research agents;
- compliance agents;
- internal workflow agents.

The product should not assume the domain is billing, SQL, BigQuery, or Google Cloud.

## Coding Agent Work

Coding agents commonly need to understand:

- source files;
- modules and packages;
- APIs;
- CLIs;
- config files;
- environment variables;
- database schemas;
- migrations;
- queues and jobs;
- tests;
- fixtures;
- runbooks;
- deployment files;
- service ownership;
- architecture decisions;
- security constraints;
- style conventions;
- known failure modes.

## Files Coding Agents Handle

Common files:

```text
README.md
AGENTS.md
package.json
pyproject.toml
Cargo.toml
go.mod
Dockerfile
docker-compose.yml
.env.example
*.ts / *.tsx
*.py
*.go
*.rs
*.sql
*.yaml / *.yml
*.json
tests/
fixtures/
migrations/
docs/
scripts/
```

Knowpack should not need to understand every file format deeply at first. It should help agents retrieve the OKF concepts that explain these files.

## Useful OKF Concept Types For Coding Agents

The format allows any `type`, so Knowpack must tolerate arbitrary types.

Good starter types:

- `Service`
- `Module`
- `API Endpoint`
- `CLI Command`
- `Config`
- `Environment Variable`
- `Database`
- `Table`
- `Migration`
- `Queue`
- `Job`
- `Test Suite`
- `Fixture`
- `Runbook`
- `Architecture Decision`
- `Policy`
- `Security Constraint`
- `Reference`

## Coding-Agent Questions

Good retrieval questions:

```text
Why are API requests returning 503 after deploy?
Which config controls rate limiting?
How do I run the test suite for payments?
What database tables are touched by user deletion?
Can this migration run online?
Which env vars are required for local development?
What should I check before changing auth middleware?
```

## Product Requirement

Knowpack retrieval must be domain-neutral.

It should operate on:

- text fields;
- frontmatter;
- links;
- citations;
- caveats/constraints;
- retrieval tests.

It must not hard-code:

- billing;
- refunds;
- SQL;
- BigQuery;
- any single framework;
- any single cloud provider.

## Fixture Requirement

Before implementation, the repo should contain at least two domains:

1. `examples/billing-okf`
2. `examples/software-okf`

The first implementation must run against both.

