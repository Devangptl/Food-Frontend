import React from 'react'

const HomeCart = ({name , image, category , price , loading}) => {
  return (
    <div className=' shadow p-2 bg-white rounded min-w-[150px] '>
      {
        name ? <> 
      <div className='w-40 min-h-[160px] ' >
        <img src={image} className='h-full w-full' alt="" />
      </div>
      <h3 className='font-semibold text-slate-600 text-center capitalize text-lg' >{name}</h3>
      <h3 className='font-medium text-slate-500 text-center capitalize text-lg' >{category}</h3>
      <h3 className='font-bold text-center capitalize ' > <span className='text-red-500' >₹</span>  <span>{price}</span> </h3>
        
        </>
        : 
        <div className='flex justify-center items-center h-full' >
          <p>{loading}</p>
        </div>
      }
    </div>
  )
}

export default HomeCart
