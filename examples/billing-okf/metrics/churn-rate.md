---
type: Metric
title: Churn Rate
description: Percentage of paid customers who cancel in a reporting period.
resource: metric://finance/churn-rate
tags: [finance, customers, reporting]
timestamp: 2026-07-04
---

# Churn Rate

Churn rate measures the percentage of paid customers who cancel during a reporting period.

## Definition

```text
churn_rate = canceled_paid_customers / paid_customers_at_start_of_period
```

## Use

Use this metric for retention reporting and context when investigating revenue changes.

## Caveats

- Trial accounts are excluded from both numerator and denominator.
- Paused accounts are not counted as churned until the account is canceled.
- Churn rate can explain part of a revenue drop, but it should not be treated as the only possible cause.

## Related

- [Net Revenue](net-revenue.md)
- [Trial Eligibility](../policies/trial-eligibility.md)
- [Investigate Revenue Drop](../playbooks/investigate-revenue-drop.md)

## Citations

[1] [Finance metric spec](../references/finance-metric-spec.md)

