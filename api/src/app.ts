import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'

dotenv.config()

const server = express()
const { API_PORT } = process.env

server.set('port', API_PORT || 4001)
server.use(logger('dev'))

server.get('/', (req, res) => {
  res.send('<h1>SimpleChatApp</h1>')
})

export default server
