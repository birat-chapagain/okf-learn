---
type: Policy
title: Trial Eligibility
description: Rules for deciding whether an organization can start a free trial.
resource: policy://billing/trial-eligibility
tags: [billing, trials, policy]
timestamp: 2026-07-04
---

# Trial Eligibility

An organization is eligible for one free trial unless a finance operator grants an exception.

## Rule

- One trial per organization.
- Trial length is 14 days.
- A trial cannot start if the organization already has an active paid subscription.
- Former paid customers require sales approval before a new trial.

## Use

Use this policy before creating invoices or explaining why a trial account is excluded from revenue metrics.

## Caveats

- Trial activity is excluded from [Net Revenue](../metrics/net-revenue.md).
- Trial users are excluded from [Churn Rate](../metrics/churn-rate.md).
- Manual exceptions must be linked to a sales approval note.

## Related

- [Create Invoice](../apis/create-invoice.md)
- [Net Revenue](../metrics/net-revenue.md)
- [Churn Rate](../metrics/churn-rate.md)

## Citations

[1] [Support policy manual](../references/support-policy.md)  
[2] [Finance metric spec](../references/finance-metric-spec.md)

