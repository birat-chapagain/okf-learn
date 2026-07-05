---
type: Reference
title: Compose File
description: Source reference for Docker Compose services, dependencies, environment variables, health checks, and Traefik labels.
resource: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/compose.yml
tags: [reference, compose, docker]
timestamp: 2026-07-05
---

# Compose File

## Relevant Facts

- Compose defines `db`, `adminer`, `prestart`, `backend`, and `frontend`.
- Backend depends on healthy database and completed prestart task.
- Compose reads `.env` variables for secrets, database, backend, frontend, and image settings.
- Traefik labels route API and dashboard hosts to backend and frontend services.

## Citations

[1] https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/compose.yml

