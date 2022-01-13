import React from 'react'
import CameraButton from './CameraButton'
import LeaveRoomButton from './LeaveRoomButton'
import MicButton from './MicButton'
import SwitchToScreenButton from './SwitchToScreenButton'

const VideoButtons = () => {
  return (
    <div className='video_buttons_container'>
      <MicButton />
      <CameraButton />
      <LeaveRoomButton />
      <SwitchToScreenButton />
    </div>
  )
}

export default VideoButtons
