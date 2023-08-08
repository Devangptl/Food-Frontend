import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const NewProduct = () => {

  const [data , setData] = useState({
    name : "",
    category : '',
    image : '',
    price :'',
    description :'',
  })

  const handleOnChange =(e)=>{
    const {name , value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image: data
      }
    })

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(data)

    const {name , image ,category , price} = data

    if(name && image && category && price){
      
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct` , {
      method:'POST',
      headers:{
        "Content-Type" :"application/json",
      },
      body: JSON.stringify(data),
    })

    const fetchRes = await fetchData.json()
    console.log(fetchRes)
    toast(fetchRes.message)

    setData(()=>{
      return{
        name : "",
        category : '',
        image : '',
        price :'',
        description :'',
      }
    })
  }else{
    toast("please fill all the fields")
  }

    }


  return (
    <div className='p-4' >
      <form onSubmit={handleSubmit} className='m-auto w-full max-w-md shadow bg-white  flex flex-col p-3 '>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' value={data.name} onChange={handleOnChange} className='bg-slate-200 p-1 my-1 '  />

        <label htmlFor="category"> Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' value={data.category} name='category' onChange={handleOnChange} >
          <option value="other">Select category</option>
          <option value="fruits">Fruits</option>
          <option value="vegetable">Vegetable</option>
          <option value="icream">Icream</option>
          <option value="cake">Cake</option>
          <option value="dosa">Dosa</option>
          <option value="burger">Burger</option>
          <option value="pizza">Pizza</option>
          <option value="rice">Rice</option>
        </select>

        <label htmlFor="image"  >Image
        <div  className='h-40 w-full cursor-pointer bg-slate-200 my-3 rounded flex items-center justify-center ' >
         {
          data.image ? <img src={data.image} className='h-full' alt="" /> :          <span className='text-5xl' ><AiOutlineCloudUpload className=' opacity-60' /></span> 

         }
         
         <input type="file" id='image' accept="image/* " onChange={uploadImage} className=' hidden' />
        </div>
        </label>

        <label htmlFor="price" className='my-1' >Price</label>
        <input type="text" value={data.price} name='price'  onChange={handleOnChange} className='bg-slate-200 p-1 my-1' />

        <label htmlFor="description">Description</label>
        <textarea rows={2} value={data.description} name='description'  onChange={handleOnChange} className='bg-slate-200 p-1 my-1 resize-none ' ></textarea>

        <button className=' text-white font-medium drop-shadow text-center py-1 text-xl  mt-4 m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer' >Save</button>

      </form>
    </div>
  )
}

export default NewProduct
