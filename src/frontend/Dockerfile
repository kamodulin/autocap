FROM node:14.9.0-buster-slim

RUN set -ex; \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends build-essential git

WORKDIR /app

COPY "package*.json" .

RUN npm install

COPY . .

EXPOSE 3000