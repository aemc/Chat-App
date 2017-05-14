const express = require('express'),
          app = express(),
         http = require('http').Server(app),  
           io = require('socket.io')(http),
    usernames = [];

// express serves the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    console.log('Socket connected...');
    
    socket.on('new user', (data, callback) => {
        if (usernames.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            updateUsernames();
        }
    });
    
    // update usernames
    function updateUsernames() {
        io.emit('usernames', usernames);
    }
    
    // send message
    socket.on('send message', (data) => {
        io.emit('new message', { msg: data, user: socket.username });
    });
    
    // disconnect 
    socket.on('disconnect', (data) => {
        if (!socket.username) {
            return;
        } 
        
        usernames.splice(usernames.indexOf(socket.username), 1);
        updateUsernames();
    });
});

// listener
http.listen(3000, () => {
    console.log('Listening on port 3000');
});