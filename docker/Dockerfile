FROM node:24-alpine AS node

COPY . /project

WORKDIR /project

RUN ["npm", "install"]
RUN ["npm", "run", "build"]

# -----

FROM ghcr.io/static-web-server/static-web-server:2

WORKDIR /

COPY --from=node /project/public /public
