# Context Pack Spec

This document defines the first output contract for:

```text
knowpack context <bundle> "<query>"
```

The context pack is for the model, not for humans.

## Principles

- Small enough to fit in a prompt.
- Specific enough to prevent guessing.
- Cited enough to verify.
- Structured enough for an agent to consume.
- Plain JSON first.

## JSON Shape

```json
{
  "version": "0.1",
  "bundle": "examples/billing-okf",
  "query": "Can I refund this customer?",
  "status": "ok",
  "concepts": [
    {
      "path": "policies/refund-window.md",
      "type": "Policy",
      "title": "Refund Window",
      "why": "Defines when refunds are allowed and when finance/risk approval is required.",
      "summary": "Customers are eligible for a standard refund within 30 days of captured payment.",
      "caveats": [
        "Enterprise contracts can override the standard refund window.",
        "The policy does not decide refund amount; it only decides approval path.",
        "The agent must cite the support ticket or contract note before recommending a refund."
      ],
      "citations": [
        "references/support-policy.md"
      ],
      "resource": "policy://support/refund-window"
    }
  ],
  "missing": [],
  "warnings": []
}
```

## Required Top-Level Fields

- `version`
- `bundle`
- `query`
- `status`
- `concepts`
- `missing`
- `warnings`

## Required Concept Fields

- `path`
- `type`
- `title`
- `why`
- `summary`
- `caveats`
- `citations`
- `resource`

## Status Values

- `ok`: enough context was found.
- `partial`: some relevant context found, but something important is missing.
- `empty`: no useful concepts found.
- `error`: bundle could not be parsed.

## Missing Items

Use `missing` for context the agent should know is absent.

Example:

```json
{
  "kind": "citation",
  "message": "No support ticket source was present in the bundle."
}
```

## Warnings

Use `warnings` for context-quality problems.

Example:

```json
{
  "kind": "broken_link",
  "path": "apis/refund-payment.md",
  "message": "Linked reference does not exist."
}
```

## Non-Goals

The context pack should not include:

- full bundle contents;
- rendered HTML;
- graph layout data;
- token counts in version 0.1;
- model-generated reasoning;
- external fetch results.

