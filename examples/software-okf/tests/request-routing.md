---
type: Test Suite
title: Request Routing Tests
description: Test suite for API Gateway routing, auth, and rate-limit behavior.
resource: test://gateway/request-routing
tags: [tests, gateway, routing, auth]
timestamp: 2026-07-04
---

# Request Routing Tests

Request Routing Tests cover gateway route mapping, auth handling, and rate-limit behavior.

## Use

Run this suite after changing:

- [API Gateway](../services/api-gateway.md);
- [Rate Limits](../configs/rate-limits.md);
- [Auth Middleware](../modules/auth-middleware.md).

## Constraints

- Tests must include valid, expired, missing, and malformed tokens.
- Rate-limit changes should include both `shadow` and `enforce` mode cases.
- 503 debugging should include upstream timeout cases.

## Related

- [Debug 503 After Deploy](../runbooks/debug-503.md)
- [Testing guide](../references/testing-guide.md)

## Citations

[1] [Testing guide](../references/testing-guide.md)

