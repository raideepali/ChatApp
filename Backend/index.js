const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

io.on('connection', socket => {
    socket.on('message', msg => {
        console.log('socket working at the backend', msg);
        io.sockets.emit('message', msg)
    })
})

server.listen(port, ()=>console.log("server is running on port " + port));