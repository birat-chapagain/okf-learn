# System Design

## Principle

The runtime is agent-first.

```text
OKF bundle -> parser -> validator -> index -> retriever -> context packer -> model
                                 -> evaluator
```

The static viewer is a human inspector that uses the same parsed/indexed data.

## Components

### Parser

Reads a bundle directory and returns concept records.

Concept record:

```text
path
frontmatter
type
title
description
resource
tags
timestamp
headings
body
links
citations
```

### Validator

Checks whether the bundle is usable.

Errors stop reliable parsing. Warnings mark quality problems.

### Indexer

Builds data structures for retrieval:

- path index;
- title index;
- type index;
- tag index;
- body text index;
- outgoing links;
- backlinks;
- citation index.

### Retriever

Given a user or agent query, finds the smallest set of relevant concepts.

Initial retrieval can be simple:

- exact path match;
- title match;
- tag/type match;
- body keyword match;
- linked concepts;
- backlinks.

### Context Packer

Turns retrieved concepts into model-ready context.

The context pack should include:

- query;
- concept path;
- type;
- title;
- summary or relevant excerpt;
- caveats;
- citations;
- source resource;
- related concepts when useful.

### Viewer

Static human inspector:

- concept list;
- validation errors and warnings;
- graph view;
- search;
- backlinks;
- citations.

### Evaluator

Runs golden retrieval tests.

Each test should define:

- query;
- required concept paths;
- forbidden concept paths;
- required citation paths;
- required caveat text or section names.

The evaluator proves the bundle is useful for agents, not just syntactically valid.

## Data Flow

```text
bundle files
  -> parse
  -> validate
  -> build index
  -> retrieve relevant concepts
  -> include linked/cited context
  -> return compact context pack
  -> optionally compare against golden retrieval tests
```

## Example Context Pack

```json
{
  "query": "Can I refund this customer?",
  "concepts": [
    {
      "path": "policies/refund-window.md",
      "type": "Policy",
      "title": "Refund Window",
      "caveats": ["Enterprise contracts can override the standard refund window."],
      "citations": ["references/support-policy.md"]
    },
    {
      "path": "apis/refund-payment.md",
      "type": "API Endpoint",
      "title": "Refund Payment",
      "caveats": ["The agent must not create a refund without a support ticket citation."],
      "citations": ["references/billing-api-docs.md", "references/support-policy.md"]
    }
  ]
}
```

## Security Rules

- Treat bundles as untrusted input.
- Do not execute code from markdown.
- Do not fetch external URLs during validation by default.
- Do not expose hidden files unless explicitly allowed.
- MCP tools should be read-only in early versions.
