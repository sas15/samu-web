Samu webserver
==============

requirements:
-------------

[install nodejs and npm](https://github.com/nodejs/node)


[Samu](https://github.com/nbatfai/nahshon)


then cd to the directory, and:

```
npm install websocket
npm install net
```

run the server:
----

```
node server.js
```
known bug:
----
```
node.js:838
    var cwd = process.cwd();
                      ^
Error: ENOENT, no such file or directory
    at Function.startup.resolveArgv0 (node.js:838:23)
    at startup (node.js:58:13)
    at node.js:929:3
```
if you get this, simply run:
```
cd `pwd`; node server.js
```


client:
-------
- change the host in your main.js if required
- enjoy on host:8080
