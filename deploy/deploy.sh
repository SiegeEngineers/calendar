#!/bin/bash
gcloud config set account charles.offenbacher@gmail.com
gcloud config set project aoe2calendar
docker build . -t gcr.io/aoe2calendar/aoe2calendar
docker run -it --env PORT="8080" gcr.io/aoe2calendar/aoe2calendar
docker push gcr.io/aoe2calendar/aoe2calendar
gcloud beta run deploy aoe2calendar \
    --platform=managed \
    --image=gcr.io/aoe2calendar/aoe2calendar \
    --region=us-east1 \
    --allow-unauthenticated
