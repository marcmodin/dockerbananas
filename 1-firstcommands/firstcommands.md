# Getting started with your first Docker Commands

Let's start by getting to know some useful commands and running a **Docker Container**

`$ docker login`// log in to a Docker registry if you havent already in the Docker Application

`$ docker --help` // see all available commands

`$ docker [COMMAND] --help` // see available flags with specified command

`$ docker info` // display system-wide information

---

## Create your first Container

Lets run a container from an offical image in on the [**Docker Hub**](https://hub.docker.com)

1. the first way is to use `$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]` to pull the image onto your local machine first then run and create the container. The image will remain on the machine, subsequent calls for the image will hence be quicker.

2. the second way is to create and run a container directly from an image on docker-hub or the local system with `$ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

## Start a Webserver

Lets start by pulling the `Nginx Image` with the alpine tag. Which pulls an 17.5MB image and runs a container named **web**

```bash
$ docker run -d --name web -p 8080:80 nginx:alpine
```

Here we also specify that we want the webserver to route port 80 in the container to port 8080 on your machine. The `-d` flag means the container will run in the background.

Then in a webbrowser open `localhost:8080` to see it working.

### Interactive Mode

If we want to interact with the container through it's command line we need to change the `-d` flag to `-it` (interactive) or use `-dit` (interactive and detached) and add a `sh` as the last argument to open up a shell.

```bash
$ docker run -dit --name web -p 8080:80 nginx:alpine sh
```

To get into the container we can run

```bash
$ docker attach web
```

If we use `-it` combined with `sh` we will instead jump directly into the container's shell when it starts up.

We will not get into how use the shell right now.

And to exit the container we have to make a choice if we want to stop the container or keep it running.

`exit` // will exit and stop it

or

`CTRL and P followed by Q` // will exit but keeps it running in the background.

## Managing our containers

We can now list the running container/'s and learn few new commands.

`$ docker ps`// show running containers (processes)

`$ docker ps -a` // show both running and stopped containers

`$ docker container ls` // list containers

We can also check the image that was pulled down.
`$ docker image ls`

## Clean Up

Now we are all done with the first part. Lets stop and do a bit of clean up before moving onto the next section.

Stop the container and remove it with:

```bash
$ docker rm -f web
```

Alternatively remove the image aswell.

```bash
$ docker rmi web
```

In the next section we will get into building a new image with a [**Dockerfile**](../2-dockerfile/dockerfile.md)
