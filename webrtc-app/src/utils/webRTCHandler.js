const  defaultConstraints = {
  audio: true,
  video: true
}

let localStream;

export const getLocalPreviewAndInitRoomConnect = (isRoomHost, identity, roomId = null) => {
  // 采集本地音视频流（获取媒体输入访问权限）
  navigator
    .mediaDevices
    .getUserMedia(defaultConstraints)
    .then(steam => {
      console.log(steam)
      localStream = steam
      // 预览本地视频
      showLocalVideoPreview(localStream)
      // 初始化房间链接
    }).catch(err => {
      console.log('无法获取本地媒体流')
      console.log(err)
    })
}

const showLocalVideoPreview = (steam) => {
  // 显示本地视频
}