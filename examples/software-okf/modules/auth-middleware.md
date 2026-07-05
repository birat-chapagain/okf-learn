---
type: Module
title: Auth Middleware
description: Module that validates customer API tokens before routing requests.
resource: src://gateway/auth/middleware.ts
tags: [module, auth, gateway, security]
timestamp: 2026-07-04
---

# Auth Middleware

Auth Middleware validates customer API tokens and attaches customer identity to gateway requests.

## Constraints

- Customer routes must pass through this module.
- Token validation failures should return 401, not 503.
- Changes require [Request Routing Tests](../tests/request-routing.md).

## Security

- Do not log raw API tokens.
- Do not add bypasses for customer routes.
- Test expired, missing, malformed, and valid tokens.

## Related

- [API Gateway](../services/api-gateway.md)
- [Debug 503 After Deploy](../runbooks/debug-503.md)
- [Service architecture note](../references/service-architecture.md)

## Citations

[1] [Service architecture note](../references/service-architecture.md)

