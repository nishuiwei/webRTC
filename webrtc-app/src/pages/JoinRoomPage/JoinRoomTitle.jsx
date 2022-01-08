import React from 'react'

const JoinRoomTitle = ({isRoomHost}) => {
  const titleText = isRoomHost ? '主持会议' : '加入会议'
  return (
    <p className='join_room_title'>
      {titleText}
    </p>
  )
}

export default JoinRoomTitle
