import React from 'react'
import { NavLink } from 'react-router-dom'
import IRoundButtonIcon from '../assets/models/IRoundButton'


const RoundButtonImg = (props: IRoundButtonIcon) => {


  return (
    <NavLink to={props.link}>
      <button onClick={props.onClickEvent} className="round-button">
        <span className="notification-pill badge rounded-pill">{props.notificationNumber}</span>
        <img src={props.image} alt=""/>
      </button>  
    </NavLink>
  )
}

export default RoundButtonImg
