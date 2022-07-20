FROM node:18.6

WORKDIR /app
COPY ./src src
COPY ./typings typings
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json tsconfig.json
COPY ./webpack.config.js webpack.config.js
COPY ./index.d.ts index.d.ts
COPY ./server.js server.js

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD node server.js