# Eval Output Spec

This document defines the first output contract for:

```text
knowpack eval <bundle> <tests.yml>
```

The eval checks retrieval quality, not model answer quality.

## Terminal Output

```text
Knowpack eval

Bundle: examples/billing-okf
Tests: 3

PASS refund-eligibility
  required concepts: 2/2
  required citations: 2/2
  required caveats: 2/2
  forbidden concepts: 0 present

PASS explain-revenue-drop
  required concepts: 3/3
  required citations: 1/1
  required caveats: 2/2
  forbidden concepts: 0 present

PASS trial-revenue-exclusion
  required concepts: 2/2
  required citations: 2/2
  required caveats: 1/1
  forbidden concepts: 0 present

Result: pass
```

## Failure Output

```text
Knowpack eval

Bundle: examples/billing-okf
Tests: 3

FAIL refund-eligibility
  missing concept: policies/refund-window.md
  missing caveat: The agent must not create a refund without a support ticket citation.
  forbidden concept present: apis/create-invoice.md

Result: fail
```

## JSON Output

Later, the command may support:

```text
knowpack eval <bundle> <tests.yml> --json
```

Shape:

```json
{
  "version": "0.1",
  "bundle": "examples/billing-okf",
  "result": "pass",
  "tests": [
    {
      "id": "refund-eligibility",
      "result": "pass",
      "required_concepts": {"passed": 2, "total": 2},
      "required_citations": {"passed": 2, "total": 2},
      "required_caveats": {"passed": 2, "total": 2},
      "forbidden_concepts_present": []
    }
  ]
}
```

## Exit Codes

- `0`: all tests passed.
- `1`: one or more tests failed.
- `2`: bundle or test file could not be parsed.

## Non-Goals

Version 0.1 should not include:

- fuzzy semantic score;
- LLM judge;
- vector similarity score;
- benchmark leaderboard;
- automatic test generation.

## Fixtures

- [Expected pass output](../examples/billing-okf.expected-eval-pass.txt)
- [Expected fail output](../examples/billing-okf.expected-eval-fail.txt)
