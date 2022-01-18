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
  const room = rooms.find((room) => {
    room.id === roomId
  })
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
    console.log('主持人正在创建会议房间...')
    console.log(data)
  })
})

// 监听端口号
server.listen(PORT, () => {
  console.log(`服务器正在${PORT}端口运行`)
})