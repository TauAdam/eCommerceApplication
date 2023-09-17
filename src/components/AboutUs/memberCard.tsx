import React from 'react'
import { IMember } from './membersData'
import denisPhoto from '../../assets/images/denis.jpg'
import './style.css'

interface Prop {
  index?: number
  member: IMember
}

export function MemberCard({ member, index }: Prop) {
  return (
    <div className="memberCard">
      <hr />
      {index === 0 && <img className="memberPhoto" src={denisPhoto} alt={`${member.name} photo`} />}
      <h2>{member.name}</h2>
      <h3>Job: {member.job}</h3>
      <h3>My bio:</h3>
      <ul>
        {member.bio.map((bioString, index) => (
          <li key={index}>{bioString}</li>
        ))}
      </ul>
      <h3>Contributions:</h3>
      <ul>
        {member.contributions.map((contribution, index) => (
          <li key={index}>{contribution}</li>
        ))}
      </ul>
      <a href={member.githubLink} target="_blank" rel="noreferrer">
        Link to {member.name} github
      </a>
    </div>
  )
}
