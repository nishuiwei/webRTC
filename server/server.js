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

// 监听端口号
server.listen(PORT, () => {
  console.log(`服务器正在${PORT}端口运行`)
})