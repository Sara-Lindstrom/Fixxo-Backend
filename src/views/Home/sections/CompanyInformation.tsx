import React from 'react'

const CompanyInformation:React.FC<{companyimg:string, companytitle:string, companyinfo:string}> = ({companyimg, companytitle, companyinfo}) => {
  return (
    <div className="container">
        <div className="group-info">
            <button className="round-button"> <img src={companyimg} alt={companytitle}/></button>
            <h6>{companytitle}</h6>
            <p>{companyinfo}</p>
        </div>
    </div>
  )
}

export default CompanyInformation