import React,{useState, useEffect,} from 'react'
import { listUserCart, saveAddress } from '../../api/User'
import useEcomstore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const SummaryCard = () => {
    const token = useEcomstore((state)=>state.token)
    const [products, setProducts] = useState()
    const [cartTotal, setCartTotal] = useState(0)
    const [address, SetAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
       hdlGetUserCart(token) 
    },[])

    const hdlGetUserCart =  (token) =>{
        listUserCart(token)
        .then((res)=>{
            //console.log(res)
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err)=>console.log(err))
    }
    const hdlSaveAddress = () =>{
        if(!address) {
            return toast.warning('Pls Fill Address')
        }
         saveAddress(token, address)
        .then((res)=>{
            console.log(res)
            toast.success(res.data.message)
            setAddressSaved(true)
        })
        .catch((err)=> console.log(err))
    }

   const hdlOnPayment = ()=>{
        if(!addressSaved) {
        return toast.warning('Pls Fill Address')
        }
            navigate('/user/payment')
   }
   
  return (
    <div className='mx-auto'>
        <div className='flex flex-wrap gap-4'>
            {/* Left */}
            <div className='w-1/3'>
                <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                    <h1 className='text-lg font-bold'>Address</h1>
                    <textarea
                    required
                    onChange={(e)=>SetAddress(e.target.value)}
                    placeholder='Pls input Address'
                    className='w-full px-2 rounded-md'/>
                    <button
                    onClick={hdlSaveAddress} 
                    className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 hover:duration-200'>SaveAddress</button>
                </div>
            </div>


            {/* Right */}
            <div className='w-2/4'>
                <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                    <h1 className='text-lg font-bold'>Summary</h1>
                    {/* Item List */}
                    {
                        products?.map((item, index)=>
                         <div key={index}>
                            <div className='flex justify-between items-center'>
                                <div>
                                <p className='font-bold'>{item.product.title}</p>
                                <p className='text-sm'>{item.count} x {item.product.price}</p>
                                </div>
                            <div>
                                <p className='text-red-500 font-bold'>{item.count * item.product.price}</p>
                            </div>
                            </div>
                        </div>
                        )
                    }

                    {/* Shipping cost */}
                    <div>
                        <div className='flex justify-between'>
                            <p>ShippingCost:</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Discount:</p>
                            <p>0.00</p>
                        </div>
                    </div>
                    <hr/>
                    {/* Total */}
                    <div>
                        <div className='flex justify-between'>
                            <p className='font-blod'>Total:</p>
                            <p className='text-red-500 font-bold text-lg'>{cartTotal}</p>
                        </div>
                        <hr/>
                        <div>
                            <button
                            onClick={hdlOnPayment}
                            className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600'>PayNow</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SummaryCard