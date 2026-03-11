# Multi-stage build for the Node/Express TypeScript server

# ---------- build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# install dependencies (including dev for build)
COPY package*.json ./
RUN npm ci

# copy source and compile
COPY . .
# explicitly compile to dist; root dir assumed src
RUN npx tsc --outDir dist

# generate prisma client
RUN npx prisma generate

# ---------- runtime stage ----------
FROM node:18-alpine
WORKDIR /app

# copy only production node_modules and compiled output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# install only production dependencies
RUN npm ci --omit=dev

EXPOSE 5000

# default port can be overridden via environment variable
CMD ["node", "dist/server.js"]
