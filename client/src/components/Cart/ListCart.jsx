import React from 'react'
import { ListCheck } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import {createUserCart} from '../../api/User'
import { toast } from 'react-toastify';
const ListCart = () => {

    const cart = useEcomStore((state)=>state.carts)
    const user =useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)
    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)
    console.log({cart})

    const navigate = useNavigate()

    const handleSaveCart = async ()=>{
       await createUserCart(token,{cart})
       .then((res)=>{
            console.log(res)
            toast.success('Add to Cart Success',{
                position:"top-center",
            })
            navigate('/checkout')
       })
       .catch((err)=>{
            console.log(err)
            toast.warning(err.response.data.message)
       })
    }

  return (
    <div className='bg-gray-100 rounded-md shadow-md p-4'>
        {/* Header */}
        <div className='flex gap-4 mb-4'>
                <ListCheck size={36}/>
                <p className='text-2xl font-bold'>ListProduct {cart.length} List</p>
        </div>

        {/* List */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Left */}
            <div className='col-span-2'>
            {
                cart.map((item, index)=>
            <div key={index} className='bg-white p-2 shadow-md rounded-md mb-2'>
                <div className='flex justify-between mb-2'>
                    <div className='flex gap-2 items-center'>
                        {

                            item.images && item.images.length > 0 
                            ? <img 
                                className='w-16 h-16 rounded-md shadow-md'
                                src={item.images[0].url}/>
                            : <div 
                                className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                                No Image
                                </div>

                        }
                        <div>
                            <p className='font-bold'>{item.title}</p>
                            <p className='text-sm'>{item.price} x {item.count}</p>
                        </div>
                    </div>
                    <div>
                         <div className='font-bold text-blue-400'>
                            {item.price * item.count}
                        </div>
                    </div>
                </div>
            </div>

                )
            }
            </div>


            {/* Right */}
            <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                <p className='text-2xl font-bold'>Total</p>
                <div className='flex justify-between'>
                    <span>Total All</span>
                    <span className='text-2xl'>{getTotalPrice()}</span>
                </div>

            <div className='flex flex-col gap-2'>

                {
                    user
                    ? <Link>
                        <button 
                        onClick={handleSaveCart}
                        className='bg-red-500 rounded-md shadow-md text-white w-full py-2 hover:bg-red-700'>Buy now</button>  
                    </Link>
                        
                    :   <Link to={'/login'}>
                <button className='bg-blue-500 rounded-md shadow-md text-white w-full py-2 hover:bg-blue-700'>Login</button>
                        </Link>

                }
                

              
                <Link to={'/shop'}>
                <button className='bg-gray-400 rounded-md shadow-md text-white w-full mt-1 py-2 hover:bg-gray-700'>EditOrder</button>
                </Link>
            </div>

            </div>
        </div>

    </div>
  )
}

export default ListCart