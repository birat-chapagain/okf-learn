---
type: Metric
title: Net Revenue
description: Canonical finance metric for recognized revenue after refunds and chargebacks.
resource: metric://finance/net-revenue
tags: [finance, revenue, reporting]
timestamp: 2026-07-04
---

# Net Revenue

Net revenue is completed paid invoice value minus refunds and chargebacks.

## Definition

```text
net_revenue = completed_invoice_amount - refund_amount - chargeback_amount
```

Use the refund effective date when subtracting refunds. Do not subtract a refund from the original invoice date unless the finance metric spec explicitly changes.

## Use

Use this metric for finance reporting, revenue trend analysis, and the [Investigate Revenue Drop](../playbooks/investigate-revenue-drop.md) playbook.

## Caveats

- Draft invoices from [Create Invoice](../apis/create-invoice.md) are excluded.
- Trial accounts covered by [Trial Eligibility](../policies/trial-eligibility.md) are excluded until they convert to paid accounts.
- Refunds created through [Refund Payment](../apis/refund-payment.md) can make net revenue negative for a day.
- This metric does not prove why revenue changed. It only states the recognized value.

## Related

- [Churn Rate](churn-rate.md)
- [Refund Payment](../apis/refund-payment.md)
- [Finance metric spec](../references/finance-metric-spec.md)

## Citations

[1] [Finance metric spec](../references/finance-metric-spec.md)

