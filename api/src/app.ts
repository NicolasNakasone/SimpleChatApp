import { createServer } from 'node:http'

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'

dotenv.config()

const { API_PORT } = process.env

export const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.set('port', API_PORT || 4001)
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send(`<h1>SimpleChatApp<h1>`)
})

io.on('connection', socket => {
  console.log('A user has connected!')

  socket.on('chat message', message => {
    io.emit('chat message', message)
    console.log('Message: ', message)
  })

  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })
})

export default server
