import React from 'react'
import ConnectingButton from './../ConnectingButton/ConnectingButton'
import { useNavigate } from "react-router-dom";
const ConnectingButtons = () => {
  let navigate = useNavigate()
  // 作为用户加入会议
  const pushToJoinRoomPage = () => {
    navigate('/join-room')
  }
  // 作为主持人创建会议
  const pushToJoinRoomPageAsHost = () => {
    navigate('/join-room?host=true')
  }
  return (
    <div className='connecting_buttons_container'>
      <ConnectingButton buttonText="加入会议" onclickHandler={pushToJoinRoomPage} />      
      <ConnectingButton createRoomButton buttonText="主持会议" onclickHandler={pushToJoinRoomPageAsHost} />      
    </div>
  )
}

export default ConnectingButtons 
