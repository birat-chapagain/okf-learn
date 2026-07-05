---
type: Config
title: Rate Limits
description: Runtime configuration for API Gateway request throttling.
resource: config://api-gateway/rate-limits
tags: [config, gateway, rate-limit, deploy]
timestamp: 2026-07-04
---

# Rate Limits

Rate Limits controls request throttling in API Gateway.

## Settings

| Key | Description |
| --- | --- |
| `GATEWAY_RATE_LIMIT_RPS` | Maximum requests per second per customer token. |
| `GATEWAY_BURST_LIMIT` | Short burst allowance before throttling. |
| `GATEWAY_RATE_LIMIT_MODE` | `enforce`, `shadow`, or `off`. |

## Operational Notes

- Use `shadow` mode before enforcing a large limit change.
- A bad rate-limit value can look like a 503 spike when upstream services are healthy.
- After changing this config, run [Request Routing Tests](../tests/request-routing.md).

## Related

- [API Gateway](../services/api-gateway.md)
- [Debug 503 After Deploy](../runbooks/debug-503.md)
- [Gateway operations manual](../references/gateway-ops.md)

## Citations

[1] [Gateway operations manual](../references/gateway-ops.md)

