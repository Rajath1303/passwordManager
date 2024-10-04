import React from 'react'

const Footer = () => {
  return (
    <div className='bg-lime-400 flex flex-col  items-center fixed bottom-0 w-full'>
      <div className="logo flex flex-col items-center font-bold text-white">
        <div>Safe</div>
        <div className="text-gray-700 rotate-180 font-thin">PASS</div>
      </div>
      <div className='text-gray-400 text-sm'>@Rajath@</div>
    </div>
  )
}

export default Footer
