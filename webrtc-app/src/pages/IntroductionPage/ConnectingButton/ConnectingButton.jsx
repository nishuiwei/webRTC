import React from 'react'

const ConnectingButton = ({createRoomButton = false, buttonText, onclickHandler}) => {
  const className = createRoomButton ? 'create_room_button' : 'join_room_button'
  return (
    <button onClick={onclickHandler} className={className}>{buttonText}</button>
  )
}

export default ConnectingButton
