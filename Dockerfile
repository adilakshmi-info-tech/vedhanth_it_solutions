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
# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, not
# read at container runtime — they have to arrive as build args (see
# docker-compose.yml's build.args), not just live in the runtime env_file.
FROM base AS build
WORKDIR /app
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL
ARG NEXT_PUBLIC_IMAGE_UPLOAD_APP_SLUG
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db" \
    NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
    NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
    NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL=$NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL \
    NEXT_PUBLIC_IMAGE_UPLOAD_APP_SLUG=$NEXT_PUBLIC_IMAGE_UPLOAD_APP_SLUG
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
COPY --from=build /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
