# OKF Study Guide

Last checked: 2026-07-04

## What OKF Is

OKF usually refers to the Open Knowledge Foundation, also branded as OKFN. It is a nonprofit focused on open knowledge: content, information, and data that people can access, use, reuse, modify, and redistribute without legal, technical, or social restriction.

The current OKFN framing is broader than "open data only." OKFN describes its mission as creating a fair, sustainable, and open digital future by advancing open knowledge as a design principle for digital infrastructure, policy, methods, communities, literacy, and standards.

For our agent work, treat OKF as an ecosystem, not one API:

- Values: openness, public interest, accountability, reproducibility, adaptability.
- Standards: Open Definition, conformant licenses, Data Package.
- Legal tools: Open Data Commons licenses.
- Technical tools: CKAN, Frictionless Data, Open Data Editor.
- Community layer: Open Knowledge Network, chapters, projects, forum, School of Data.
- Current AI work: AI Learning Labs, MCP/open data portal pilots, traceable AI for public data.

## Core Terms

- Open knowledge: usable and reusable knowledge without legal, technical, or social restriction.
- Open data: data that can be freely accessed, used, modified, and shared.
- Open Definition: the rulebook for whether data/content is open.
- Conformant license: a license OKFN/Open Definition recognizes as satisfying openness principles.
- CKAN: open source data portal/data management system used by governments, NGOs, research groups, and enterprises.
- Data Package: a simple standard for describing datasets, files, tabular data, schemas, licenses, contributors, and related metadata.
- Frictionless Data: software and standards for packaging, validating, transforming, and moving data.
- MCP bridge: a Model Context Protocol layer that exposes datasets/tools to an AI assistant with traceable data access.

## The Open Definition

The Open Definition is the conceptual anchor. Its shortest form is: open data and content can be freely used, modified, and shared by anyone for any purpose.

For an agent, this means every dataset/tool response needs licensing and provenance awareness. Do not assume "publicly viewable" means "open." Check:

- Is access free or practically available?
- Is the license conformant?
- Can it be reused commercially and non-commercially?
- Are attribution or share-alike requirements present?
- Are there technical blockers such as non-machine-readable formats?
- Are there privacy, personal data, or ethical constraints even if access is technically possible?

## Licensing

Recommended Open Definition conformant licenses include:

- CC0-1.0 for content/data public domain dedication.
- PDDL-1.0 for data public domain dedication.
- CC-BY-4.0 for content/data with attribution.
- ODC-By-1.0 for data/databases with attribution.
- CC-BY-SA-4.0 for content/data with attribution and share-alike.
- ODbL-1.0 for data/databases with attribution and share-alike.

Agent behavior should preserve license metadata and emit attribution when needed. The lazy rule is simple: never strip license, source URL, publisher, update date, or field definitions from retrieved data.

## Technical Surface

### CKAN

CKAN is the most important technical piece for agent integration. Many open data portals expose CKAN APIs. Its Action API can list datasets, show dataset/resource metadata, search packages/resources, and access activity streams. Some actions are GET-able; write operations and private actions need API tokens.

Common read-only actions:

- `package_list`
- `package_search`
- `package_show`
- `resource_search`
- `resource_show`
- `organization_list`
- `organization_show`
- `group_list`
- `tag_list`
- `license_list`
- `status_show`

Important CKAN quirk: older and internal APIs often use "package" to mean "dataset."

### DataStore And Files

A CKAN resource may be:

- a direct downloadable file, such as CSV, JSON, XLSX, PDF, ZIP;
- a DataStore table with queryable rows;
- a linked external URL;
- metadata only.

An agent skill should not assume tabular data exists. It should inspect resource metadata first, then pick a path:

- DataStore available: query structured rows.
- Direct CSV/JSON: download and parse.
- XLSX/PDF/ZIP: warn about parsing limits or use an extractor if available.
- External URL: fetch only after checking domain/source and license context.

### Data Package

Data Package is useful as the agent's internal interchange format. It can represent dataset metadata, resources, table schemas, field types, constraints, missing values, licenses, contributors, and paths.

For the future skill, a compact goal is: convert CKAN dataset/resource metadata into a Data Package-like summary for the model before answering.

### Frictionless Data

Frictionless Data can validate and standardize tabular resources. It is useful when the skill needs to:

- infer or validate schemas;
- package a CSV with metadata;
- check field types and constraints;
- document transformations;
- move data between local files, databases, and analysis code.

## Current AI Direction At OKFN

OKFN's 2026 AI Learning Labs are directly relevant. They are working on public-interest AI literacy and experiments where users ask natural-language questions over open data portals and receive answers traceable to official datasets.

The most important lesson from OKFN's MCP/open data pilot is that connection is the easy part. Trust depends on dataset context:

- field definitions;
- units;
- time periods;
- methodology;
- caveats and gaps;
- valid and invalid questions;
- whether an explanation is supported by the data.

Traceability alone is not enough. A model can cite the right dataset and still invent an unsupported explanation.

## What An OKF Agent Skill Should Know

Minimum useful skill behavior:

- Discover whether a portal is CKAN.
- Search datasets by keyword.
- Fetch dataset metadata and resources.
- Preserve provenance, license, publisher, and update timestamps.
- Read data dictionaries, field descriptions, units, caveats, and methodology before answering.
- Refuse or qualify answers when metadata is missing.
- Return citations to dataset/resource URLs.
- Separate facts in the data from interpretation.

Do not build:

- a general web crawler;
- automatic write/update actions;
- a custom license engine;
- a broad AI benchmark.

Those can wait until a real user task needs them.

## Suggested Learning Order

1. Read OKFN "Who we are" to understand mission and framing.
2. Read the Open Definition homepage and conformant licenses page.
3. Read the Open Data Handbook intro, "What is Open Data?", and "How to Open Up Data."
4. Learn CKAN concepts: dataset/package, resource, organization, group, tag, license.
5. Read CKAN Action API basics and test `package_search` / `package_show` against a public portal.
6. Read Data Package v2 overview and Table Schema basics.
7. Read Frictionless Data intro for validation/packaging patterns.
8. Read OKFN AI Learning Labs and the MCP for Open Data Portals post.
9. Draft the agent skill around one concrete portal and 3-5 real questions.

## Open Questions

- Did "googel okf" mean "Google OKF" as a specific Google project, or "Google/search OKF"? I found no official Google OKF product in the checked sources.
- Which portal should the first agent skill target: CKAN demo, data.gov, Brazil Transparency Portal, Uruguay data catalog, or another OKF-related portal?
- Should the first skill only read public data, or also support authenticated CKAN write/admin actions later?

