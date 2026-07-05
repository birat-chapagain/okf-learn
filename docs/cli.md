# CLI

Knowpack is currently a dependency-free Node script.

```bash
node knowpack.js check <bundle>
node knowpack.js context <bundle> "<query>"
node knowpack.js eval <bundle> <tests.yml>
node knowpack.js eval <bundle> <tests.yml> --json
npm test
```

## `check`

Checks basic bundle health.

```bash
node knowpack.js check ./examples/software-okf
```

Checks:

- bundle path exists;
- concept files parse;
- required `type` exists;
- recommended fields exist;
- local Markdown links resolve;
- citations sections exist.

## `context`

Returns model-ready JSON context for a query.

```bash
node knowpack.js context ./examples/software-okf "Why are API requests returning 503 after deploy?"
```

## `eval`

Runs golden retrieval tests.

```bash
node knowpack.js eval ./examples/software-okf ./examples/software-okf.retrieval-tests.yml
node knowpack.js eval ./examples/software-okf ./examples/software-okf.retrieval-tests.yml --json
```

## Parser Limits

The current parser is intentionally tiny.

Supported:

- Markdown files;
- YAML frontmatter delimited by `---`;
- simple `key: value` frontmatter;
- inline tag arrays like `tags: [api, tests]`;
- local Markdown links like `[Title](../path/file.md)`;
- headings and body text.

Not supported yet:

- nested YAML objects;
- multiline YAML values;
- block arrays;
- complex quoted YAML edge cases;
- duplicate frontmatter keys;
- non-Markdown concept files;
- remote URL fetching.

This is deliberate. Add a real YAML parser only when a real fixture needs it.

