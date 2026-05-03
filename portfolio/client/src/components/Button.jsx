import React from 'react'
import "../styles/Button.css";

function Button({ text, onClick, className }) {
  return (
    <>
      <button className={`glow-button ${className || ""}`} onClick={onClick}>
        <span className='text'>{text}</span>
      </button>
    </>
  )
}

export default Button;