FROM nginx:1.23.1-alpine
EXPOSE 80
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./certificate/server.crt /etc/ssl/server.crt
# COPY ./certificate/server.key  /etc/ssl/server.key
# COPY /src/index.html /usr/share/nginx/html