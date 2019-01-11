FROM nginx:alpine
COPY ./html /usr/share/nginx/html 
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# docker run -d --name web -p 80:80 --mount type=bind,source="$PWD"/html,target=/usr/share/nginx/html nginx:alpine