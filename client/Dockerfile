# Stage 1: build the React/Vite application
FROM node:18-alpine AS builder

WORKDIR /app

# copy package files and install deps
COPY package*.json ./
RUN npm ci

# copy the rest of the source code and build
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine

# copy built static assets
COPY --from=builder /app/dist /usr/share/nginx/html

# include a custom nginx config with SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
