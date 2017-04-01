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
RUN yarn install

# App port
EXPOSE 3000

# Running app!
CMD npm run build && npm run start
