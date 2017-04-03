FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy certificates
RUN mkdir /etc/nginx/certificates
COPY ./certificates /etc/nginx/certificates

# Ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
