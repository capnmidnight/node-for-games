var httpRequestHandler = require("./httpRequestHandler");
var socketio = require("socket.io");
var http = require("http");

var webServer = http.createServer(httpRequestHandler);
webServer.listen(81);

var listener = socketio.listen(webServer);
listener.sockets.on("connection", function acceptConnection(socket) {
    socket.emit("update", "ready for action!");
    socket.on("ping", function (data) {
        socket.emit("pong", "server: " + data);
    });
});