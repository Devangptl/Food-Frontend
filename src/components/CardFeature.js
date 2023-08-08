import React from 'react'

const CardFeature = ({ image, name, price, category, loading }) => {
    return (
        <div className='w-full min-w-[200px] bg-white hover:shadow-lg  drop-shadow-lg pt-5 px-4 cursor-pointer flex flex-col overflow-hidden ' >
            {
                image ? <>
                    <div className='h-28 flex justify-center flex-col items-center'>
                        <img src={image} className='h-full' alt="" />
                    </div>
                    <h3 className='font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden ' >{name}</h3>
                    <h3 className='font-medium text-slate-500 capitalize text-lg' >{category}</h3>
                    <h3 className='font-bold  capitalize ' > <span className='text-red-500' >₹</span>  <span>{price}</span> </h3>

                    <button className='bg-yellow-500 py-1  my-4 rounded ' >Add Cart</button>

                </>
                    :
                    <div className='flex justify-center items-center min-h-[150px] ' >
                        <p>{loading}</p>
                    </div>
            }

        </div>
    )
}

export default CardFeature
