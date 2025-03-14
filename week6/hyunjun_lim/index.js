const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function updateTime() {
  const now = new Date();
  document.getElementById("timestamp").textContent = now.toLocaleString();
}

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      updateTime()
      io.emit('chat message', msg);
    });
  });;

server.listen(3000, () => {
  console.log('listening on *:3000');
});