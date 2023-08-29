const socket = io('http://localhost:5000');
const message_container = document.getElementById('container');
const send_container = document.getElementById('send-container');
const message_input = document.getElementById('message-input');

socket.on('connect',()=>{
    let name = prompt('Enter you name');
    socket.emit('new-user-joined',name);
});

socket.on('user-joined',name=>{
    let message = `${name} joined the chat`;
    display_message(message,'left');
})

function send_message(){
    const message = message_input.value;
    console.log(message);
    display_message(message,'right');
    socket.emit('send-message',message);
    message_input.value = '';
}
send_container.addEventListener('submit',send_message);

function display_message(message,position){
    const message_element = document.createElement('div');
    message_element.innerText = message
    message_element.classList.add('message');
    message_element.classList.add(position);
    message_container.append(message_element);
}
socket.on('receive-message',message=>{
    let chat = `${message.name} : ${message.message}`;
    display_message(chat,'left');
})

socket.on('left-chat',name=>{
    let message = `${name} left the chat`;
    display_message(message,'left');
})
