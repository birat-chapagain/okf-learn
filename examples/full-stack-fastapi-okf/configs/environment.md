---
type: Config
title: Environment Variables
description: Environment variable surface for domain, frontend host, backend secrets, CORS, PostgreSQL, SMTP, Sentry, and Docker image names.
resource: repo://.env
tags: [env, config, deployment, docker, secrets]
timestamp: 2026-07-05
---

# Environment Variables

The `.env` file contains application, backend, email, database, and Docker image configuration.

## Important Variables

- `DOMAIN`
- `FRONTEND_HOST`
- `ENVIRONMENT`
- `PROJECT_NAME`
- `STACK_NAME`
- `BACKEND_CORS_ORIGINS`
- `SECRET_KEY`
- `FIRST_SUPERUSER`
- `FIRST_SUPERUSER_PASSWORD`
- `POSTGRES_PASSWORD`
- `POSTGRES_SERVER`
- `POSTGRES_DB`
- `POSTGRES_USER`

## Constraints

- Do not deploy with default `changethis` secrets.
- Set production `DOMAIN` and `FRONTEND_HOST` for deployed environments.
- `BACKEND_CORS_ORIGINS` must include the dashboard and API domains used by the deployment.
- The `.env` file can contain secrets and may need to be excluded from public repos.

## Related

- [Deployment](../runbooks/deployment.md)
- [Docker Compose stack](docker-compose.md)
- [Environment file reference](../references/env-file.md)
- [Deployment docs reference](../references/deployment-docs.md)

## Citations

[1] [Environment file reference](../references/env-file.md)  
[2] [Deployment docs reference](../references/deployment-docs.md)

