import React from 'react'
import logo from '../../resources/images/logo.png'
import ConnectingButtons from './ConnectingButtons/ConnectingButtons.jsx'
import './IntroductionPage.css'
const IntroductionPage = () => {
  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} alt="introduction_page_image" />
        <ConnectingButtons />
      </div>  
    </div>
  )
}

export default IntroductionPage
