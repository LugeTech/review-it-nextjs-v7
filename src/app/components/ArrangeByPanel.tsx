import React from 'react'

const ArrangeByPanel = () => {
  return (
    <div className='flex flex-1 flex-col p-4 w-full'>
      <div className='flex w-full'>
        <p className='flex-1 text-center'>Arrange by rating</p>
      </div>
      <div className="btn-group flex w-full">
        <button className="btn btn-active flex-1 ">3.0+</button>
        <button className="btn flex-1">4.0+</button>
        <button className="btn flex-1">4.5+</button>
      </div>
    </div>
  )
}

export default ArrangeByPanel
