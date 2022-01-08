import React, { useEffect } from 'react'
import logo from '../../resources/images/logo.png'
import ConnectingButtons from './ConnectingButtons/ConnectingButtons.jsx'
import './IntroductionPage.css'
import { connect } from 'react-redux'
import { setIsRoomHost } from '../../store/actions'
const IntroductionPage = ({setIsRoomHostAction}) => {
  useEffect(() => {
    setIsRoomHostAction(false)
  }, [setIsRoomHostAction])
  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} alt="introduction_page_image" />
        <ConnectingButtons />
      </div>  
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
  }
}

export default connect(null, mapActionsToProps)(IntroductionPage)
