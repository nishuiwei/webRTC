import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ConversationNotChosen from './ConversationNotChosen'
import DirectHeader from './DirectHeader'
import MessageContent from './MessageContent'
import NewMessage from './NewMessage'

const getDirectChatHistory = (directChatHistory, socketId = null) => {
  // 判断是否存在 directChatHistory 或者 socketId
  if(!socketId || !directChatHistory) {
    return [];
  }

  const history = directChatHistory.find(history => history.socketId === socketId)
  return history ? history.chatHistory : []
}

const DirectChat = ({activeConversaction, directChatHistory}) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(
      getDirectChatHistory(
        directChatHistory,
        activeConversaction 
        ? activeConversaction.socketId : null
      )
    );
  }, [activeConversaction, directChatHistory]);
  
  return (
    <div className='direct_chat_container'>
      <DirectHeader activeConversaction={activeConversaction} />
      <MessageContent messages={messages} />
      <NewMessage />
      {!activeConversaction && <ConversationNotChosen />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(DirectChat)