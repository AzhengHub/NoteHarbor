# syntax=docker/dockerfile:1

# --- build stage: Hugo Extended only (the UI assets are committed) ---
FROM alpine:3.20 AS build
ARG HUGO_VERSION=0.170.0
ARG BASE_URL=http://localhost/
RUN apk add --no-cache curl tar libc6-compat \
 && curl -fsSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" \
    | tar -xz -C /usr/local/bin hugo

WORKDIR /src
COPY deploy/hugo.yaml ./hugo.yaml
COPY layouts ./layouts
COPY assets ./assets
COPY content ./content
RUN hugo --config hugo.yaml --minify --baseURL "${BASE_URL}" --destination /site --logLevel warn

# --- runtime stage: static files only ---
FROM caddy:2-alpine
COPY --from=build /site /srv
COPY deploy/Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
