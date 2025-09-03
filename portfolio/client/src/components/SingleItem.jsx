import React from 'react'

function SingleItem(props) {
  return (
    <li className='list-8'>  < img src={props.icon} alt="" />{props.title}</li>
  )
}

export default SingleItem;