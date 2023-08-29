const io = require('socket.io')(5000,{
    cors:{
        origin:['http://localhost:4000']
    }
});

const users = {};

io.on('connection',socket=>{
    console.log('Socket connection success');
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send-message',message=>{
        socket.broadcast.emit('receive-message',{message:message, name:users[socket.id]});
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left-chat',users[socket.id]);
        delete users[socket.id];
    })
})