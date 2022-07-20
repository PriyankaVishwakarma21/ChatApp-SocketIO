const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');
// do {
//     name = prompt('Please enter your name');
// } while (!name)


//get username and room from url
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(username,room);
name=username;
//const roomName = room;
console.log(name);
console.log(room);
//join room
socket.emit('joinroom',{username,room});

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(text) {
    let msg = {
        user: name,
        message: text.trim()
    }
    //append
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom();
    //send to server
    socket.emit('message',msg)
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

// receive incoming msg
socket.on('message',(msg)=>{
    //console.log(msg);
    appendMessage(msg,'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}