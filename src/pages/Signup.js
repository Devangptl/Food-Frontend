import React, { useState } from 'react'
import loginSingupImage from '../assest/login-animation.gif'
import {BiHide, BiShowAlt} from 'react-icons/bi'
import { Link , useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'


const Singup = () => {

    const navigate = useNavigate()

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const [data,setData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '' ,
        confirmpassword : '',
        image : ''

    })
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleOnchange = (e) => {
        const {name , value} = e.target
        setData( (preve)=> {
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadProfileImage = async(e)=>{
       
        const data = await ImagetoBase64(e.target.files[0])
       

        setData((preve) =>{
            return{
                ...preve,
                image : data
            }
        })

    }

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {firstName , email , password , confirmpassword} = data
        if(firstName && email && password && confirmpassword){
            if(password === confirmpassword){

                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup` , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                })

                const dataRes = await fetchData.json() 
                console.log(dataRes)
                

                toast(dataRes.message)

                if(dataRes.alert){
                    navigate('/login')
                }
            }
            else{
                alert('Password and confirm password does not match')
            }
        }
        else{
            alert('Please fill all the fields')
        }

    }


  return (
    <div className='p-3 md:p-4' >
      <div className='w-full max-w-md flex items-center flex-col p-4 bg-white m-auto' >
        {/* <h1 className='text-center text-2xl' >Sing Up</h1> */}
        <div className='w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md m-auto relative' >
            
            <img className='w-full h-full' src={ data.image ? data.image : loginSingupImage} alt="" />

            <label htmlFor='profileImage' >
            <div className=' cursor-pointer absolute bottom-0 h-1/3  bg-opacity-50 bg-slate-500 w-full text-center  ' >
                <p className='text-sm p-1 text-white' >Upload</p>
            </div>
            <input className='hidden' type="file" accept="image/* " id='profileImage' onChange={handleUploadProfileImage} />
            </label>
        </div>

        <form className=' w-full py-3 flex flex-col ' onSubmit={handleSubmit} >
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' value={data.firstName} name='firstName' onChange={handleOnchange} className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 '  />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' value={data.lastName} name='lastName' onChange={handleOnchange} className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'  />

            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={data.email} name='email' onChange={handleOnchange} className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'  />
            
            <label htmlFor="password">Password</label>
            <div className='flex px-2 py-1 mt-1 mb-2 bg-slate-200  rounded focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword ? 'text' :"password"} value={data.password} onChange={handleOnchange} id='password' name='password' className='w-full bg-slate-200 border-none outline-none'  />
            <span className='flex text-xl cursor-pointer ' onClick={handleShowPassword} >{showPassword ?<BiShowAlt/> : <BiHide/>} </span>
            </div>

            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className='flex px-2 py-1 mt-1 mb-2 bg-slate-200  rounded focus-within:outline focus-within:outline-blue-300'>
            <input type={showConfirmPassword ? 'text' :"password"} onChange={handleOnchange} value={data.confirmpassword} id='confirmpassword' name='confirmpassword' className='w-full bg-slate-200 border-none outline-none'  />
            <span className='flex text-xl cursor-pointer ' onClick={handleShowConfirmPassword} >{showConfirmPassword ?<BiShowAlt/> : <BiHide/>} </span>
            </div>

            <button className='max-w-[150px] text-white text-center py-1 text-xl rounded mt-4 m-auto w-full bg-red-500 cursor-pointer' >Sign Up</button>
        </form>
        <p className='text-sm mt-3' >Already have account ? <Link className='font-bold  text-red-500' to={'/login'} >Login</Link></p>
      </div>
    </div>
  )
}

export default Singup
