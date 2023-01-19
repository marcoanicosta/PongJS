const { log } = require('console');

const server = require('http').createServer();
const io = require('socket.io')(server, {
   cors: {
   origin: '*',
   methods: ['GET', 'POST']
 }
});

const PORT = 3000;
server.listen(PORT);
console.log(`Listeing on port ${PORT}...`);

let playerReadyCount = 0;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ready', ()=> {
        console.log('Player Ready', socket.id);

        playerReadyCount++;

        if(playerReadyCount==2){
            //broadcast
        }
    });
});