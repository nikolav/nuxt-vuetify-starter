#!/bin/bash

docker-compose up -d --build nuxtapp
# docker exec -it api yarn run db:upsert

# find . -type d \( -name "node_modules" \) -prune -o -type f -name "*" -exec grep -i "TERM" {} +
# find . -type d \( -name "node_modules" \) -prune -o -type f -name "foo.txt" 
