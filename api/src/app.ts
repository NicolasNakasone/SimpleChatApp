import { createServer } from 'node:http'
import { join } from 'path'

import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'

dotenv.config()

const { API_PORT } = process.env

export const app = express()
const server = createServer(app)
const io = new Server(server)

app.set('port', API_PORT || 4001)
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', socket => {
  console.log('A user has connected!')

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
    console.log('Message: ', msg)
  })

  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })
})

export default server
