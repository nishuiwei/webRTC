import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from '../../store/actions';
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import './JoinRoomPage.css'
const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props
  const search = useLocation().search
  useEffect(() => {  
    const isRoomHost = new URLSearchParams(search).get('host')
    if(isRoomHost) {
      // 将这个主持人的状态保存到 redux的store里面
      setIsRoomHostAction(isRoomHost)
    }
  }, [search, setIsRoomHostAction])
  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
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
