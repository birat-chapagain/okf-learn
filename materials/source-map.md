# Source Map

Last checked: 2026-07-04

## Primary Sources

- GoogleCloudPlatform Knowledge Catalog repo: https://github.com/GoogleCloudPlatform/knowledge-catalog
- GoogleCloudPlatform Open Knowledge Format spec: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf
- GoogleCloudPlatform OKF raw spec: https://raw.githubusercontent.com/GoogleCloudPlatform/knowledge-catalog/main/okf/SPEC.md
- GoogleCloudPlatform OKF tests: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf/tests
- GoogleCloudPlatform reference agent: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf/src/reference_agent
- GoogleCloudPlatform Metadata as Code: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/toolbox/mdcode
- Google Cloud Knowledge Catalog product page: https://cloud.google.com/products/knowledge-catalog
- OKF third-party docs site: https://okf.md/
- OKF third-party tools inventory: https://okf.md/tools/
- superops-team OKF CLI: https://github.com/superops-team/okf
- Suganthan OKF Bundle Generator: https://suganthan.com/free-seo-tools/okf-generator/
- FastAPI full-stack template repo: https://github.com/fastapi/full-stack-fastapi-template
- FastAPI template development docs: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/development.md
- FastAPI template deployment docs: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/deployment.md
- FastAPI template backend README: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/backend/README.md
- FastAPI template frontend README: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/frontend/README.md
- FastAPI template Compose file: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/compose.yml
- FastAPI template env file: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/.env
- Open Knowledge Foundation home: https://okfn.org/en/
- OKFN who-we-are/mission: https://okfn.org/en/who-we-are/
- OKFN tools overview: https://okfn.org/en/what-we-do/tools/
- Open Knowledge Network: https://okfn.org/en/network/
- OKFN project repository: https://network.okfn.org/project/
- AI Learning Labs: https://okfn.org/en/projects/ai-learning-labs/
- MCP for Open Data Portals post: https://blog.okfn.org/2026/06/10/mcp-for-open-data-portals-trust-depends-on-understanding-the-data/

## Standards And Legal

- Open Definition: https://opendefinition.org/
- Open Definition conformant licenses: https://opendefinition.org/licenses/
- Open Data Commons licenses: https://opendatacommons.org/licenses/
- Data Package v2: https://datapackage.org/
- Frictionless Data: https://frictionlessdata.io/

## Data Portal / API Material

- CKAN homepage: https://ckan.org/
- CKAN docs: https://docs.ckan.org/en/latest/
- CKAN API guide: https://docs.ckan.org/en/latest/api/index.html

## Study Notes Per Source

- GoogleCloudPlatform Knowledge Catalog repo: samples/tools for Knowledge Catalog; contains the `okf/` folder with Open Knowledge Format material; repo says it is not an official Google product.
- GoogleCloudPlatform OKF spec: defines OKF as a draft markdown + YAML frontmatter bundle format for human- and agent-readable knowledge.
- GoogleCloudPlatform OKF tests/reference agent: distinguish spec conformance from stricter producer behavior; useful for knowing what Knowpack should warn on versus fail on.
- GoogleCloudPlatform Metadata as Code: shows the Knowledge Catalog sync/MCP lane that Knowpack should avoid.
- Google Cloud Knowledge Catalog product page: official Google Cloud product context for Knowledge Catalog, agent-ready context, semantic search, governed retrieval, metadata harvesting, and MCP/context APIs.
- OKF third-party docs site: confirms a broader emerging ecosystem around OKF; useful but not treated as Google official.
- OKF tools inventory: lists early tools including Google reference agent/visualizer, kcmd, Knowledge Catalog, website generators, `superops-team/okf`, and okflint.
- superops-team OKF CLI: existing Go CLI with repo scanning, linting, search, git hooks, and a release; this means our project should not claim to be the first OKF CLI.
- Suganthan OKF Bundle Generator: website/sitemap-to-OKF generator; confirms the generator space already has early tools.
- FastAPI full-stack template sources: used to create the real-repo OKF fixture under `examples/full-stack-fastapi-okf`; selected because it covers backend, frontend, Docker Compose, PostgreSQL, env vars, tests, deployment, and generated frontend client context.
- OKFN home: current work includes tools, services, AI Learning Labs, Open Data Editor, Data Package v2, Open Knowledge Network, Open Data Day, and current AI/open-data work.
- OKFN who-we-are: defines open knowledge and current mission/vision.
- Tools overview: names the key OKFN ecosystem tools: CKAN, Open Definition, Open Data Commons, Data Package, Open Data Editor, Frictionless Data.
- Open Definition: core meaning of "open" for data/content.
- Conformant licenses: practical license list and recommended open licenses.
- Open Data Commons: database/data-specific legal tools: ODbL, ODC-By, PDDL.
- CKAN: main data portal platform and API surface for agent integration.
- Data Package: best candidate for a compact internal metadata format.
- Frictionless Data: validation/packaging layer for tabular data.
- AI Learning Labs / MCP post: strongest current source for how OKFN is applying AI to open data portals.
