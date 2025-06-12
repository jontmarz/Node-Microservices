# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia solo package.json y package-lock.json primero para aprovechar el cache de Docker
COPY package*.json ./
RUN npm install

# Ahora copia el resto del código
COPY . .

RUN npm run build

# Etapa 2: Servidor
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80