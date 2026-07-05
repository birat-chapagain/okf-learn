---
type: Test Suite
title: Backend Tests
description: Backend Pytest suite run through backend scripts or Docker Compose.
resource: repo://backend/tests
tags: [backend, tests, pytest, docker]
timestamp: 2026-07-05
---

# Backend Tests

Backend tests use Pytest.

## Use

- From `backend`, run backend tests with `bash ./scripts/test.sh`.
- If the stack is already running, run tests through Docker Compose with `docker compose exec backend bash scripts/tests-start.sh`.
- Add or update tests under `backend/tests/`.

## Constraints

- Backend endpoint, model, and CRUD changes should update backend tests when behavior changes.
- Extra Pytest arguments can be forwarded through the Docker Compose test command.
- GitHub Actions can run backend tests automatically.

## Related

- [Backend API](../services/backend.md)
- [Docker Compose stack](../configs/docker-compose.md)
- [Backend README reference](../references/backend-readme.md)

## Citations

[1] [Backend README reference](../references/backend-readme.md)

