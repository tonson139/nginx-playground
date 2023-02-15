#### CPU
- CPU -> core -> processs -> thread 
- cannot share process between core
- 1 nginx can run on 1 cpu core

Permission denial while connecting to ...
- may be nginx worker process and the server process is not run by the same user. 

#### How to set number of worker process for nginx 
- set it to auto 
- set it to equal cpu core
- Ex. worker_processes: 2;
- events.worker_connections = number of connection is worker can accept, depned on open file limit of cpu core, `ulimit -n`
- Max connection = worker_processers (#core) x worker_connections (#openfiledesciptor)

#### http_ssl_module
Generate self-signed certificate for testing 
-  `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/self.key -out /etc/ssl/certs/self.crt` 
```
http {
  
    # Redirect all traffic to HTTPS
    server {
        listen 80;
        server_name 167.99.93.26;

        return 301 https://$host$request_uri;
    }
     server {
        listen 443 ssl http2;
        server_name 167.99.93.26;

        ssl_certificate /etc/nginx/ssl/self.crt;
        ssl_certificate_key /etc/nginx/ssl/self.key;
    }
}
```
- https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04 

- disable ssl protocal and allow only tls: `ssl_protocols TLSv1 TLSv1.1 TLSv1.2;`
- Optimise cipher suits (search for newer ssl_ciphers, some may outdated): 
```
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5; 
    # <ssl_ciphers_1>:<ssl_ciphers_2> sperate by :
    # !<ssl_ciphers_x> with ! is the ssl_ciphers is not allow
```
- enbale DH params `ssl_dhparam /etc/nginx/ssl/dhparam.pem;`
- to generate DH params: `openssl dhparams <size the match private key Ex 2048> -out /etc/nginx/ssl/dhparam.pem` 
- enable header HSTS `add_header Strict-Transport-Security "max-age=31536000" always;`. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security 
- ssl session, cache handshake 
```
    ssl_session_cache shared:SSL:40m; 
    # <mode = 'shared' - save in memory, can access by any workers process, 'builtin' - specific worker allow to access>:<memory zone name = ssl>:<mem size = 40m>
    ssl_session_timeout 4h; # how long to keep a session cache for.
    ssl_session_tickets on; # 
```
- http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_tickets 


reverse proxy 
- need traling '/' because if no '/' , nginx assume uri to be what request send.
- Ex. location /php { proxy_pass: '127.0.0.1:9000' } -> php receivce path =  127.0.0.1/php
- Ex. location /php { proxy_pass: '127.0.0.1:9000/' } -> php receivce path =  127.0.0.1/

# useful command
- `ps aux | grep nginx`
- get number of cpu: `nproc`, `lscpu`
- get last line to the file: `tail -n 1 /var/log/nginx/error.log`
- get current configuration: `nginx -V`
- curl with allow self-signed cert: `curl -Ik https://xxx`
- check conf syntax `nginx -t`
- `which nginx` 