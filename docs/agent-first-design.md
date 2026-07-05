# Agent-First OKF Design

OKF is primarily for models and agents, not humans.

Humans author, review, and debug the bundle. The agent consumes it.

## Correct Mental Model

The human-facing viewer is a devtool.

The real product path is:

```text
OKF bundle -> parser -> index -> retriever -> context packer -> model
```

Not:

```text
OKF bundle -> pretty website -> model
```

## What The Agent Needs

The model should not read the entire bundle every time. It needs a small, relevant context pack.

The agent runtime needs:

- parse concept files;
- search by title, type, tags, headings, and body text;
- follow explicit links to related concepts;
- include backlinks when useful;
- preserve citations;
- preserve source `resource`;
- surface caveats before actions;
- return compact context to the model.

## Minimum Runtime Shape

```text
okf read <bundle> <path>
okf search <bundle> <query>
okf related <bundle> <path>
okf context <bundle> <query>
```

The important command is `okf context`. It should return the smallest useful pack:

```json
{
  "query": "Can I refund this customer?",
  "concepts": [
    {
      "path": "policies/refund-window.md",
      "type": "Policy",
      "title": "Refund Window",
      "summary": "Customers are eligible for a standard refund within 30 days...",
      "caveats": ["Enterprise contracts can override the standard refund window."],
      "citations": ["references/support-policy.md"]
    },
    {
      "path": "apis/refund-payment.md",
      "type": "API Endpoint",
      "title": "Refund Payment",
      "summary": "Creates a refund request for a captured payment...",
      "caveats": ["The agent must not create a refund without a support ticket citation."],
      "citations": ["references/billing-api-docs.md", "references/support-policy.md"]
    }
  ]
}
```

## Human Viewer Role

The viewer helps a person inspect the bundle:

- What files exist?
- Which concepts are connected?
- What links are broken?
- Which concepts lack citations?
- What context would the agent retrieve?

It is not the main AI interface.

## Build Order

Agent-first order:

1. Parser
2. Validator
3. Search/index
4. Context packer
5. MCP/read API
6. Human viewer

The viewer can be built early because it demos well, but it should use the same index/context output the agent uses.

