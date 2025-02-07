import React, { useEffect } from 'react'
import ProductCard from '../components/Cart/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/Cart/SearchCard'
import CartCard from '../components/Cart/CartCard'

const Shop = () => {
  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)

  useEffect(()=>{
    getProduct(5)
  },[])

  
  return (
    <div className='flex'>

    <div className='w-1/4 p-4 bg-gray-100 h-screen'>
      <SearchCard/>
    </div>

    <div className='w-1/2 p-4 h-screen overflow-y-auto'>
     <p className='text-2xl font-bold mb-4'>Product all</p>
      <div className='flex flex-wrap gap-4'>
        {
          products.map((item, index)=>
            <ProductCard key={index} item={item}/>
          )
        }
        
       
      </div>
    </div>

    <div className='w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto'>
      <CartCard/>
    </div>



    </div>
  )
}

export default Shop