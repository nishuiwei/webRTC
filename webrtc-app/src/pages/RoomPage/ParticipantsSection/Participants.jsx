import React from 'react'
import { connect } from 'react-redux'

const SingelParticipant = (props) => {
  const {identity, lastItem, participants} = props
  return (
    <>
      <p className='participants_paragraph'>
        { identity }
      </p>
      { !lastItem && <span className='participants_separator_line'></span> }
    </>
  )
}

const Participants = ({ participants }) => {
  console.log(participants)
  return (
    <div className='participants_container'>
      {
        participants.map((participant, index) => {
          return <SingelParticipant 
            key={participant.identity}
            identity={participant.identity}
            lastItem={participants.length === index + 1} 
            participant={participant} />;
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

export default connect(mapStateToProps)(Participants)
