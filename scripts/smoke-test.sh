#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

node --check knowpack.js

node knowpack.js check examples/billing-okf >/tmp/knowpack-check-billing.txt
node knowpack.js check examples/software-okf >/tmp/knowpack-check-software.txt
node knowpack.js check examples/full-stack-fastapi-okf >/tmp/knowpack-check-fastapi.txt
if node knowpack.js check examples/broken-okf >/tmp/knowpack-check-broken.txt; then
  echo "broken fixture unexpectedly passed"
  exit 1
fi
diff -u examples/broken-okf.expected-check.txt /tmp/knowpack-check-broken.txt

mkdir -p /tmp/knowpack-empty-okf
if node knowpack.js check /tmp/knowpack-empty-okf >/tmp/knowpack-check-empty.txt; then
  echo "empty fixture unexpectedly passed"
  exit 1
fi

if node knowpack.js context examples/does-not-exist "test" >/tmp/knowpack-context-missing.json 2>/tmp/knowpack-context-missing.err; then
  echo "missing bundle context unexpectedly passed"
  exit 1
fi

if node knowpack.js context examples/broken-okf "missing type" >/tmp/knowpack-context-broken.json 2>/tmp/knowpack-context-broken.err; then
  echo "broken bundle context unexpectedly passed"
  exit 1
fi

node knowpack.js eval examples/billing-okf examples/billing-okf.retrieval-tests.yml >/tmp/knowpack-eval-billing.txt
node knowpack.js eval examples/software-okf examples/software-okf.retrieval-tests.yml >/tmp/knowpack-eval-software.txt
node knowpack.js eval examples/full-stack-fastapi-okf examples/full-stack-fastapi-okf.retrieval-tests.yml >/tmp/knowpack-eval-fastapi.txt
if node knowpack.js eval examples/billing-okf examples/broken-okf.expected-check.txt >/tmp/knowpack-eval-empty.txt 2>/tmp/knowpack-eval-empty.err; then
  echo "empty eval unexpectedly passed"
  exit 1
fi
node knowpack.js eval examples/billing-okf examples/billing-okf.retrieval-tests.yml --json >/tmp/knowpack-eval-billing.json
node knowpack.js eval examples/software-okf examples/software-okf.retrieval-tests.yml --json >/tmp/knowpack-eval-software.json
node knowpack.js eval examples/full-stack-fastapi-okf examples/full-stack-fastapi-okf.retrieval-tests.yml --json >/tmp/knowpack-eval-fastapi.json

node knowpack.js context examples/billing-okf "Can I refund this customer?" >/tmp/knowpack-context-billing.json
node knowpack.js context examples/software-okf "Why are API requests returning 503 after deploy?" >/tmp/knowpack-context-software.json
node knowpack.js context examples/full-stack-fastapi-okf "How do I run backend tests?" >/tmp/knowpack-context-fastapi.json

node -e "for (const f of ['/tmp/knowpack-context-billing.json','/tmp/knowpack-context-software.json','/tmp/knowpack-context-fastapi.json','/tmp/knowpack-eval-billing.json','/tmp/knowpack-eval-software.json','/tmp/knowpack-eval-fastapi.json']) JSON.parse(require('fs').readFileSync(f, 'utf8'))"

echo "smoke test passed"
