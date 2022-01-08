import React from 'react'
const Input = ({placeholder, value, changeHandler}) => {
  return (
    <input className='join_room_input' placeholder={placeholder} value={value} onChange={changeHandler} />
  )
}
const JoinRoomInputs = (props) => {
  const {roomId, setRoomId, name, setName, isRoomHost} = props

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  return (
    <div className='join_room_inputs_container'>
      {
        !isRoomHost &&
        <Input placeholder='请输入会议ID号...' value={roomId} onChange={handleRoomIdChange} />
      }
      <Input placeholder='请输入姓名...' value={name} onChange={handleNameChange} />
    </div>
  )
}

export default JoinRoomInputs
