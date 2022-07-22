FROM node:18.3

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

ENV PORT=3000
CMD ["node", "server.js"]