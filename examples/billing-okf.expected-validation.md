# Expected Validation Output

This file describes what a future `okf validate examples/billing-okf` command should report.

```text
OKF bundle: examples/billing-okf

Result: pass with warnings

Files:
  concepts: 10
  reserved: 2

Checks:
  pass  bundle root exists
  pass  index.md exists
  pass  log.md exists
  pass  markdown files are UTF-8
  pass  concept files have YAML frontmatter
  pass  concept files have non-empty type
  pass  recommended title present
  pass  recommended description present
  pass  recommended resource present
  pass  recommended tags present
  pass  recommended timestamp present
  pass  internal markdown links resolve
  pass  citations section present in concept files
  warn  external resource URLs are placeholders
  warn  bundle has no manifest file
```

## Notes

- `index.md` and `log.md` are reserved files.
- Placeholder external URLs are acceptable for this demo because the project is fictional.
- A future validator should allow unknown frontmatter keys and preserve them when rewriting files.

