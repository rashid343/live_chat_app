const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
  name = prompt('Please enter your name: ')
}while(!name)

textarea.addEventListener('keyup',(e) =>{
  if(e.key === 'Enter'){
    sendMessage(e.target.value)
  }
})

function sendMessage(message)
{
  let msg = { // new variable
    user: name,
    message: message.trim()
  }
  // Append
  appendMessage(msg, 'outgoing')
  textarea.value=''
  scrollToBottom()//Scroll Function
  //send to Server
  socket.emit('message',msg)
}
function appendMessage(msg, type)
{
  let mainDiv = document.createElement('div')

  let className = type
  mainDiv.classList.add(className, 'message')

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}

// Recievemessage
socket.on('message',(msg)=>{
  appendMessage(msg, 'incoming')
  scrollToBottom();
  // socket.broadcast.emit('message',msg)
})

function scrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight
}
