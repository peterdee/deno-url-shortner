FROM hayd/alpine-deno:1.0.1

RUN mkdir /app

WORKDIR /app

ADD . /app

RUN touch .env
