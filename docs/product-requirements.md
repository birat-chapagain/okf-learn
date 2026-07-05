# Product Requirements

## Product

Working name: Knowpack

Knowpack helps agents consume Open Knowledge Format bundles by retrieving the right concepts, preserving caveats and citations, and packing compact context for a model.

## Problem

Agents need project knowledge that is current, cited, and specific. Raw docs and schemas are scattered, too large, and often missing the caveats that stop a model from guessing.

## Target Users

- Agent builders who need reliable local context.
- Developers documenting a project for AI-assisted work.
- Data or API teams that need models to understand metrics, APIs, policies, and caveats.
- Open-source maintainers who want contributors and agents to share the same project knowledge.

## Goals

- Return small, relevant context packs for models.
- Test whether retrieval returns the right concepts for real agent questions.
- Preserve caveats, citations, source resources, and related concepts.
- Make concept relationships searchable and graphable.
- Keep everything file-first and git-friendly.
- Keep humans able to inspect what the agent sees.

## Non-Goals

- No hosted platform.
- No Google Cloud dependency.
- No claim to be an alternative to Google Cloud Knowledge Catalog.
- No claim to be the first OKF CLI.
- No custom database.
- No ontology editor.
- No automatic internet crawler.
- No write actions into production systems.

## MVP

The MVP should support:

- Parse concept files and frontmatter.
- Build an internal index of title, type, tags, links, citations, and body text.
- Retrieve relevant concepts for a query.
- Return an agent-ready context pack.
- Run golden retrieval tests against demo questions.
- Perform enough validation to avoid broken context.
- Render a human inspection report.

## Success Criteria

- The demo bundle passes validation with expected warnings.
- A refund question retrieves refund policy, refund API, and support reference.
- A revenue question retrieves net revenue, churn rate, revenue playbook, and finance reference.
- Context output includes citations and caveats.
- Retrieval tests can fail when required concepts are missing.
- A human can inspect the same bundle through a static report.

## Risks

- OKF is still a draft format.
- The project can become too broad if it tries to replace metadata platforms.
- A bad retriever can feed the model plausible but incomplete context.
- Name confusion with Open Knowledge Foundation must be explained clearly.

## Open Questions

- Should the first implementation be TypeScript or Python?
- Should `index.md` be generated, hand-authored, or both?
- Should broken links be warnings or errors by default?
- Should a future MCP server expose read-only tools only?
