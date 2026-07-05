---
type: API Endpoint
title: Refund Payment
description: Creates a refund request for a captured payment.
resource: https://api.acme.test/v1/refunds
tags: [billing, refunds, api]
timestamp: 2026-07-04
---

# Refund Payment

Creates a refund request for a payment that has already been captured.

## Inputs

| Field | Required | Description |
| --- | --- | --- |
| `payment_id` | yes | Captured payment identifier. |
| `amount` | yes | Refund amount in the payment currency. |
| `reason_code` | yes | One of `duplicate`, `customer_request`, `service_failure`, or `fraud`. |
| `support_ticket_id` | yes | Support ticket approving or requesting the refund. |

## Use

Use this endpoint only after checking [Refund Window](../policies/refund-window.md). Partial refunds are allowed when the requested amount is lower than the captured payment amount.

## Caveats

- Refunds reduce [Net Revenue](../metrics/net-revenue.md) based on refund effective date.
- Refunds outside the standard window require manual approval.
- The agent must not create a refund without a support ticket citation.

## Related

- [Create Invoice](create-invoice.md)
- [Refund Window](../policies/refund-window.md)
- [Net Revenue](../metrics/net-revenue.md)

## Citations

[1] [Billing API docs](../references/billing-api-docs.md)  
[2] [Support policy manual](../references/support-policy.md)

