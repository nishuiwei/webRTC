import React, { useState } from 'react'
import { connect } from 'react-redux'
import JoinRoomInputs from './JoinRoomInputs'
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox'
import { setConnectOnlyWithAudio } from '../../store/actions'
import ErrorMessage from './ErrorMessage'
import JoinRoomButtons from './JoinRoomButtons'
import { getRoomExists } from '../../utils/api'
const JoinRoomContent = (props) => {
  const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  // 加入房间的事件
  const handleJoinRoom = async () => {
    // 加入房间
    const response = await getRoomExists(roomId)
    const { roomExists, full } = response
    if(roomExists) {
      if(full) {
        setErrorMessage('会议房间人数已满，请稍后再试')
      } else {
        // 进入房间
        console.log('进入房间')
      }
    } else {
      setErrorMessage('会议房间不存在，请验证你的ID是否正确')
    }
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
      <ErrorMessage errorMessage={errorMessage} />
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
