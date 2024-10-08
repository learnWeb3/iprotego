FROM node:18-alpine AS base

RUN apk update && apk add --no-cache tini 

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm i --global next

RUN npm i --verbose

COPY . .

RUN npm run build:dev

WORKDIR /app

ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["next", "start"]