### To build 
```
cd server
docker build -t patanindev/node-server .

cd nginx
docker build -t patanindev/pocnginx .

docker push
```

### To run with docker
```
docker run -d -e PORT=8001 -p 8001:8001 patanindev/node-server
docker run -d -e PORT=8002 -p 8001:8002 patanindev/node-server
docker run -d -e PORT=8003 -p 8001:8003 patanindev/node-server

docker run --network=host patanindev/pocnginx
```
