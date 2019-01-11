# Building a new image and using Dockerfiles

In this section we will create our own image based on the previous Nginx image we used in part one.

This time we also need to create a html directory with an `index.html` file to be served by our webserver instead of the default.

Although we can run a container and mount the directory into it. Creating a **Dockerfile** will provide a more persistent way to do this. Lets start!

---

## A Dockerfile

Docker explains:

> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image

Our Dockerfile in its simplest form looks like this

```Dockerfile
FROM nginx:alpine

COPY ./html /usr/share/nginx/html

EXPOSE 80
```

## Build a new image

Start by pulling the Nginx Image with the alpine tag again from **Docker Hub**.

`$ docker pull nginx:alpine`

Now `cd` into the `/2-dockerfile` directory.

Let's build a new image named webserver from the nginx image.

```bash
$ docker build -t webserver .
```

Docker will use `.` as `--path` to look for the docker file in the current directory.

Now list the images to examine the newly created image

`$ docker image ls`

## Run a container from our image

And lets once more run a container named **web**. Only this time change the image to our newly built webserver image.

```bash
$ docker run -dit --name web -p 8080:80 webserver
```

Again in a web-browser open `localhost:8080` to see it working with our own `index.html` instead of the default.

### Clean Up

Now we are all done with the first part. Lets stop the container and do a bit of clean up before moving onto the next section.

In the future we can run a container with `--rm` flag to remove it on exit/stop

In the next section we will get into mouting directories and [**Container Volumes**](../3-volumes/volumes.md)
