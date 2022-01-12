import React, { useState } from 'react'
import { connect } from 'react-redux'
import JoinRoomInputs from './JoinRoomInputs'
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox'
import { setConnectOnlyWithAudio } from '../../store/actions'
import ErrorMessage from './ErrorMessage'
import JoinRoomButtons from './JoinRoomButtons'
const JoinRoomContent = (props) => {
  const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")
  // 加入房间的事件
  const handleJoinRoom = () => {
    // 加入房间
    console.log('成功加入房间')
  }
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
      <ErrorMessage errorMessage='房间号不正确' />
      <JoinRoomButtons isRoomHost={isRoomHost} handleJoinRoom={handleJoinRoom} />
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
