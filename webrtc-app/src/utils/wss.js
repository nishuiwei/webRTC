import io from 'socket.io-client'
import { setParticipants, setRoomId, setSocketId } from '../store/actions'
import store from '../store/store'
import { appendNewMessageToChatHistory } from './directMessages'
import * as webRTCHander from './webRTCHandler'

const SERVER = 'http://localhost:5555'

let socket = null
export const connectWithScoketIOServer = () => {
  socket = io(SERVER)
  socket.on('connect', () => {
    console.log('socket 成功链接')
    store.dispatch(setSocketId(socket.id))
    console.log(socket.id)
  })
  socket.on('room-id', data => {
    const { roomId } = data
    store.dispatch(setRoomId(roomId))
  })
  socket.on('room-update', data => {
    const { connectedUsers } = data
    store.dispatch(setParticipants(connectedUsers))
  })
  socket.on('conn-prepare', data => {
    const { connUserSocketId } = data
    // 准备webRTC对等连接(已经存在于房间的用户)，false意味着发起方在等待接收方准备webRTC
    webRTCHander.prepareNewPeerConnection(connUserSocketId, false)
    // 通知对方（发起方）我已经准备完毕可以进行webRTC链接
    socket.emit('conn-init', {connUserSocketId})
  })
  socket.on('conn-signal', data => {
    webRTCHander.handleSignalingData(data)
  })
  socket.on('conn-init', data => {
    // 接收方的socketId
    const { connUserSocketId } = data
    webRTCHander.prepareNewPeerConnection(connUserSocketId, true)
  })
  socket.on('user-disconected', data => {
    webRTCHander.removePeerConnection(data)
  })

  socket.on('direct-message', data => {
    // console.log(data, '成功获取发送的私信')
    appendNewMessageToChatHistory(data)
  })
}

// 主持人创建会议房间
export const createNewRoom = (identity, onlyAudio) => {
  const data = {
    identity,
    onlyAudio
  }
  // 向服务器发送创建会议房间的数据（事件）
  socket.emit('create-new-room', data)
}

// 加入会议房间
export const joinRoom = (roomId, identity, onlyAudio) => {
  // 向服务器发送加入会议房间的 数据（事件）
  const data = {
    roomId,
    identity,
    onlyAudio
  }

  socket.emit('join-room', data)
}

// 将信令数据发送到服务器
export const signalPeerData = (data) => {
  socket.emit('conn-signal', data)
}

// 发起私信
export const sendDirectmessage = (data) => {
  socket.emit('direct-message', data)
}