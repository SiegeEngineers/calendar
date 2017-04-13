FROM alpine

# Install caddy and dependencies
RUN apk add --no-cache openssh-client git tar curl
RUN curl --silent --show-error --fail --location \
      --header "Accept: application/tar+gzip, application/x-gzip, application/octet-stream" -o - \
      "https://caddyserver.com/download/build?os=linux&arch=amd64&features=" \
    | tar --no-same-owner -C /usr/bin/ -xz caddy \
 && chmod 0755 /usr/bin/caddy \
 && mkdir /root/.caddy

# Ports
EXPOSE 80 443 2015

# Caddy config (prod & dev)
ADD ./Caddyfile /etc/Caddyfile
ADD ./Caddyfile_dev /etc/Caddyfile_dev

# Caddy certifies
ADD ./.caddy /root/.caddy

# Caddy start
ENTRYPOINT ["/usr/bin/caddy"]
CMD ["-agree", "--conf", "/etc/Caddyfile"]
