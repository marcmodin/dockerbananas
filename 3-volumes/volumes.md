# Attaching volumes and managing application data

In this section we will explore **Docker Volumes** and **Mounts** so we save data even when the container has been removed. Or connect a single volume to multiple containers.

---

## Volumes or Bind Mount?

According to docker.

> **Volumes** are stored in a part of the host filesystem which is managed by Docker

> **Bind** mounts may be stored anywhere on the host system

It is recommended to use volumes since it's a more isolated approach and can provide volume drivers which allows us to store data on remote hosts.

Bind mounts however are easier to start off with but can't be managed with the **Docker CLI**. They are also tied to your machine's filesystem directory structure.

We will explore both of these options so lets start with **bind mount**

## Mount a directory

Start off by `cd` into this current directory.

Then start a new container same as in the previous section. But with a few alterations.

```bash
$ docker run -d --name web -p 8080:80 --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html webserver

## Note if you are like me and using fishshell as your terminal. Then replace $(pwd) with $PWD
```

Lets verify that the bind mount was created correctly with `$ docker inspect web` and find something like this

```json
"Mounts": [
    {
        "Type": "bind",
        "Source": "/Users/admin/Sites/Docker-Projects/Docker-Intro/3-volumes/html",
        "Target": "/usr/share/nginx/html"
    }
]
```

Then once again in a web-browser open `localhost:8080` to see it working.

Try to edit `index.html` with replacing the header with this `<h1>👍 Me and Docker forever!</h1>` and reload the page.

## Creating a Docker Volume

Now lets create a new container but this time attach a volume to it instead. It is basically the same process but with a few exceptions.

Start by creating a volume. Either with the **CLI**
`$ docker volume create html` or during run.

```bash
$ docker run --rm -d --name web2 -p 8081:80  -v html://usr/share/nginx/html webserver

## Note: The fields must be in the correct order
```

During the run command the volume `html` is created and it gets its content replaced with whatever was in the mounted directory. I have added the `--rm` flag so that this container will be removed once it stops. We have persistent data anyway right!

Now since the data in our volume is stored within Docker itself we can't just open the directory and edit the files

So instead we should connect to **web2** and edit the `index.html` file inside the container.

One way of doing this is with the `exec` command

```bash
$ docker exec -it web2 sh
```

We are now in the shell of the container. Navigate to `/usr/share/nginx/html` and edit index with `vim` and save and reload the webpage to see your changes.

## Deepdive

For those who feel like a few extra points try some of the other concepts on [ **Managing Application Data** ](https://docs.docker.com/storage/volumes/#share-data-among-machines)

- Lets try to spin up 3 containers with the same **Volume** attached!

Start of with running a master container called web then 2 more containers based on the first container. Simply change the --tag each time and increment the portnumber by 1.

The master container first

```bash
$ docker run --rm -m 20MB -d --name web1 -p 8080:80  -v html://usr/share/nginx/html webserver

```

The above command is the same as the first volume container, a small difference is that we explicitly set the memory to 20MB and add `--rm` remove flag.

```bash
$ docker run --rm -m 20MB -d -e name=web1 --name web1 -p 8081:80  --volumes-from web:ro webserver
```

Notice the flag `--volumes-from [referenced container]`. This flag mounts all the defined volumes from the referenced container. `:ro` means it is read only.

Try to make a change to index.html on the master container (node) to see it propagate to the other containers.

### Clean Up

Now we are all done with the first part. Lets stop and remove all containers and do a bit of clean up before moving onto the next section.

In the future we can run a container with `--rm` flag to remove it on exit/stop

In the next section we will get into startingmultiple containers with **Docker-Compose** [**Docker-Compose**](../4-dockercompose/dockercompose.md)
