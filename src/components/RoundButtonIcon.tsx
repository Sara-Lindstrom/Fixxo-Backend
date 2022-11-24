import React from 'react'
import IRoundButtonIcon from '../assets/models/IRounButtonIcon'



const RoundButtonIcon= (props:IRoundButtonIcon) => {
    return (
      <button className="round-button">
          <i className={props.icon}></i>
      </button>
    )
  }
  
  export default RoundButtonIcon