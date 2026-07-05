---
type: Index
title: Software OKF Demo Bundle
description: Hand-written Open Knowledge Format bundle for a fictional API service used by coding agents.
resource: repo://examples/software-okf
tags: [software, coding-agent, demo, okf]
timestamp: 2026-07-04
---

# Software OKF Demo Bundle

This bundle shows how OKF can help a coding agent understand a software project.

The fictional project is an API gateway service. The agent needs to understand services, configs, runbooks, tests, database notes, and source references before making changes or diagnosing failures.

## Start Here

- [API Gateway service](services/api-gateway.md)
- [Rate Limits config](configs/rate-limits.md)
- [Debug 503 runbook](runbooks/debug-503.md)
- [Auth Middleware module](modules/auth-middleware.md)
- [Request Routing tests](tests/request-routing.md)
- [Gateway Database notes](databases/gateway-db.md)

## Useful Questions This Bundle Should Answer

- Why are API requests returning 503 after deploy?
- Which config controls rate limiting?
- Which tests should run after changing request routing?
- What should an agent check before changing auth middleware?
- Which database notes matter for gateway changes?

## Known Limits

- The project is fictional and safe for demonstration.
- Paths and URLs are placeholders.
- This bundle tests retrieval/context behavior, not actual deploy commands.

## Citations

[1] [Gateway operations manual](references/gateway-ops.md)  
[2] [Service architecture note](references/service-architecture.md)  
[3] [Testing guide](references/testing-guide.md)

