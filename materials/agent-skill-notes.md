# Agent Skill Notes

## Skill Goal

Give an agent a small, reliable way to use OKF-style open data resources, especially CKAN portals, while preserving provenance and avoiding unsupported claims.

## First Version Scope

Read-only CKAN helper:

- detect CKAN API base;
- search datasets;
- inspect dataset metadata;
- list resources;
- fetch resource metadata;
- optionally read small CSV/JSON resources;
- summarize answer with source, license, publisher, date, and caveats.

Skipped until needed:

- authenticated create/update/delete;
- portal-specific scraping;
- PDF/XLSX extraction;
- visualization;
- background indexing;
- multi-portal federation.

## Agent Rules

1. Start with metadata, not rows.
2. Preserve provenance: portal URL, dataset ID/name, resource ID/name, license, publisher, modified date.
3. Check field definitions, units, methodology, time period, and caveats before interpreting.
4. Say "not supported by the dataset" when the data cannot answer the question.
5. Prefer exact dataset citations over general portal citations.
6. Never infer causation from a descriptive dataset.
7. Never treat a column name as a definition.
8. For licenses, distinguish public access from open reuse.

## Minimal Tool Shape

```text
ckan_status(base_url) -> portal status
ckan_search(base_url, query, rows=10) -> datasets
ckan_dataset(base_url, id) -> dataset metadata plus resources
ckan_resource(base_url, id) -> resource metadata
ckan_datastore_search(base_url, resource_id, filters?, limit?) -> rows
```

## Response Template

```text
Answer:
<short answer>

Evidence:
- Dataset: <title> (<url>)
- Resource: <title> (<url>)
- Publisher: <publisher>
- License: <license>
- Updated: <date>

Caveats:
- <field/unit/time/methodology limitation>
- <what the data does not support>
```

## CKAN API Reminders

- API path is usually `/api/3/action/<action>`.
- `package` often means dataset.
- Many read actions can be called with GET.
- CKAN often returns HTTP 200 even when `"success": false`; always inspect the JSON `success` field.
- Write/private actions require an API token in the `Authorization` header.

## Test Questions For A Prototype

- Find datasets about public spending and list their licenses.
- For a dataset, list every resource and identify which are machine-readable.
- Explain what time period a dataset covers using only its metadata.
- Answer a numeric question from a DataStore-backed resource and cite the exact resource.
- Identify one question that the dataset cannot responsibly answer.

