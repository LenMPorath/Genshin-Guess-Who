FROM node:lts-alpine
LABEL Developers="Len Porath"

WORKDIR /app

# Alle nötigen Dateien kopieren
COPY package.json package-lock.json ./
COPY tsconfig.json svelte.config.js vite.config.ts ./
COPY src ./src
COPY static ./static

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]