import React, { useState } from 'react'
import * as webRTCHandler from '../../../utils/webRTCHandler'
import SendMessageButton from './../../../resources/images/sendMessageButton.svg'
const NewMessage = () => {
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      // 发送消息给其他用户
      sendMessage()
    }
  }

  const sendMessage = () => {
    console.log('发送消息给其他用户...', message)
    webRTCHandler.sendMessageUsingDataChannel(message)
    setMessage('')
  }
  return (
    <div className='new_message_container'>
      <input
       value={message}
       onChange={handleTextChange}
       onKeyDown={handleKeyDown}
       className='new_message_input'
       type="text"
       placeholder='请输入消息...' />
       <img className='new_message_button' src={SendMessageButton} alt="发送信息" onClick={sendMessage} />
    </div>
  )
}

export default NewMessage