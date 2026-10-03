#!/bin/sh
# Runs on every container start. `prisma migrate deploy` only applies
# migrations that haven't been recorded yet (it's a no-op if the schema is
# already current), so this makes "docker compose up -d --build" self-
# sufficient — no separate manual migrate step needed after a schema change.
set -e

echo "Applying any pending Prisma migrations..."
npx prisma migrate deploy

echo "Starting Next.js..."
exec npm start
