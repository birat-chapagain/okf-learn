---
type: Service
title: API Gateway
description: Edge service that routes customer API traffic to internal services.
resource: service://api-gateway
tags: [service, gateway, routing, deploy]
timestamp: 2026-07-04
---

# API Gateway

API Gateway receives customer API traffic, applies authentication and rate limits, then routes requests to internal services.

## Responsibilities

- Validate request authentication through [Auth Middleware](../modules/auth-middleware.md).
- Apply [Rate Limits](../configs/rate-limits.md).
- Route requests to upstream services.
- Emit gateway metrics and structured logs.

## Constraints

- Do not bypass auth middleware for customer routes.
- Rate-limit changes must be tested with [Request Routing Tests](../tests/request-routing.md).
- 503 errors after deploy should follow [Debug 503 After Deploy](../runbooks/debug-503.md).

## Related

- [Rate Limits](../configs/rate-limits.md)
- [Auth Middleware](../modules/auth-middleware.md)
- [Gateway Database](../databases/gateway-db.md)
- [Service architecture note](../references/service-architecture.md)

## Citations

[1] [Service architecture note](../references/service-architecture.md)

