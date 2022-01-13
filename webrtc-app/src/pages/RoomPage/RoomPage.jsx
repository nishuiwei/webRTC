import React, { useEffect } from 'react'
import { connect } from "react-redux";
import * as webRTCHanler from '../../utils/webRTCHandler';
import ChatSection from './ChatSection/ChatSection'
import ParticipantsSection from './ParticipantsSection/ParticipantsSection'
import RoomLabel from './RoomLabel'
import './Roompage.css'
import VideoSection from './VideoSection/VideoSection'
const RoomPage = ({roomId, isRoomHost, indentity}) => {
  
  useEffect(() => {
    webRTCHanler.getLocalPreviewAndInitRoomConnect(isRoomHost, indentity, roomId)
  }, [webRTCHanler, isRoomHost, roomId, indentity])

  return (
    <div className='room_container'>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(RoomPage)
