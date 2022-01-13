import React from 'react'
const dummyParticipants = [
  {
  identity: 'Summer'
  },
  {
  identity: 'Lucy'
  },
  {
  identity: 'Henry'
  },
  {
  identity: 'Tom'
  },
]

const SingelParticipant = (props) => {
  const {identity, lastItem, participant} = props
  return (
    <>
      <p className='participants_paragraph'>
        { identity }
      </p>
      { !lastItem && <span className='participants_separator_line'></span> }
    </>
  )
}

const Participants = () => {
  return (
    <div className='participants_container'>
      {
        dummyParticipants.map((participant, index) => {
          return <SingelParticipant 
            key={participant.identity}
            identity={participant.identity}
            lastItem={dummyParticipants.length === index + 1} 
            participant={participant} />;
        })
      }
    </div>
  )
}

export default Participants
