import React from 'react'

function Container({children} : {children : React.ReactNode}) {
  return (
    <div className='container mx-auto'>
        {children}
    </div>
  )
}

export default Container