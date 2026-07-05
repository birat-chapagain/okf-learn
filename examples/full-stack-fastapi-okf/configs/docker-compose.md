---
type: Config
title: Docker Compose Stack
description: Docker Compose services for database, adminer, backend prestart, backend, frontend, Traefik labels, and shared network/volume setup.
resource: repo://compose.yml
tags: [docker, compose, backend, frontend, postgres, traefik]
timestamp: 2026-07-05
---

# Docker Compose Stack

The main Compose file defines the app stack.

## Services

- `db`: PostgreSQL.
- `adminer`: database administration UI.
- `prestart`: backend prestart task.
- `backend`: FastAPI backend service.
- `frontend`: production frontend service.

## Constraints

- Several services require values from `.env`.
- Backend depends on healthy `db` and completed `prestart`.
- Production uses `compose.yml` directly; local development also uses `compose.override.yml`.
- Traefik labels route `api.${DOMAIN}` to backend and `dashboard.${DOMAIN}` to frontend.

## Related

- [Environment variables](environment.md)
- [Local development](../runbooks/local-development.md)
- [Deployment](../runbooks/deployment.md)
- [Compose file reference](../references/compose-file.md)

## Citations

[1] [Compose file reference](../references/compose-file.md)  
[2] [Development docs reference](../references/development-docs.md)

