const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const fs = require('fs')
const route = require('koa-route')

const	app = new Koa()
const port = 8080

app.use(serve(path.resolve('public')))

const index = app.use(ctx => {
  ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8')
})

app.use(route.get('*', index))

app.listen(port)
console.log(`Koa listening on port ${port}`)


// const express = require('express')
// const app = express()
// const path = require('path')
// const server = require('http').Server(app)
// const port = 8080
//
// app.use(express.static(path.join(__dirname, 'public')))
//
// app.get('/', (req, res) => res.sendFile('index.html'))
//
// server.listen(port, () => console.log('Server started on %s', server.address().port))
