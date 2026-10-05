# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# ---- dependencies -------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ----------------------------------------------------------------
# No Prisma (this app has no DB access — it calls the shared backend over
# HTTP) and no NEXT_PUBLIC_* build args (no client-exposed config at all —
# BACKEND_URL is server-only, read at runtime, never inlined into the
# client bundle).
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runtime ----------------------------------------------------------------
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

EXPOSE 4002
CMD ["npm", "start"]
