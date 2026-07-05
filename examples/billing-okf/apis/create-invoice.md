---
type: API Endpoint
title: Create Invoice
description: Creates a draft invoice for an existing customer account.
resource: https://api.acme.test/v1/invoices
tags: [billing, invoices, api]
timestamp: 2026-07-04
---

# Create Invoice

Creates a draft invoice for an existing customer. The invoice is not charged until the billing service finalizes it.

## Inputs

| Field | Required | Description |
| --- | --- | --- |
| `customer_id` | yes | Stable customer identifier from the billing system. |
| `currency` | yes | ISO 4217 currency code. Must match the customer's billing account currency. |
| `line_items` | yes | One or more invoice line items. |
| `memo` | no | Internal note shown to finance operators. |

## Use

Use this endpoint when a customer needs a draft invoice for manual review, purchase order processing, or finance approval.

Do not use this endpoint to issue refunds. Use [Refund Payment](refund-payment.md) instead.

## Caveats

- Draft invoices do not count toward [Net Revenue](../metrics/net-revenue.md).
- Invoices created for trial accounts must follow [Trial Eligibility](../policies/trial-eligibility.md).
- The agent must confirm `customer_id` before creating any invoice draft.

## Related

- [Refund Payment](refund-payment.md)
- [Net Revenue](../metrics/net-revenue.md)
- [Billing API docs](../references/billing-api-docs.md)

## Citations

[1] [Billing API docs](../references/billing-api-docs.md)

