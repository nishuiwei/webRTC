import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
const JoinRoomPage = (props) => {
  const search = useLocation().search
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host')
    if(isRoomHost) {
      // 将这个主持人的状态保存到 redux的store里面
    }
  }, [])
  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>

      </div>
    </div>
  )
}

export default JoinRoomPage
