# Composing services with Docker Compose

In this section, we will go over how we can use the tool Compose that comes packaged with Docker.

> Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

So that instead of manually creating and running containers, we can now orchestrate an entire environment with **Services** from a **Docker-Compose File**.

###### read more about services on https://docs.docker.com/get-started/part3/

## Setup and configuration

The aim is to quickly get you started with using **Docker-Compose** and not getting bogged down in code and configuration. All needed files already exists in this repository.

Before we get started 'composing' lets go through how I've structured this section.

**Directory Structure**

```json
🗂 root
-   docker-compose.yml
-   🗂 api
    -   🗂 app
        .dockerignore
        Dockerfile
-    🗂 web
     -   🗂 html
         default.config
     -   Dockerfile
-
```

We now have two directories. One for each container we are going to build and run. And each has it's own `Dockerfile`

---

#### 🗂 **/api**

The api declare a build in it's own `Dockerfile` aswell as an `/app` directory containing a simple application that starts an express node-server. Sending out some static json in `res.send()`.

What is different here from the previous section is that `Dockerfile` is declaring a **multistage build**. Using two separate images used for building our application. Contibuting to a smaller image size.

There's also a `.dockerignore` file present, telling the _docker-daemon_ that we don't want to include any existing `/node_modules/` during `COPY . .` in the first build step.

---

#### 🗂 **/web**

The web directory is basically the same as [`/2-dockerfile/`](../2-dockerfile/dockerfile.md) section. The small difference is passing in a `default.conf` to Nginx configuration in the `COPY` command in `Dockerfile`. Making it possible for Cross-Origin Resource Sharing from the `api server` - _(javascript thing)_

---

#### 🗂 **/root**

This is where we call `docker-compose` and define our `docker-compose.yml` file. We could get fancy here and do one for dev and another for production. But let's keep it simple.

## Compose

Running the docker-compose file will take care of building; configuring everything and starting the containers we ask it to.

The two services we will compose is our `WEB` server; which we built in the previous section, and an `API` service running on **nodejs**.

> **Note:** This section is highly inspired by Fredrik Christerson's video series on 'Building Microservices' and his code can be found here [microservices-example on github](https://github.com/fChristenson/microservices-example)

### The docker-compose file

> The great thing about both **dockerfiles** and **docker-compose** files is that they provide a great overview of how our applications will work. So that anyone in your team. Who may not be familiar with your config can more easily figure out how your application will run.

First we tell Docker-Compose which version to use

```yaml
version: "3"
```

Then specify the services we want to run

```yaml
services: {
  web:
  api:
}
```

The api service is very simple and looks like this.

```yaml
api:
  build: "./api"
  image: api:latest
  container_name: api
  ports:
    - "3000:3000"
```

- `build:` defines where the Dockerfile is located
- `image:` name and tag of the image we want to build and run
- `ports:` map the host port to the container's

While our webservice use a few more parameters

```yaml
web:
  build: "./web"
  image: web:latest
  container_name: web
  restart: unless-stopped
  ports:
    - "80:80"
  depends_on:
    - api
  volumes:
    - ./web/html:/usr/share/nginx/html
    - ./web/default.conf:/etc/nginx/conf.d/default.conf
```

- `restart:` make sure the container restarts automatically
- `depends_on:` start this container after api
- `volumes:` although we already have copied these files we override that here so we can make changes on the fly in development. Remember that if you make changes to the `default.config` you need to restart nginx for it to take effect. Run `exec` or `nginx -s reload` inside the container.

### Build and Up/Down

With everything in order we start off by `cd` into the root directory `/4-dockercompose/`.

Then start with

```bash
$ docker-compose up -d
```

to both build and start our services. All in one go.

Or we can instead run

```bash
$ docker-compose build .
```

to build our images first. Then run `$ docker-compose up`

Now open `localhost:80` in a web-browser to see it working.

We can run all the other familiar commands from the previous sections to perform other actions on our containers.

```bash
$ docker-compose ps
```

To see our two running containers.

---

**Stopping our services**

```bash
$ docker-compose stop

# note: unless specified all running services
# defined in the compose file stop
```

this stops the services but doesn't remove anything.

But if any container have problems stopping this way you can run the `$ docker-compose kill` command to force stop the containers.

If we instead run

```bash
$ docker-compose down
# or
$ docker-compose down --rmi all
# to remove images from docker as well
```

then this command will stop and remove containers, networks, images, and volumes defined in the `docker-compose.yml` file. Giving us a clean slate.

**Restarting our services**

```bash
$ docker-compose start # Start services

$ docker-compose restart # Restart services
```

If you stopped services with `docker-compose down` you will need to run the following to recreate everything once more

```bash
$ docker-compose up -d # Create and start containers
```

For a list of all commands avaiable to compose.

```bash
$ docker-compose --help
```

---

### Clean Up

Now we are all done with the first part. Lets stop and remove all containers and do a clean up before finishing off.

If you have removed all unused containers we can also run

```bash
$ docker image prune
```

to remove any images not used by a container.

**This was all for this section.** I hope you have enjoyed this basic; unprofessional; exploration or Docker. If i decide to expand I will do so. 😁
