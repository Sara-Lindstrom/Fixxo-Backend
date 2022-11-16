import React from 'react'
import { NavLink } from 'react-router-dom'

const BreadCrumb = (currentPage:string, comersial:string) => {
  return (
    <div className="container breadcrumb">
        <p className="container commersial-info">{comersial}</p>
        <ul className="breadcrumb-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li>{currentPage}</li>
        </ul>
    </div>
  )
}

export default BreadCrumb