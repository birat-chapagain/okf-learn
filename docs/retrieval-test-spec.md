# Retrieval Test Spec

Knowpack should prove that an OKF bundle returns the right context for real agent questions.

This is not a model eval. It is a retrieval eval.

## Test File Shape

```yaml
version: 0.1
bundle: examples/billing-okf
tests:
  - id: refund-eligibility
    query: Can I refund this customer?
    require:
      concepts:
        - policies/refund-window.md
        - apis/refund-payment.md
      citations:
        - references/support-policy.md
    forbid:
      concepts:
        - apis/create-invoice.md
```

## Required Fields

- `id`: stable test identifier.
- `query`: natural-language agent question.
- `require.concepts`: OKF concept paths that must be returned.

## Optional Fields

- `require.citations`: citation/reference paths that must appear in the context pack.
- `require.caveats`: text snippets or section names that must appear.
- `forbid.concepts`: concept paths that should not be returned.
- `notes`: human explanation of why the test exists.

## Pass Rule

A test passes when the context pack includes every required concept and citation, includes required caveats when listed, and excludes forbidden concepts.

The first version should avoid fuzzy scoring. Exact path checks are enough.

## Why This Matters

Basic validation says:

```text
This bundle is parseable.
```

Retrieval tests say:

```text
This bundle gives the agent the right facts for a real task.
```

