import React from 'react'
import { NavLink } from 'react-router-dom'

const RoundButtonImg = ({link, image, onClickEvent, notificationNumber, cart=false}) => {


  return (
    <NavLink to={link}>
      <button onClick={onClickEvent} className="round-button">
        <span className="notification-pill badge rounded-pill">{notificationNumber}</span>
        <img src={image} alt=""/>
      </button>  
    </NavLink>
  )
}

export default RoundButtonImg
