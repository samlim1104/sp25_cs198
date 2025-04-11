const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  username: String,
  text: String, 
  timestamp: String
})

const messageModel = mongoose.model("Message", messageSchema)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async function(socket) {
  const messages = await messageModel.find({}).sort({timestamp: 1}).limit(10).lean();
  socket.emit('message history', messages);

    socket.on('chat message', function (msg){
      msg.timeStamp = new Date().toLocaleString();
      const message = new messageModel(msg);
      message.save().then(m => {
        io.emit('chat message', msg);
      })
    });
  });

server.listen(3000, async function() {
  await mongoose.connect("mongodb+srv://samuellim:Sora6595@cluster0.ovtmvad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  console.log('listening on *:3000');
});