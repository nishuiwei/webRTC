import io from 'socket.io-client'
import { setParticipants, setRoomId } from '../store/actions'
import store from '../store/store'

const SERVER = 'http://localhost:5555'

let socket = null
export const connectWithScoketIOServer = () => {
  socket = io(SERVER)
  socket.on('connect', () => {
    console.log('socket 成功链接')
    console.log(socket.id)
  })
  socket.on('room-id', data => {
    const {roomId} = data
    console.log(roomId)
    store.dispatch(setRoomId(roomId))
  })
  socket.on('room-update', (data) => {
    const { connectedUsers } = data
    console.log(connectedUsers)
    store.dispatch(setParticipants(connectedUsers))
  })
}

// 主持人创建会议房间
export const createNewRoom = (identity) => {
  const data = {
    identity
  }
  // 向服务器发送创建会议房间的数据（事件）
  socket.emit('create-new-room', data)
}

// 加入会议房间
export const joinRoom = (roomId, identity) => {
  // 向服务器发送加入会议房间的 数据（事件）
  const data = {
    roomId,
    identity
  }

  socket.emit('join-room', data)
}