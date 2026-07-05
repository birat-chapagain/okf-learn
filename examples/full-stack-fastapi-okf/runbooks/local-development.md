---
type: Runbook
title: Local Development
description: Local development workflow using Docker Compose, optional service replacement, logs, Mailcatcher, and prek hooks.
resource: repo://development.md
tags: [development, docker, compose, frontend, backend, logs]
timestamp: 2026-07-05
---

# Local Development

Use this runbook to start and inspect the local development stack.

## Steps

1. Start the local stack with `docker compose watch`.
2. Use `docker compose logs` to inspect the whole stack.
3. Use `docker compose logs backend` to inspect backend logs.
4. Stop `frontend` and run `bun run dev` for local frontend live reload.
5. Stop `backend` and run `fastapi dev app/main.py` for local backend development.

## Constraints

- The first stack startup can take time while the backend waits for the database.
- After changing `.env` variables, restart the stack.
- Mailcatcher captures local development emails instead of sending real email.
- Local development Compose overrides should not be treated as production behavior.

## Related

- [Docker Compose stack](../configs/docker-compose.md)
- [Backend API](../services/backend.md)
- [Frontend](../services/frontend.md)
- [Development docs reference](../references/development-docs.md)

## Citations

[1] [Development docs reference](../references/development-docs.md)

