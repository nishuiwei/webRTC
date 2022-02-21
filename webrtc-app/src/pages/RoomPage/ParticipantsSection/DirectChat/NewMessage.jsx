import React, { useState } from 'react'
import { connect } from 'react-redux'
import SendMessageButton from './../../../../resources/images/sendMessageButton.svg'
import * as wss from './../../../../utils/wss'
const NewMessage = ({ activeConversaction, identity }) => {
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    // 发送信息
    wss.sendDirectmessage({
      receiverSocketId: activeConversaction.socketId,
      identity,
      messageContent: message
    })
    setMessage('')
  }

  return (
    <div className='new_message_container new_message_direct_border'>
      <input 
        className='new_message_input' 
        value={message} 
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder="请输入消息" 
        type="text" />
        <img 
          className='new_message_button' 
          src={SendMessageButton} 
          onClick={sendMessage} 
          alt="发送按钮" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(NewMessage)