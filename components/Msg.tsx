import React from 'react'
const Msg = ({ children, color }: { children: string;  color: string}) => {
  
  return (
    <h2 className='msg' style={{backgroundColor:color}}>{children}</h2>
  )
}

export default Msg