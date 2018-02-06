const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.port || 3001

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // Send to all clients including sender
    io.local.emit('message', message)
  })
})

server.listen(port, () => {
  console.log('Chat app listening on port %d', port)
})