var server = require('websocket').server,
http = require('http'),
net = require('net'),
url = require("url"),
path = require("path"),
fs = require("fs");


//httpserver
http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join("client", uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(8080);







//samu
var HOST = '127.0.0.1';
var PORT = 2006;

var socket = new server({
    httpServer: http.createServer().listen(7268)
});

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        console.log('Samu: ' + HOST + ':' + PORT);
    });
    connection.on('message', function(message) {
        console.log('got: ' + message.utf8Data);
        client.write(message.utf8Data);
    });
    client.on('data', function(data) {
        connection.sendUTF(data);
        console.log('Samu restponse: ' + data);

    });
    client.on('close', function() {
        console.log('Samu connection closed');
        client.destroy();
    });

    connection.on('close', function(connection) {
        console.log('Client connection closed');
    });
});
