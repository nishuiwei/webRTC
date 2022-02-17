import React, { useEffect } from 'react'
import { connect } from "react-redux";
import * as webRTCHanler from '../../utils/webRTCHandler';
import ChatSection from './ChatSection/ChatSection'
import Overlay from './Overlay';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection'
import RoomLabel from './RoomLabel'
import './Roompage.css'
import VideoSection from './VideoSection/VideoSection'
const RoomPage = ({roomId, isRoomHost, identity, showOverlay}) => {
  useEffect(() => {
    if (!isRoomHost && !roomId) {
      // 动态获取接口
      const siteUrl = window.location.origin;
      // 设置当前定向到的URL
      window.location.href = siteUrl;
    }
    webRTCHanler.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId)
  }, [])

  return (
    <div className='room_container'>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {
        showOverlay && (<Overlay />)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(RoomPage)
