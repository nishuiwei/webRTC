import React from 'react'
import { connect } from 'react-redux'
import { setActiveConversaction } from '../../../store/actions'

const SingelParticipant = (props) => {
  const {identity, lastItem, participant, setActiveConversAction, socketId} = props
  
  // 激活私信聊天, 获取对象信息
  const handleOpenActiveConversation = () => {
    if(participant.socketId !== socketId) {
      setActiveConversAction(participant)
    }
  }
  return (
    <>
      <p className='participants_paragraph' onClick={handleOpenActiveConversation}>
        { identity }
      </p>
      { !lastItem && <span className='participants_separator_line'></span> }
    </>
  )
}

const Participants = ({ participants, setActiveConversAction, socketId }) => {
  return (
    <div className='participants_container'>
      {
        participants.map((participant, index) => {
          return <SingelParticipant 
            key={participant.identity}
            identity={participant.identity}
            lastItem={participants.length === index + 1} 
            participant={participant}
            setActiveConversAction={setActiveConversAction}
            socketId={socketId}
          />;
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setActiveConversAction: (activeConversation) => {
      dispatch(setActiveConversaction(activeConversation))
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Participants)
