FROM node:alpine

# Need specify the SHELL path cause a bug in `is-windows-path` library, dependency of next.js that dont detect the right shell on docker.
# TODO: Investigate more to remove it.
ENV SHELL=/bin/ash/

# Creating app directory
RUN mkdir /app
WORKDIR /app

# Copy app to container
COPY . .

# Install dependencies
RUN yarn install && npm run build

# Running app!
ENTRYPOINT npm run start -p $(echo $PORT | tr -d '"')
