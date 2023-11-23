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
RUN npx mod-pruner prune --force && rm package-lock.json .npmrc
COPY --from=builder /app/dist dist

FROM node:lts-alpine
USER node
WORKDIR /opt/service
COPY --from=cleaner /app ./
CMD [ "node", "." ]
