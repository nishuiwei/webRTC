import React from 'react'
import CheckImage from './../../resources/images/check.png'
const OnlyWithAudioCheckbox = ({setConnectOnlyWithAudio, connectOnlyWithAudio}) => {
  const handleConnectionTypeChange = () => {
    // 将链接的状态类型存储到 store 中
    setConnectOnlyWithAudio(!connectOnlyWithAudio)
    console.log(!connectOnlyWithAudio)
  }
  return (
    <div className='checkbox_container'>
      <div className='checkbox_connection' onClick={handleConnectionTypeChange}>
        {
          connectOnlyWithAudio && (
            <img className='checkbox_image' src={CheckImage} alt="单选框" />
          )
        }
      </div>
      <p className='checkbox_container_paragraph'>只开启音频</p>
    </div>
  )
}

export default OnlyWithAudioCheckbox
