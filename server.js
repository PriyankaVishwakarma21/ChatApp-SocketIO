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


const users=[];

// socket
const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("Connected...." , socket.id);
    
    socket.on('joinroom',({id,username,room})=>{
        socket.join(room,id);
        users.push(id);
        users[socket.id]=id;
        console.log(users);
        //console.log('joined the room',username,room);
    })

   
    socket.on('message',(room,data)=>{
       // console.log('client side msg',data);
        socket.to(room).emit('message',data);
        //console.log('send data from server',data);
        //socket.to(socket.id).emit('message',data);
    })

    // socket.on('message',(msg)=>{
    //     console.log(msg);
    //     socket.broadcast.emit('message',msg);
    // }) 
    
        //run when client disconnects
        socket.on('disconnect',()=>{
            socket.emit('message',`A user left the chat`);
        }) 


         // socket.on('user-connected',(room,name)=>{
    //     users[name] =socket.id;
    //     console.log('userconnected',name);
    //     socket.emit('user-connected',name);
    //     //socket.to(socket.id).emit('user-connected',name);
    // })
    


})

