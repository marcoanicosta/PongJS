let playerReadyCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        let room;

        console.log('a user connected', socket.id);

        socket.on('ready', ()=> {
            room = 'room' + Math.floor(playerReadyCount / 2);
            socket.join(room);
            console.log('Player Ready', socket.id, room);

            playerReadyCount++;

            if(playerReadyCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            socket.broadcast.emit(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room)
        });
    })
};

module.exports = {
    listen,
}