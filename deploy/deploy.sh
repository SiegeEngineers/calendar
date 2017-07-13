#!/bin/bash

# cd deploy/

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


for item in ${images[*]}
do
    echo "* hyper.sh: Pulling images from docker-hub"
    hyper pull aoe2calendar/${item}:latest
done


# stop current containers
echo "Stopping current container(s)"
hyper compose down

# run new container with new version
echo "Running new container(s)"
hyper compose up -d

echo "Deploy finished!"