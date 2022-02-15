import React from 'react'
import ChatLabel from './ChatLabel'
import Messages from './Messages'

const ChatSection = () => {
  return (
    <div className='chat_section_container'>
      <ChatLabel />
      <Messages />
    </div>
  )
}

export default ChatSection
