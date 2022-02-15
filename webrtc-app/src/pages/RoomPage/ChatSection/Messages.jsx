import React from 'react'

const messages = [{
  content: '大家好,我是XXX',
  identity: 'Summer',
  messageCreatedByme: true,
}, {
  content: '大家好,我是XXX',
  identity: 'Hery',
  messageCreatedByme: false,
},{
  content: '很高兴认识大家',
  identity: 'Summer',
  messageCreatedByme: true,
}, {
  content: '我也是',
  identity: 'Hery',
  messageCreatedByme: false,
}]

const Message = ({author, content, sameAuthor, messageCreatedByme}) => {
  const alignClass = messageCreatedByme ? 'message_align_right' : 'message_align_left'
  const authorText = messageCreatedByme ? '我' : author
  const contentStyles = messageCreatedByme ? 'message_right_styles' : 'message_left_styles'

  return (
    <div className={`message_container ${alignClass}`}>
      {
        !sameAuthor && <p className='message_title'>{ authorText }</p>
      }
      <p className={`message_content ${contentStyles}`}>{content}</p>
    </div>
  )
};

const Messages = () => {
  return (
    <div className='messages_container'>
      {
        messages.map((message, index) => {
          const sameAuthor = index > 0 && message.identity === messages[index - 1].identity
          return (
            <Message
             key={`${message.content}${index}`} 
             author={message.identity} 
             content={message.content} 
             sameAuthor={sameAuthor}
             messageCreatedByme={message.messageCreatedByme} />
          )
        })
      }
    </div>
  )
}

export default Messages