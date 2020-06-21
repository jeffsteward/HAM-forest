var io = require('socket.io');

module.exports.listen = function(app){
    io = io.listen(app)

    io.on('connection', socket => {
        socket.on('join-game', data => {
            socket.join(data.gameID);
        });   

        socket.on('take-action', data => {
            socket.to(data.gameID).emit(data.action, data.packet);
        })
    });

    return io
}