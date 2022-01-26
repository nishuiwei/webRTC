import React, {useState} from 'react'
import CameraButtonImg from "./../../../resources/images/camera.svg";
import CameraButtonImgOff from "./../../../resources/images/cameraOff.svg";
import * as webRTCHandler from './../../../utils/webRTCHandler'
const CameraButton = () => {
  const [isLcoalVideoDisable, setIsLcoalVideoDisable] = useState(false)
  const handleCameraButtonPress = () => {
    webRTCHandler.toggleCamera(isLcoalVideoDisable)
    setIsLcoalVideoDisable(!isLcoalVideoDisable);
  }
  const alt = isLcoalVideoDisable ? '开启摄像头' : '关闭摄像头'
  return (
    <div className='video_button_container'>
      <img 
        src={isLcoalVideoDisable ? CameraButtonImgOff : CameraButtonImg} 
        onClick={handleCameraButtonPress}
        className='video_button_image'
        alt={alt}
      />
    </div>
  )
}

export default CameraButton
