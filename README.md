# Getting started with using Docker

The following is a reference of my own exploration and findings on using **Docker**. It's also a short guide for future reference, starting with the very basics!

> _Its a work in progress. And totally based on my own experience and in no way a professional guide in any way. In the future my goal is also to add documentation about creating production ready applications and touch on **Kubernetes** orchestration aswell_

## This is how it works

Each folder in this repository represents a section/stage advancing in difficulty level using **Docker**. A section is primarily its own environment but in some cases builds up to the next section.

**To get started you'll need the following on your local machine**

- Docker App installed on your system and running
- Logged in to your own Docker Hub repository
- A Terminal/CMD session opened
- A clone of this entire repo on your local machine.

Begin with the first folder and follow the instructions in its `README` file

## The End Goal

As you follow along each folder section we will slowly be learning and building out the following.

1. [Your first Docker Commands and running a container](./1-firstcommands/firstcommands.md)
2. [Create a new Image with a Dockerfile](./2-dockerfile/dockerfile.md)
3. [Managing Application Data](./3-volumes/volumes.md)
4. [Using Docker-Compose to spin up multiple services at once](./4-dockercompose/dockercompose.md)

---

### References and Links used in this study

**Vim Command Reference**

```vim
delete: x
insert: :i
save: :w
save and exit: :wq
exit: :q
force: ! (example :w! :q!)
vertical split: open a document and then type :vsplit /path-to-document/document and this will open the specified document and split the screen so you can see both documents.
copy: y
copy a line: yy
paste: p
cut: d
cut a line: dd
```

These are the very basic commands for vim, but they are useful as vim or vi is preinstalled on most Linux systems. I hope this will help you configuring your Linux.

**Managing Data Volumes**

[**Data Volumes** : Docker Tutorial Series : Part 7](https://rominirani.com/docker-tutorial-series-part-7-data-volumes-93073a1b5b72)

[**Managing Application Data** : Docker Docs](https://docs.docker.com/storage/)

**Docker Compose**
[**Services** : Docker Docs](https://docs.docker.com/get-started/part3/)

[Fredrik Christerson's video series on 'Building Microservices'](https://github.com/fChristenson/microservices-example)

**Docker Images used**
[**alpine-node - Docker Hub**](https://hub.docker.com/r/mhart/alpine-node)
[**nginx:alpine - Docker Hub**](https://hub.docker.com/_/nginx)
