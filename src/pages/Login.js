import React, { useState } from 'react'
import loginSingupImage from '../assest/login-animation.gif'
import {BiHide, BiShowAlt} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'

const Login = () => {

  const navigate = useNavigate()

  const [showPassword , setShowPassword] = useState(false)

  const userData = useSelector(state => state)

  const dispatch = useDispatch()
   
    const [data,setData]=useState({
        email : '',
        password : '' ,

    })
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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


    const handleSubmit = async(e)=>{
        console.log(data)
        e.preventDefault()
        const { email , password } = data

        if(email && password ){
                
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const dataRes = await fetchData.json() 
        console.log(dataRes)
        toast( userData.user.firstName + " " + dataRes.message)

        if(dataRes.alert){
          dispatch(loginRedux(dataRes))
          setTimeout(()=>{
            navigate("/")
          },1000)
        }

        }else{
                alert('Please fill all the fields')
        }

    }




  return (
    <div className='p-3 md:p-4' >
      <div className='w-full max-w-md flex items-center flex-col p-4 bg-white m-auto' >
        {/* <h1 className='text-center text-2xl' >Sing Up</h1> */}
        <div className='w-20 overflow-hidden rounded-full shadow-md drop-shadow-md' >
            <img className='w-full' src={loginSingupImage} alt="" />
        </div>

        <form className=' w-full py-3 flex flex-col ' onSubmit={handleSubmit} >
           
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={data.email} name='email' onChange={handleOnchange} className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'  />
            
            <label htmlFor="password">Password</label>
            <div className='flex px-2 py-1 mt-1 mb-2 bg-slate-200  rounded focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword ? 'text' :"password"} value={data.password} onChange={handleOnchange} id='password' name='password' className='w-full bg-slate-200 border-none outline-none'  />
            <span className='flex text-xl cursor-pointer ' onClick={handleShowPassword} >{showPassword ?<BiShowAlt/> : <BiHide/>} </span>
            </div>


            <button className='max-w-[150px] text-white text-center py-1 text-xl rounded mt-4 m-auto w-full bg-red-500 cursor-pointer' >Login</button>
        </form>
        <p className='text-sm mt-3' >Don't have account have account ? <Link className='font-bold  text-red-500' to={'/signup'} >Sing Up</Link></p>
      </div>
    </div>
  )
}

export default Login
