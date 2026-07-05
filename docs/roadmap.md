# Roadmap

## Phase 0: Definition

Status: in progress

Deliverables:

- project blueprint;
- opportunity report;
- hand-written demo bundle;
- validation rules;
- product requirements;
- system design.

Done when:

- the demo bundle clearly proves what the tool should do;
- README explains the project in under one minute.

## Phase 1: Context Prototype

No platform work.

Deliverables:

- parse local bundle;
- build a simple index;
- retrieve concepts by query;
- follow links and backlinks;
- output compact context JSON.

Done when:

- refund query retrieves refund policy, refund API, and support reference;
- revenue query retrieves net revenue, churn metric, playbook, and finance reference.

## Phase 2: Evaluation Prototype

Deliverables:

- define golden retrieval tests;
- assert required concepts are included;
- assert forbidden concepts are excluded;
- assert citations and caveats are present;
- keep validation checks as support behavior.

Done when:

- a broken bundle or weak retriever fails a visible test;
- the billing demo has at least three passing retrieval tests.

## Phase 3: Human Inspector

Deliverables:

- static HTML report from the bundle;
- validation warnings;
- concept list;
- graph/backlinks;
- citations.

Done when:

- a user can inspect what the agent would retrieve without reading every file.

## Phase 4: Agent Bridge

Deliverables:

- read-only MCP server or equivalent local API;
- tools for search, read, related, and context;
- no write actions.

Done when:

- an agent can answer questions using only bundle context and citations.

## Phase 5: Converters

Deliverables:

- one converter only;
- likely OpenAPI-to-OKF or CKAN/Data-Package-to-OKF.

Done when:

- a real source can become a useful starter OKF bundle without manual copy-paste.
