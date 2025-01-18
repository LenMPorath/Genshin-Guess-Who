# Schritt 1: Verwenden eines Node.js-Images für den Build
FROM node:18-alpine AS builder
LABEL Developers="Len Porath"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Schritt 2: Produktionseinstellung mit minimalem Image
FROM node:18-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=builder /app/build ./build
ENV NODE_ENV=production
CMD ["node", "./build/index.js"]
EXPOSE 3000
