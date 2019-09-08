
var io = require('socket.io');

function generateRoom() {
    return (Math.floor(new Date() / 1000)).toString(36);
}

module.exports.listen = function(app){
    io = io.listen(app)

    var forestSockets = io.of('/forest');
    var controllerSockets = io.of('/controller');
    
    var forests = [];
    
    forestSockets.on('connection', function(socket) {
        console.log('forest socket connected');
        
        forestID = generateRoom();
        
        forests.push(forestID);
        socket.join(forestID)
        socket.emit('id', {'id': forestID});
        
        socket.on('disconnect', function() {
            forests.splice(forests.indexOf(this), 1);
        });
    });
    
    controllerSockets.on('connection', function(socket) {
        console.log('controller socket connected');
        
        socket.on('disconnet', function() {
            console.log('controller socket disconnect')
        });
        
        socket.on('join-room', function(data) {
            socket.join(data.forestID);
        });
        
        socket.on('create-tree', function(data) {
            forestSockets.to(data.forestID).emit('create-tree', {'leaf':data.leaf, 'branch':data.branch, 'objectID':data.objectID});
        });
    });


    return io
}