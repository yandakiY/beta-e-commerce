import React from 'react'

const Footer = () => {
  return (
    <footer style={{display:'flex', justifyContent:'center'}}>
        <a href='/about'>About</a>
        {" --- "}
        <a href='/settings'>Settings</a>
    </footer>
  )
}

export default Footer