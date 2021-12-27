import React from 'react'

const ConnectingButton = ({createRoomButton = false, buttonText, onClickHandler}) => {
  const className = createRoomButton ? 'create_room_button' : 'join_room_button'
  return (
    <button onClick={onClickHandler} className={className}>{buttonText}</button>
  )
}

export default ConnectingButton
