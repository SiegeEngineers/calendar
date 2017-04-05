<<<<<<< HEAD
#!/bin/bash

cd deploy/

# Default images
images=(aoe2calendar aoe2calendar-proxy)
=======
#!/bin/sh
cd deploy/
CERTIFICATES="../proxy/certificates/"
>>>>>>> f625570fe7260e5a5b220c4e765692a79f75724f

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
<<<<<<< HEAD
fi

=======
else
    images=(aoe2calendar aoe2calendar-proxy)
fi

# check certificates from proxy
if [[ " ${images[*]} " == *"$aeo2calendar-proxy"* ]]; then
    if [[ "$(ls -A $CERTIFICATES)" == '' ]]; then
        echo "No certificates for deploy aeo2calendar-proxy, skipping it"
        delete=(aoe2calendar-proxy)
        images=("${images[@]/$delete}")
        echo $images
    fi
fi


>>>>>>> f625570fe7260e5a5b220c4e765692a79f75724f
for item in ${images[*]}
do
    echo "* docker-hub: Pushing ${item} to docker-hub"
    docker tag ${item} damianijr/${item}:latest
    docker push damianijr/${item}:latest
done


for item in ${images[*]}
do
    echo "* hyper.sh: Pulling images from docker-hub"
    hyper pull damianijr/${item}:latest
done


# stop current containers
echo "Stopping current container(s)"
hyper compose down

# run new container with new version
echo "Running new container(s)"
hyper compose up -d

echo "Deploy finished!"
