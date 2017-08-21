const app = require("express")();
const http = require("http").Server(app);
const socketio = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

socketio.on("connection", function(socket){
  socket.on("chat message", function(msg){
    console.log("message: " + msg);
    socketio.emit("chat message", msg);
  });
});

http.listen(3001, function(){
  console.log("Listening on port 3001");
});