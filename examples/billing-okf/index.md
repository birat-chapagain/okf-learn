---
type: Index
title: Billing OKF Demo Bundle
description: Hand-written Open Knowledge Format bundle for a fictional SaaS billing project.
resource: repo://examples/billing-okf
tags: [billing, demo, okf]
timestamp: 2026-07-04
---

# Billing OKF Demo Bundle

This bundle shows how Open Knowledge Format can describe project knowledge that is not just database metadata.

The fictional product is a SaaS billing system. The agent needs to understand APIs, metrics, policies, playbooks, and source references before answering or acting.

## Start Here

- [Create Invoice API](apis/create-invoice.md)
- [Refund Payment API](apis/refund-payment.md)
- [Net Revenue metric](metrics/net-revenue.md)
- [Churn Rate metric](metrics/churn-rate.md)
- [Refund Window policy](policies/refund-window.md)
- [Trial Eligibility policy](policies/trial-eligibility.md)
- [Investigate Revenue Drop playbook](playbooks/investigate-revenue-drop.md)

## Useful Questions This Bundle Should Answer

- Which API creates a customer invoice?
- What inputs are required before creating an invoice?
- How is net revenue defined?
- Which date should an agent use for revenue reporting?
- When is a customer eligible for a refund?
- What should an agent check before explaining a revenue drop?
- Which source supports each policy or metric?

## Known Limits

- The project is fictional and safe for demonstration.
- URLs use `example.com` or `api.acme.test` placeholders.
- No real payment operation should be performed from this bundle.
- This bundle tests knowledge structure, not live API execution.

## Citations

[1] [Billing API docs](references/billing-api-docs.md)  
[2] [Finance metric spec](references/finance-metric-spec.md)  
[3] [Support policy manual](references/support-policy.md)

