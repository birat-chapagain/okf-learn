---
type: Reference
title: Deployment Docs
description: Source reference for remote Docker Compose deployment, Traefik, required environment variables, and GitHub Actions environments.
resource: https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/deployment.md
tags: [reference, deployment, docker, traefik, github-actions]
timestamp: 2026-07-05
---

# Deployment Docs

## Relevant Facts

- Deployment uses Docker Compose on a remote server.
- Traefik handles external HTTP/HTTPS and certificates.
- Required environment variables include `ENVIRONMENT`, `DOMAIN`, `POSTGRES_PASSWORD`, `SECRET_KEY`, `FIRST_SUPERUSER_PASSWORD`, and `BACKEND_CORS_ORIGINS`.
- Production deployment uses `compose.yml` without local overrides.
- GitHub Actions environments and secrets can drive staging/production deployment.

## Citations

[1] https://raw.githubusercontent.com/fastapi/full-stack-fastapi-template/master/deployment.md

