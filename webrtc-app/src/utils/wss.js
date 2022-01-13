import io from 'socket.io-client'

const SERVER = 'http://localhost:5555'

let socket = null
export const connectWithScoketIOServer = () => {
  socket = io(SERVER)
  socket.on('connect', () => {
    console.log('socket 成功链接')
    console.log(socket.id)
  })
}