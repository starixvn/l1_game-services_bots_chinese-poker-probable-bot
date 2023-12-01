FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS cleaner
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npx mod-pruner prune --force
COPY --from=builder /app/dist .

FROM node:lts-alpine
USER node
WORKDIR /opt/service
ENV PORT 5000
COPY --from=cleaner /app ./
EXPOSE ${PORT}
CMD [ "node", "app.js" ]
