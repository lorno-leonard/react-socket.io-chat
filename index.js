const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.port || 3000

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // Send to all clients including sender
    io.local.emit('message', message)
  })
})

server.listen(port, () => {
  console.log('Chat app listening on port %d', port)
})