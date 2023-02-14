#!/bin/bash

docker compose build
# remeber to add the path of your folder in the shared files in dockers options for nginx volume
docker compose up -d

# for changes
# docker-compose up --build --force-recreate -d