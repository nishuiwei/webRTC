import React, { useState } from 'react'
import { connect } from 'react-redux'
import JoinRoomInputs from './JoinRoomInputs'
const JoinRoomContent = (props) => {
  const { isRoomHost } = props
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")

  return (
    <>
      <JoinRoomInputs
        roomId={roomId}
        setRoomId={setRoomId}
        name={name}
        setName={setName}
        isRoomHost={isRoomHost}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(JoinRoomContent)
