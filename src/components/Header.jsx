import React, { useState } from "react";
import logo from "../assest/Red_Typographic_Ice_Cream_Shop_Logo-removebg-previewdd.png";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { ImCart } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import {toast} from 'react-hot-toast'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector( (state)=> state.user)
  // console.log(userData.email)
  const dispatch = useDispatch()

  const handleShowMenu = ()=>{
    setShowMenu(preve => !preve)
  }

  const handleLogout = () =>{
    dispatch(logoutRedux())
    toast('Logout successfully')
    
  }

  return (
    <header className=" fixed shadow-md w-full h-16 px-5 md:px-4 z-50 bg-white ">
      {/* desktop */}

      <div className="flex items-center h-full justify-between ">
        <Link to={"/"}>
          <div className=" h-10">
            <img className="h-full" src={logo} alt="" />
          </div>
        </Link>

        <div className="flex gap-4 items-center md:gap-7">
          <nav className="gap-4 flex md:gap-7 text-base md:text-lg ">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-700 relative ">
            <ImCart />
            <div className=" absolute -top-1 -right-1 text-white h-4 w-4 bg-red-500 text-xs m-0 p-0 rounded-full text-center">
              1
            </div>
          </div>
          <div  onClick={handleShowMenu} className=" text-slate-700">
            <div  className=" text-3xl cursor-pointer w-9 h-9 rounded-full  overflow-hidden drop-shadow ">
             { userData.image ? <img src={userData.image} className="h-full w-full border border-slate-700  rounded-3xl " />: <BiUserCircle className=" h-full w-full" />
             }
            </div>
            {showMenu && (
              <div className=" flex flex-col  absolute right-2 bg-white py-2 shadow drop-shadow-md ">
               {
                userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={'newproduct'} className=" px-2 whitespace-nowrap cursor-pointer">New Product</Link>

               }
                {
                  userData.firstName ? <p onClick={handleLogout} className=" whitespace-nowrap bg-red-500 text-white px-2 cursor-pointer" >Logout ({userData.firstName} {userData.lastName}) </p> : <Link to={'login'} className=" px-2 whitespace-nowrap cursor-pointer">Login</Link>

                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
