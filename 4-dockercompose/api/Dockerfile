# Multistage build, reduced image size
# Pull full install node-image from Docker Hub
FROM mhart/alpine-node:10 as build
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY /app /app
# Install dependencies. note : node_modules is ignored in .dockerignore
RUN npm ci --dev

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base-8
# Set the working directory to /app
WORKDIR /app
# Copy previous build's directory into /app
COPY --from=build /app .
# Expose port 3000 
EXPOSE 3000
# Start Express 
CMD ["node", "index.js"]

# build image
# docker build -t api .
# run the container and mount dir
# docker run -it --rm --name api -p 3000:3000 
# --mount type=bind,source="$PWD"/app,target=/app api:latest