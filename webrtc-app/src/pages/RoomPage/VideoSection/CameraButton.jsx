import React, {useState} from 'react'
import CameraButtonImg from "./../../../resources/images/camera.svg";
import CameraButtonImgOff from "./../../../resources/images/cameraOff.svg";
const CameraButton = () => {
  const [isLcoalVideoDisable, setIsLcoalVideoDisable] = useState(false)
  const handleCameraButtonPress = () => {
    setIsLcoalVideoDisable(!isLcoalVideoDisable);
  }
  return (
    <div className='video_button_container'>
      <img 
        src={isLcoalVideoDisable ? CameraButtonImgOff : CameraButtonImg} 
        onClick={handleCameraButtonPress}
        className='video_button_image'
      />
    </div>
  )
}

export default CameraButton
