FROM node:14.9.0-buster-slim

RUN set -ex; \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends && \
    npm install -g http-server

WORKDIR /app

COPY . .

ENTRYPOINT ["http-server"]