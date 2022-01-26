import React, {useEffect, useRef} from 'react';

export const LocalScreenSharingPreview = ({stream}) => {
  const localPreviewRef = useRef()
  useEffect(() => {
    const vidio = localPreviewRef.current
    vidio.srcObject = stream
    vidio.onloadedmetadata = () => {
      vidio.play();
    } 
  }, [stream]);
  
  return (
    <div className='local_screen_share_preview'>
      <video ref={localPreviewRef} muted autoPlay></video>
    </div>
  )
};
