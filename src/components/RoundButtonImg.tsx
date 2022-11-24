import React from 'react'
import { NavLink } from 'react-router-dom'
import IRoundButtonImage from '../assets/models/IRoundButtonImage'


const RoundButtonImg = (props: IRoundButtonImage) => {


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
