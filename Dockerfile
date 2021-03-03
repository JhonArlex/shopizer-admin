# build env
FROM node:13.12.0-alpine as builder

WORKDIR /app

# Copy project files to the docker image
COPY . .

# install angular/cli globally (latest version, change this to the version you are using)
#same as package.json
RUN npm install @angular/cli@9.0.4 -g

# install packages
RUN npm install

# Build Angular Application in Production
RUN ng build --prod

#### STAGE 2
#### Deploying the application

FROM nginx:alpine

VOLUME  /var/cache/nginx

# Copy the build files from the project
# replace "angular-docker-environment-variables" with your angular project name
COPY --from=builder /app/dist/angular-docker-environment-variables /usr/share/nginx/html

# Copy Nginx Files
COPY --from=builder /app/.docker/.config/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE Port 80
EXPOSE 80