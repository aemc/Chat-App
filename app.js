const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.io('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(process.env.PORT, process.env.IP, () => {
    console.log('Listening on cloud9 port');
});