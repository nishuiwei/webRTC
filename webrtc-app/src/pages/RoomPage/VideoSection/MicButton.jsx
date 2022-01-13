import React, {useState} from 'react'
import MicButtonImg from './../../../resources/images/mic.svg'
import MicButtonImgOff from './../../../resources/images/micOff.svg'
const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false)
  const handleMicButtonPress = () => {
    setIsMicMuted(!isMicMuted);
  }
  return (
    <div className='video_button_container'>
      <img 
        src={isMicMuted ? MicButtonImgOff : MicButtonImg} 
        onClick={handleMicButtonPress}
        className='video_button_image'
      />
    </div>
  )
}

export default MicButton
