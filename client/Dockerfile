# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Production stage - serve with nginx
# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --fetch-retry-mintimeout 20000 --fetch-retry-maxtimeout 120000 --fetch-retries 5

# Accept build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]