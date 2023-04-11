# Draw Rectangles

## 🔧 Set up

### Fill project with correct environment variables value
* on `backend/.env`
```
env=prod
```
* on `frontend/.env`
```
NEXT_PUBLIC_GRAPHQL_SERVER_URL=http://localhost:8000/graphql
```

## 🚀 Run with docker

### **Start Project.**

#### To start, execute this:
```shell
docker-compose up -d
```

#### For no cache, execute this:
```shell
docker-compose build --no-cache
docker-compose up -d --force-recreate
```
or
```shell
docker-compose up -d --no-deps --build
```

## 🧹 Docker clean up

1. **Check docker and images.**
```shell
docker ps -a
docker images -a
```

1. **Stop and remove container.**
```shell
docker stop $(docker ps -aq --filter name="ask-paper")
docker rm $(docker ps -aq --filter name="ask-paper")
```

1. **Remove dangling.**
```shell
docker rmi $(docker images -q -f dangling=true)
```

1. **Remove all images.**
```shell
docker image prune -a
```
