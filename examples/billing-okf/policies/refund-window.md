---
type: Policy
title: Refund Window
description: Standard customer refund eligibility policy.
resource: policy://support/refund-window
tags: [support, refunds, policy]
timestamp: 2026-07-04
---

# Refund Window

Customers are eligible for a standard refund within 30 days of the captured payment date.

## Rule

- Refunds within 30 days can be approved by support.
- Refunds after 30 days require finance approval.
- Fraud-related refunds require risk review regardless of age.

## Use

Check this policy before calling [Refund Payment](../apis/refund-payment.md).

## Caveats

- Enterprise contracts can override the standard refund window.
- The policy does not decide refund amount; it only decides approval path.
- The agent must cite the support ticket or contract note before recommending a refund.

## Related

- [Refund Payment](../apis/refund-payment.md)
- [Net Revenue](../metrics/net-revenue.md)
- [Support policy manual](../references/support-policy.md)

## Citations

[1] [Support policy manual](../references/support-policy.md)

