import React from 'react'
import {useRouteError} from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <h1 style={{textAlign:'center' , fontFamily:'consolas'}}>Ooops !!!</h1>
      <h1 style={{textAlign:'center' , fontFamily:'consolas'}}>Error Page : {error.statusText} </h1>
      <div style={{textAlign:'center'}}>
        <a  href={'/'}>Return to home page</a>
      </div>
    </>
    
  )
}

export default ErrorPage