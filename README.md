# IPFilter with Nginx

This is an example repo that uses Nginx to implement an ipfilter.

## Build the image

    docker build -t ipfilter-nginx:latest .

## Run

    docker run --rm -p 8000:80 -e IP_ALLOW_LIST="172.17.0.1/32" ipfilter-nginx:latest