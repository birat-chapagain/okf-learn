---
type: Database
title: Gateway Database
description: Database notes for API Gateway routing and customer token metadata.
resource: database://gateway-db
tags: [database, gateway, routing]
timestamp: 2026-07-04
---

# Gateway Database

Gateway Database stores route metadata and token ownership records used by API Gateway.

## Use

Read this concept when changing route metadata storage or token ownership lookups.

## Constraints

- Do not change schema during incident response unless a migration is already approved.
- 503 errors are usually not database-related unless logs show database timeouts.
- Auth token secrets are not stored here.

## Related

- [API Gateway](../services/api-gateway.md)
- [Auth Middleware](../modules/auth-middleware.md)
- [Service architecture note](../references/service-architecture.md)

## Citations

[1] [Service architecture note](../references/service-architecture.md)

