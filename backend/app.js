const uuid = require('uuid/v4')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', function(socket){
    socket.user_id = uuid()
    console.log('User connected: ', socket.user_id)

    socket.on('new_game', function(msg, callback){
        console.log('> new_game: ', msg)
        new_game_id = uuid()
        socket.join(new_game_id)

        response = {user_id: socket.user_id, game_id: new_game_id}
        console.log('< new_game: ', response)
        callback(response)
    });

    socket.on('join_game', function(msg, callback){
        console.log('> join_game: ', msg)
        game_id = msg.game_id
        socket.join(game_id)

        io.to(game_id).emit('new_player', socket.user_id)

        response = {user_id: socket.user_id, game_id: game_id}
        console.log('< join_game: ', response)
        callback(response)
    });


    socket.on('disconnect', function () {
        console.log('User disconnected: ', socket.user_id)
    });

  });

http.listen(3000, function(){
  console.log('listening on *:3000')
});
