const express= require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT||3000



http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
app.use(express.static(__dirname+"/public"))
app.use(cors({origin:'*',credentials:true}));
app.get('/',(req,res)=>{
   // res.send('hello world');
    res.sendFile(__dirname +'/index.html');
})
app.get('/chat',(req,res)=>{
    res.sendFile(__dirname + '/chat.html')
})



// socket
const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("Connected....");
    
    socket.on('message',(msg)=>{
        //console.log|(msg);
        socket.broadcast.emit('message',msg);
    }) 
    
        //run when client disconnects
        socket.on('disconnect',()=>{
            io.emit('message','A user has left the chat');
        }) 

})

