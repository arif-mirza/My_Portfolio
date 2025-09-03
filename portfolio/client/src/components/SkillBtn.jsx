import React from 'react'

function SkillBtn({label , isActive, onClick}) {
  return (
    <>
    <button className={`skill-btn ${isActive ? 'active' : ''} `} onClick={onClick} style={{textAlign : 'start'}}>{label}</button>
    
    </>
  )
}

export default SkillBtn