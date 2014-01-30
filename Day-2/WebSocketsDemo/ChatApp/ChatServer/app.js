var socketServer = require("nodejs-websocket");

var server = socketServer.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str);
        broadcast(server,str);
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
});
function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    });
}
console.log("Server listening on port 8001...")
server.listen(8001);
