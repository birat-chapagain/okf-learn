---
type: Runbook
title: Debug 503 After Deploy
description: Checklist for diagnosing API Gateway 503 errors after a deployment.
resource: runbook://api-gateway/debug-503
tags: [runbook, gateway, deploy, incident]
timestamp: 2026-07-04
---

# Debug 503 After Deploy

Use this runbook when API Gateway returns elevated 503 responses after a deploy.

## Steps

1. Check whether the deploy changed [Rate Limits](../configs/rate-limits.md).
2. Check gateway logs for upstream timeout errors.
3. Confirm [Auth Middleware](../modules/auth-middleware.md) did not reject valid customer tokens.
4. Compare error rates by route before and after deploy.
5. Run [Request Routing Tests](../tests/request-routing.md) before rollback or hotfix.

## Failure Modes

- Invalid upstream route mapping.
- Rate limit mode accidentally set to `enforce`.
- Auth middleware rejects valid tokens.
- Upstream service is healthy but gateway timeout is too low.

## Do Not

- Do not change database schema while debugging gateway 503s.
- Do not disable auth middleware to reduce errors.
- Do not assume the database is the cause unless gateway logs show database timeouts.

## Related

- [API Gateway](../services/api-gateway.md)
- [Rate Limits](../configs/rate-limits.md)
- [Auth Middleware](../modules/auth-middleware.md)
- [Gateway operations manual](../references/gateway-ops.md)

## Citations

[1] [Gateway operations manual](../references/gateway-ops.md)

