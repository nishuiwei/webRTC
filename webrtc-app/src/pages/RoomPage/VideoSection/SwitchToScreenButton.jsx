import React, { useState } from 'react'
import SwitchImg from './../../../resources/images/switchToScreenSharing.svg'
import { LocalScreenSharingPreview } from './LocalScreenSharingPreview';
const constrains = {
  audio: false,
  video: true
}
const SwitchToScreenButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const handleScreenShareToggle = async () => {
    if(!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constrains)
      } catch (error) {
        console.log('获取共享屏幕的媒体流失败', error)
      }
      if (stream) {
        setScreenSharingStream(stream)
        setIsScreenSharingActive(true)
      }
    } else {
      setIsScreenSharingActive(false)
      // 停止屏幕共享
      screenSharingStream.getTracks().forEach(track => track.stop());
      setScreenSharingStream(null)
    }
  }
  return (
    <>
      <div className='video_button_container'>
        <img src={SwitchImg} alt='共享屏幕' title='共享屏幕' onClick={handleScreenShareToggle} className='video_button_image' />
      </div>
      {isScreenSharingActive && (<LocalScreenSharingPreview stream={screenSharingStream} />)}
    </>
  )
}

export default SwitchToScreenButton
