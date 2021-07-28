const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt('Enter Username') || 'Anonymous'
appendMessage('You Joined')
socket.emit('new-user', username)

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(msg){
    const messageElement = document.createElement('div')
    messageElement.innerText = msg
    messageContainer.append(messageElement)
}