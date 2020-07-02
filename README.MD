## Prerequisites
* Make sure You had been install NodeJs in your system https://nodejs.org/

* Then install Docker at https://docs.docker.com/engine/install/ 

* Repository for docker image https://hub.docker.com/


## Installation & Configuration
Follow these step to install


```
$ git clone https://github.com/bedeljani/nodejs-docker && cd nodejs-docker
$ npm install
```
Rename file ``` .env.example``` to ``` .env``` 

Edit Environment on ``` .env ``` file 


run the application/service 
```
$ npm run up
```
to stop application/service
```
$ npm run stop
```
stop and remove containers, networks..
```
$ npm run down
```
