import React from 'react'
import { NavLink } from 'react-router-dom'

const BreadCrumb:React.FC<{currentPage:string, advertising:string}> = ({currentPage, advertising}) => {
  return (
    <div className="container breadcrumb">
        <p className="container commersial-info">{advertising}</p>
        <ul className="breadcrumb-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li>{currentPage}</li>
        </ul>
    </div>
  )
}

export default BreadCrumb