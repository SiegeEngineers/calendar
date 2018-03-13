#!/bin/bash

# in root:
# docker-compose build
# cd deploy/
# ./deploy.sh

# on server, docker-compose pull in root
# then do docker-compose up -d in manual/
# then make sure ical service is running on :3001

# Default images
images=(aoe2calendar aoe2calendar-proxy)

# Confirm new deploy
read -r -p "Confirm new deploy? [Y] " response
if [[ "$response" != 'Y' ]]
then
    echo "Aborting..."
    exit 1;
fi

# images to deploy
if [[ "$@" != '' ]]
then
    images=($@)
fi

for item in ${images[*]}
do
    echo "* docker-hub: Pushing ${item} to docker-hub"
    docker tag ${item} aoe2calendar/${item}:latest
    docker push aoe2calendar/${item}:latest
done


echo "Deploy finished!"
