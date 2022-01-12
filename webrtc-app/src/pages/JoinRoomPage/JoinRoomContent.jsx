import React, { useState } from 'react'
import { connect } from 'react-redux'
import JoinRoomInputs from './JoinRoomInputs'
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox'
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '../../store/actions'
import ErrorMessage from './ErrorMessage'
import JoinRoomButtons from './JoinRoomButtons'
import { getRoomExists } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const JoinRoomContent = (props) => {
  const { 
    isRoomHost, 
    setConnectOnlyWithAudio, 
    connectOnlyWithAudio,
    setIdentityAction,
    setRoomIdAction,
  } = props
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  // 加入房间的事件
  const handleJoinRoom = async () => {
    setIdentityAction(name)
    // 加入房间
    if(isRoomHost) {
      createRoom()
    } else {
      await joinRoom()
    }
  }

  const joinRoom = async () => {
    const response = await getRoomExists(roomId)
    const { roomExists, full } = response
    if(roomExists) {
      if(full) {
        setErrorMessage('会议房间人数已满，请稍后再试')
      } else {
        // 进入房间
        setRoomIdAction(roomId)
        navigate('/room')
      }
    } else {  
      setErrorMessage('会议房间不存在，请验证你的ID是否正确')
    }
  }

  const createRoom = () => {
    navigate('/room')
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
    setConnectOnlyWithAudio: (connectOnlyWithAudio) => 
      dispatch(setConnectOnlyWithAudio(connectOnlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent)
