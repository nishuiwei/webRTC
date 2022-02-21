import React, { useEffect, useRef } from 'react'

const SingleMessage = ({ isAuthor, messageContent }) => {
  const messageStyling = isAuthor
    ? 'author_direct_message'
    : 'receiver_direct_message';

  const containerStyling = isAuthor
    ? 'direct_message_container_author'
    : 'direct_message_messageStylingcontainer_receiver';

  return (
    <div className={containerStyling}>
      <p className={messageStyling}>{messageContent}</p>
    </div>
  );
};

const MessageContent = ({messages = []}) => {
  const scrollRef = useRef()
  useEffect(() => {
    // 让元素滚动到窗口的可视区域
    if(scrollRef) {
      scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages])
  
  return (
    <div className='direct_messages_container'>
      {
        messages.map((message) => {
          return (
            <SingleMessage
              messageContent={message.messageContent}
              identity={message.identity}
              isAuthor={message.isAuthor}
              key={`${message.messageContent} - ${message.identity}`}
            />
          )  
        })
      }
      <div ref={scrollRef}></div>
    </div>
  )
}

export default MessageContent