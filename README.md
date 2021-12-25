# 项目目录
```
webRTC_demo
├─ README.md
├─ server 服务端
│  ├─ README.md
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
└─ webrtc-app 客户端
   ├─ README.md
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ logo192.png
   │  ├─ logo512.png
   │  ├─ manifest.json
   │  └─ robots.txt
   └─ src
      ├─ App.js
      ├─ index.css
      ├─ index.js
      ├─ serviceWorker.js
      └─ store
         ├─ actions.js
         ├─ reducer.js
         └─ store.js
```
# 项目名称

- 实时音视频会议应用

# 项目技术栈

- React 框架架构应用前端
- Express.js 的后台服务器
- socket.io 作为信令服务器
- 原声 JS 管理视频元素
- WebRTC
- simple-peer 库

# 项目架构

- WebRTC Mesh 架构
  - Mesh 架构
    - `Mesh` (Multiple Direct Connections) 
    - Mesh 方案，即多个终端之间两两连接，形成网状结构
    - 只能支持 **4 - 6** 人左右
    - 没有中心节点，实现很简单