# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
# Prisma's query engine needs OpenSSL; libc6-compat helps native deps on musl.
RUN apk add --no-cache openssl libc6-compat

# ---- dependencies -------------------------------------------------------
# `npm ci` triggers the postinstall `prisma generate`, which needs the
# schema present — so prisma/ has to be copied in before it, not just
# package.json.
FROM base AS deps
WORKDIR /app
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ---- build ----------------------------------------------------------------
FROM base AS build
WORKDIR /app
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
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
COPY --from=build /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
