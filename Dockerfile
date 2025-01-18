FROM node:lts-alpine
LABEL Developers="Len Porath"

#all files needed for the build
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

#all folders needed for the build
COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]