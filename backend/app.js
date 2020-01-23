const uuid = require('uuid/v4');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log('New user connected');

    socket.on('new_game', function(msg, callback){
        console.log('new_game: ', new_game_id);
        new_game_id = uuid()
        callback({"game_id": new_game_id})
    });

    socket.on('join_game', function(msg, callback){
        console.log('join_game: ', msg);
        callback({"game_id": msg.game_id})
    });

  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
