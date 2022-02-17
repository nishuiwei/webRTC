import React from 'react'
import { connect } from 'react-redux'
import CameraButton from './CameraButton'
import LeaveRoomButton from './LeaveRoomButton'
import MicButton from './MicButton'
import SwitchToScreenButton from './SwitchToScreenButton'

const VideoButtons = ({connectOnlyWithAudio}) => {
  return (
    <div className='video_buttons_container'>
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenButton />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(VideoButtons)
