FROM nginx:1.23.3

RUN apt-get update && \
    apt-get install -y dumb-init && \
    apt-get install openssl && \
    apt-get install nginx-module-njs

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY scripts/ipfilter.js /etc/nginx/conf.d/ipfilter.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 443
EXPOSE 80

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]