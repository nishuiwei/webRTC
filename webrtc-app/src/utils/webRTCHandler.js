import { setShowOverlay } from "../store/actions";
import store from "../store/store";
import * as wss from './wss'
const  defaultConstraints = {
  audio: true,
  video: true
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
    .then(steam => {
      console.log(steam)
      localStream = steam
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

// 准备webRTC对等链接
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  
}

const showLocalVideoPreview = (steam) => {
  // 显示本地视频
}