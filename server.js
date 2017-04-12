const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const users = [];
const connections = [];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
      
server.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});