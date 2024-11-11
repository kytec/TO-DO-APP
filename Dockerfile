# Use a base image with Node and Nginx
FROM node:16 AS build-stage

# Set working directory
WORKDIR /app

# Copy app files to container
COPY . /app

# Install a lightweight web server (Nginx) to serve the static files
FROM nginx:alpine

# Copy static files to the web server's document root
COPY --from=build-stage /app /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
