import React from 'react'
import { Link } from 'react-router-dom'
import { MemberCard } from './memberCard'
import { membersData } from './membersData'

export function AboutUs() {
  return (
    <div className="about">
      <Link to={'https://rs.school/'} className="rs-school-logo">
        <img src="/rs_school.svg" alt="rs school logo" className="rs-school-logo__img" />
      </Link>
      <h1>Our team:</h1>
      {membersData.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  )
}
