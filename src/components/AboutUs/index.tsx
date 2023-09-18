import React from 'react'
import { membersData } from './membersData'
import { MemberCard } from './memberCard'

export function AboutUs() {
  return (
    <div className="about">
      <h1>Our team:</h1>
      {membersData.map((member, index) => (
        <MemberCard key={index} member={member} index={index} />
      ))}
    </div>
  )
}
