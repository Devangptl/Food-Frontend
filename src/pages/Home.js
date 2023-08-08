import React, { useRef } from 'react'
import deliveryLogo from '../assest/output-onlinegiftools.gif'
import HomeCart from '../components/HomeCart'
import { useSelector } from 'react-redux'
import CardFeature from '../components/CardFeature'
import { GrPrevious, GrNext } from 'react-icons/gr'
const Home = () => {


  const productData = useSelector((state) => state.product.productList)
  console.log(productData);

  const homeProductCartList = productData.slice(5, 10)
  const homeProductCartListVegetable = productData.filter(el => el.category === "vegetable", [])
  console.log(homeProductCartListVegetable)

  const loadingArray = new Array(5).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft +=200
  }
  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -=200

  }

  return (
    <div className='p-2 md:p-4 bg-slate-100' >
      <div className='md:flex gap-4 py-2' >

        <div className='md:w-1/2' >
          <div className='flex gap-3 content-center  w-40 pl-3 py-2 px-2 items-center rounded-full ' >
            <p className=' text-sm content-center font-bold text-slate-900 ' >Bike Delivery</p>
            <img src={deliveryLogo} className=' h-6 w-8' alt="" />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3' >The Fasted Delivery in <span className='text-red-600 ' >Your Home</span> </h2>
          <p className=' py-3 text-base text-justify w-[80%] ' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae velit exercitationem sequi dicta obcaecati veritatis, sit perspiciatis accusantium quo officiis dolore amet nulla neque officia! Repellat explicabo totam ab. Totam!</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded  '  >Order Now</button>
        </div>


        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center '>

          {
            homeProductCartList[0] ? homeProductCartList.map((el) => {
              return (

                <HomeCart
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />

              )
            })
              : loadingArray.map((el, index) => {
                return (
                  <HomeCart
                    key={index}
                    loading={"Loading"}
                  />
                )
              })
          }
        </div>
      </div>
      <div className='' >
        <div className='flex w-full items-center ' >
          <h2 className=' font-bold mb-4 text-2xl text-slate-800  ' >Fresh Vegetable </h2>
          <div className='ml-auto flex gap-4' >
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
          </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all ' ref={slideProductRef} >
          {
             homeProductCartListVegetable[0] ? homeProductCartListVegetable.map(el => {
              return (

                <CardFeature
                  key={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}

                />

              )
            })
            :
            loadingArrayFeature.map(el=>{
              return(
                <CardFeature 
                loading="Loading..."
                 />
              )
            }) 
          }
        </div>
      </div>

    </div>
  )
}

export default Home
