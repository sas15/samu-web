var server = require('websocket').server, http = require('http');

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 50013;

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
        client.destroy();
    });
    client.on('close', function() {
        console.log('Samu connection closed');
    });

    connection.on('close', function(connection) {
        console.log('Client connection closed');
    });
});
