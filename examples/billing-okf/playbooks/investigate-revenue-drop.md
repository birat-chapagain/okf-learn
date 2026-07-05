---
type: Playbook
title: Investigate Revenue Drop
description: Checklist for explaining a sudden decrease in net revenue.
resource: playbook://finance/investigate-revenue-drop
tags: [finance, playbook, revenue]
timestamp: 2026-07-04
---

# Investigate Revenue Drop

Use this playbook when net revenue decreases materially in a reporting period.

## Steps

1. Confirm the date range and currency.
2. Read [Net Revenue](../metrics/net-revenue.md) before calculating anything.
3. Compare completed invoice value, refunds, and chargebacks separately.
4. Check whether [Refund Payment](../apis/refund-payment.md) volume increased.
5. Check whether [Churn Rate](../metrics/churn-rate.md) increased for paid customers.
6. Look for one-time enterprise contract changes before claiming a trend.
7. State which findings are supported by the data and which are hypotheses.

## Do Not

- Do not blame churn unless churn actually increased.
- Do not use draft invoices from [Create Invoice](../apis/create-invoice.md).
- Do not treat a refund spike as lost demand without more evidence.
- Do not infer customer intent from finance metrics alone.

## Output

The agent response should include:

- short answer;
- date range;
- metrics checked;
- likely contributors;
- unsupported explanations;
- citations.

## Related

- [Net Revenue](../metrics/net-revenue.md)
- [Churn Rate](../metrics/churn-rate.md)
- [Finance metric spec](../references/finance-metric-spec.md)

## Citations

[1] [Finance metric spec](../references/finance-metric-spec.md)

