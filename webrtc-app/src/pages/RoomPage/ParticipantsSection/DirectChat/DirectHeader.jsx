import React from 'react'

const DirectHeader = ({activeConversaction}) => {
  return (
    <div className='direct_chat_header'>
      <p className='direct_chat_header_paragraph'>
        { activeConversaction ? activeConversaction.identity : '' }
      </p>
    </div>
  )
}

export default DirectHeader