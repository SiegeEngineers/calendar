#!/bin/bash

# Confirm new deploy
read -r -p "Confirm new deploy? [Y] " response
if [[ "$response" != 'Y' ]]
then
    echo "Aborting..."
    exit 1;
fi

# Build new images
docker-compose build

# Default images
images=(aoe2calendar aoe2calendar-proxy)

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

echo "Images pushed!"
echo "Rancher will now automatically deploy based on the Docker Hub webhook."
