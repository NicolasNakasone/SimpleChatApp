import server, { app } from 'src/app'

server.listen(app.get('port'), () => {
  console.log(`Listening at port ${process.env.API_PORT}!`)
})
