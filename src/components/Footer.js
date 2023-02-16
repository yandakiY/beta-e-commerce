import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{display:'flex', justifyContent:'center'}}>
        <Link to='/about'>About</Link>
        {" --- "}
        <Link to='/settings'>Settings</Link>
    </footer>
  )
}

export default Footer