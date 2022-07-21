const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');
let usersArea = document.querySelector('.username-area');
// do {
//     name = prompt('Please enter your name');
// } while (!name)


//get username and room from url
const {id,username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(id,username,room);

name=username;
//const roomName = room;
console.log(name);
console.log(room);

//join room
socket.emit('joinroom',{id,username,room});

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(text) {
    let msg = {
        id:id,
        user: name,
        message: text.trim()
    }
    //append
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom();
    
    //send to server
    console.log('user name' ,room,name);
    //io.emit('user-connected',name);
    socket.emit('new-user',room,name);
    socket.emit('message',room,msg)


}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}


socket.on('user-connected',name=>{
    console.log('client-side',name);
})

socket.on('message',data=>{
    console.log(data);
    appendMessage(data,'incoming');
    scrollToBottom();
})
// socket.on('message',(msg)=>{
//     //console.log(msg);
//     appendMessage(msg,'incoming');
//     scrollToBottom();
// })

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}

// receive incoming msg
// socket.on('user-connected',name=>{
//     console.log('client side' ,name);
//     let mainUl = document.createElement('ul');
//     let className = "username";
//     mainUl.classList.add(className,'brand');
//     let markup = `<i>${name}</i>`
//     mainUl.innerHTML=markup;
//     users.appendChild(mainUl);
// })