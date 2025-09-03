import React from 'react'
import "../styles/Button.css";

function Button({text}) {
  return (
    <>
    <button className='glow-button'><span className='text'>{text}</span></button>
    </>
  )
}

export default Button;