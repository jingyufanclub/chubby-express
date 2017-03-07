const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const port = 8080

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile('index.html'))

server.listen(port, () => console.log('Server started on %s', server.address().port))
