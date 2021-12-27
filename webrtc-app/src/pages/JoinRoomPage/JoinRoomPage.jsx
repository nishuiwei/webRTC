import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from '../../store/actions';
const JoinRoomPage = (props) => {
  const { setIsRoomHostAction } = props
  const search = useLocation().search
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host')
    if(isRoomHost) {
      // 将这个主持人的状态保存到 redux的store里面
      setIsRoomHostAction(isRoomHost)
    }
  }, [])
  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomPage)
