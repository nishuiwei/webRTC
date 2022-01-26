const express = require('express')
const http = require('http')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

// 实例化 express
const app = express()
const PORT = process.env.PORT || 5555

// 创建一个 http 服务器
const server = http.createServer(app)

// 跨域处理
app.use(cors())

// 初始化房间和用户
let connectedUsers = []
let rooms = []

// 创建路由验证房间是否存在
app.get('/api/room-exists/:roomId', (req, res) => {
  const roomId = req.params.roomId
  const room = rooms.find((room) => room.id === roomId)
  if (room) {
    // 房间已存在
    if(room.connectedUsers.length > 3) {
      // 房间已经满员
      return res.send({roomExists: true, full: true})
    } else {
      // 房间可以加入
      return res.send({roomExists: true, full: false})
    }
  } else {
    // 房间不存在
    return res.send({
      roomExists: false,
    })
  }
})

// socket.io 设定
const io = require('socket.io')(server, {
  // 设定跨域
  cors: {
    // 地址配置，允许那些网址
    origin: '*',
    // 定义可请求的方法
    methods: ['GET', 'POST']
  }
})
io.on('connection', (socket) => {
  console.log(`socket 客户端已连接${socket.id}`)

  socket.on('create-new-room', (data) => {
    createNewRoomHandler(data, socket)
  })

  socket.on('join-room', (data) => {
    joinRoomHandler(data, socket)
  })

  socket.on('disconnect', () => {
    disconnectHandler(socket)
  })

  socket.on('conn-signal', (data) => {
    signalingHandler(data, socket)
  })

  socket.on('conn-init', (data) => {
    initailizeConnectionHandler(data, socket)
  })
})

// socket.io handler
const createNewRoomHandler = (data, socket) => {
  const socketId = socket.id
  const { identity } = data
  const roomId = uuidv4()
  console.log(`主持人正在创建会议房间...${socketId}`)
  // 创建新用户（进入会议的人）
  const newUser = {
    id: uuidv4(),
    identity,
    roomId,
    socketId
  }
  // 将新用户添加到已链接的用户数组里面
  connectedUsers = [...connectedUsers, newUser]
  // 创建新房间
  const newRoom = {
    id: roomId,
    connectedUsers,
  }
  // 新用户加入会议房间
  socket.join(roomId)
  rooms = [...rooms, newRoom]
  // 向客户端发送数据告知房间已创建（roomId）
  socket.emit('room-id', {roomId})
  // 发送通知告知有新用户加入并更新房间
  socket.emit('room-update', {connectedUsers: newRoom.connectedUsers})
}

// 加入房间
const joinRoomHandler = (data, socket) => {
  const { roomId, identity } = data
  const socketId = socket.id
  const newUser = {
    id: uuidv4(),
    identity,
    roomId,
    socketId
  }

  // 判断传递过来的 roomId 是否匹配对应会议房间
  const room = rooms.find(room => room.id === roomId)
  room.connectedUsers = [...room.connectedUsers, newUser]
  // 加入房间
  socket.join(roomId)
  // 将新用户添加到已链接的用户数组里面
  connectedUsers = [...connectedUsers, newUser]
  // 告知除自己以外的其他已连接用户准备webRTC对等链接
  room.connectedUsers.forEach(user => {
    if(user.socketId !== socketId) {
      const data = {
        connUserSocketId: socketId
      }
      io.to(user.socketId).emit('conn-prepare', data)
    }
  })
  // 发送通知告知有新用户加入并更新房间
  io.to(roomId).emit('room-update', {connectedUsers: room.connectedUsers})
}

// 断开连接
const disconnectHandler = (socket) => {
  const socketId = socket.id
  // 查询要离开会议房间的用户
  const user = connectedUsers.find(user => user.socketId === socketId)
  if(user) {
    // 从会议房间进行删除
    const room = rooms.find(room => room.id === user.roomId)
    room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socketId)
    // 离开房间
    socket.leave(user.roomId)

    // 当会议房间没有人员的时候要关闭整个会议室 （从 rooms 数组中删除该房间的信息）
    if(room.connectedUsers.length > 0) {
      // 用户断开webRTC链接
      io.to(room.id).emit('user-disconected', { socketId })
      // 发送通知告知有用户离开并更新房间
      io.to(room.id).emit('room-update', {connectedUsers: room.connectedUsers})
    } else {
      // （从 rooms 数组中删除该房间的信息）
      rooms = rooms.filter(room => room.id !== user.roomId)
    }
  }
}

// 交换信令数据
const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data
  const socketId = socket.id
  const signalingData = {
    signal,
    connUserSocketId: socketId
  }
  io.to(connUserSocketId).emit('conn-signal', signalingData)
}

// 初始化对等链接
const initailizeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data
  const initData = {connUserSocketId: socket.id}
  io.to(connUserSocketId).emit('conn-init', initData)
}

// 监听端口号
server.listen(PORT, () => {
  console.log(`服务器正在${PORT}端口运行`)
})