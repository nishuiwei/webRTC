import React, { useState } from 'react'
import SwitchImg from './../../../resources/images/switchToScreenSharing.svg'

const SwitchToScreenButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const handleScreenShareToggle = () => {
    setIsScreenSharingActive(!isScreenSharingActive)
  }
  return (
    <div className='video_button_container'>
      <img src={SwitchImg} alt='共享屏幕' title='共享屏幕' onClick={handleScreenShareToggle} className='video_button_image' />
    </div>
  )
}

export default SwitchToScreenButton
