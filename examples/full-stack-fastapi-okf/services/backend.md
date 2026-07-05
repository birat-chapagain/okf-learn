---
type: Service
title: Backend API
description: FastAPI backend service using SQLModel, Pydantic, PostgreSQL, JWT auth, and Pytest.
resource: repo://backend
tags: [backend, fastapi, python, api, tests]
timestamp: 2026-07-05
---

# Backend API

The backend is the Python FastAPI API service.

## Use

- Backend dependencies are managed with `uv`.
- Backend models live under `backend/app/models.py`.
- API endpoints live under `backend/app/api/`.
- CRUD utilities live under `backend/app/crud.py`.
- The backend exposes OpenAPI docs and an OpenAPI JSON document.

## Constraints

- Use the backend virtual environment when running backend commands.
- Backend tests should run after backend endpoint, model, or CRUD changes.
- CORS behavior depends on backend settings and environment variables.

## Related

- [Backend tests](../tests/backend-tests.md)
- [Environment variables](../configs/environment.md)
- [Docker Compose stack](../configs/docker-compose.md)
- [Backend README reference](../references/backend-readme.md)
- [Repository README reference](../references/repo-readme.md)

## Citations

[1] [Backend README reference](../references/backend-readme.md)  
[2] [Repository README reference](../references/repo-readme.md)

