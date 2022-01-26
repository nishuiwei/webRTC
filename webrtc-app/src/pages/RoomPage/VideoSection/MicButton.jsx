import React, {useState} from 'react'
import MicButtonImg from './../../../resources/images/mic.svg'
import MicButtonImgOff from './../../../resources/images/micOff.svg'
import * as webRTCHandler from './../../../utils/webRTCHandler'
const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false)
  const handleMicButtonPress = () => {
    webRTCHandler.toggleMic(isMicMuted)
    setIsMicMuted(!isMicMuted);
  }
  const alt = isMicMuted ? '关闭麦克风' : '开启麦克风'
  return (
    <div className='video_button_container'>
      <img 
        src={isMicMuted ? MicButtonImgOff : MicButtonImg} 
        onClick={handleMicButtonPress}
        className='video_button_image'
        alt={alt}
      />
    </div>
  )
}

export default MicButton
