---
type: Reference
title: Development Docs
description: Source reference for local Docker Compose, service replacement, logs, Mailcatcher, env vars, and prek hooks.
resource: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/development.md
tags: [reference, development, docker]
timestamp: 2026-07-05
---

# Development Docs

## Relevant Facts

- Local stack starts with `docker compose watch`.
- Logs are inspected with `docker compose logs` or service-specific logs.
- Local frontend can run with `bun run dev`.
- Local backend can run with `fastapi dev app/main.py`.
- `.env` changes require restarting the stack.
- Mailcatcher captures local development email.

## Citations

[1] https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/development.md

