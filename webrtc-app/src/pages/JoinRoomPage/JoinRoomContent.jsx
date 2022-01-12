import React, { useState } from 'react'
import { connect } from 'react-redux'
import JoinRoomInputs from './JoinRoomInputs'
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox'
import { setConnectOnlyWithAudio } from '../../store/actions'
const JoinRoomContent = (props) => {
  const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props
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
      <OnlyWithAudioCheckbox 
        connectOnlyWithAudio={connectOnlyWithAudio} 
        setConnectOnlyWithAudio={setConnectOnlyWithAudio} 
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (connectOnlyWithAudio) => {
      dispatch(setConnectOnlyWithAudio(connectOnlyWithAudio))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent)