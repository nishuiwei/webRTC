import { setShowOverlay } from "../store/actions";
import store from "../store/store";
import * as wss from './wss'
import Peer from 'simple-peer'
const  defaultConstraints = {
  audio: true,
  video: {
    width: "480",
    height: "360"
  }
}

let localStream;

export const getLocalPreviewAndInitRoomConnect = async (
  isRoomHost, 
  identity, 
  roomId = null
) => {
  // 采集本地音视频流（获取媒体输入访问权限）
  navigator
    .mediaDevices
    .getUserMedia(defaultConstraints)
    .then(stream => {
      console.log(stream)
      localStream = stream
      // 预览本地视频
      showLocalVideoPreview(localStream)
      // 派发 action 隐藏加载动画
      store.dispatch(setShowOverlay(false))
      // 初始化房间链接
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity)
    }).catch(err => {
      console.log('无法获取本地媒体流')
      console.log(err)
    })
}

let peers = {}
let streams = []

// 配置STUN服务器
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
}

// 准备webRTC对等链接
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration()
  // 实例划对等链接对象
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream
  })

  // 信令数据交换
  peers[connUserSocketId].on('signal', data => {
    // data-a webrtc offer, answer, or ice candidate
    const signalData = {
      signal: data,
      connUserSocketId, 
    }
    wss.signalPeerData(signalData);
  })

  // 获取媒体流 stream
  peers[connUserSocketId].on('stream', stream => {
    console.log('成功获取远程Stream')
    // 显示接收的stream媒体流
    addStream(stream, connUserSocketId)
    streams = [...streams, stream]
  })
}

// 将信令数据添加到接收webRTC对等链接准备的一方的对等对象中
export const handlerSinglingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal);
}

// 用户退出删除媒体流
export const removePeerConnection = (data) => {
  const { socketId } = data
  const videoContainer = document.getElementById(socketId)
  const videoElement = document.getElementById(`${socketId}-video`)
  if(videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    videoElement.srcObject = null
    videoContainer.removeChild(videoElement)
    videoContainer.parentNode.removeChild(videoContainer)
    if(peers[socketId]) {
      peers[socketId].destry()
    }
    delete peers[socketId]
  }
}

// Video UI 效果

const showLocalVideoPreview = (stream) => {
  // 显示本地视频
  const videosContainer = document.getElementById('videos_portal')
  videosContainer.classList.add('videos_portal_styles')
  const videoContainer = document.createElement('div')
  videoContainer.classList.add('video_track_container')
  const videoElement = document.createElement('video')
  videoElement.autoplay = true
  videoElement.muted = true
  videoElement.srcObject = stream
  // 指定源数据加载完再屌用
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  }
  videoContainer.appendChild(videoElement)
  videosContainer.appendChild(videoContainer)
}

// 添加接受的stream媒体流并展示
const addStream = (stream, connUserSocketId) => {
  // 使用js创建容器展示视频
  const videosContainer = document.getElementById('videos_portal')
  const videoContainer = document.createElement('div')
  videoContainer.id = connUserSocketId
  videoContainer.classList.add('video_track_container')
  const videoElement = document.createElement('video')
  videoElement.autoplay = true
  videoElement.muted = true
  videoElement.srcObject = stream
  videoElement.id = `${connUserSocketId}-video`
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  }
  // 放大/缩小视频信息
  videoElement.addEventListener('click', () => {
    if(videoElement.classList.contains('full_screen')) {
      videoElement.classList.remove('full_screen')
    } else {
      videoElement.classList.add('full_screen')
    }
  })
  videoContainer.appendChild(videoElement)
  videosContainer.appendChild(videoContainer)
}

// Button logic
export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false
}

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false
}

export const toggleScreenShare = (
  isScreenSharingActive, 
  screenSharingStream = null
  ) => {
    if(isScreenSharingActive) {
      // 展示本地的媒体流
      switchVideoTracks(localStream)
    } else {
      // 展示共享屏幕媒体流
      switchVideoTracks(screenSharingStream)
    }
}

const switchVideoTracks = (stream) => {
  //遍历所有对等连接对象
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        //kind属性规定轨道的种类（eg:audio,video）
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
        }
      }
    }
  }
};