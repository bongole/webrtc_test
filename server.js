const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

let sockets = [];
io.on('connection', (socket) => {
  sockets.push(socket)

  console.log('a user connected');
  console.log(sockets.length)

  socket.on('disconnect', () => {
    sockets = sockets.filter(item => item !== socket)
    console.log('a user disconnected');
    console.log(sockets.length)
  });

  socket.on('message', (msg) => {
    peers = sockets.filter(item => item !== socket)
    peers.forEach( (peer) => {
      console.log('============================')
      console.log(msg)
      peer.emit('message', msg);
    });
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
