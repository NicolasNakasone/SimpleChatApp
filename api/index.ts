import server from 'src/app'

server.listen(server.get('port'), () => {
  console.log(`Listening at port ${process.env.API_PORT}!`)
})
