import React from 'react'

const RoomLabel = ({roomId}) => {
  return (
    <div className='room_label'>
      <p className='room_label_paragraph'>
        会议房间号：{roomId}
      </p>
    </div>
  )
}

export default RoomLabel
