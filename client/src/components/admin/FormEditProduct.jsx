import React,{useState, useEffect} from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct,readProduct,listProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'



const initialState = {
  
    title:"Amd ryzen99",
    description:"desc",
    price: 5000,
    quantity: 20,
    categoryId: '',
    images:[]

}


const FormEditProduct = () => {
    const{id} = useParams()
    const navigate = useNavigate()

  const token = useEcomStore((state)=>state.token)
  const getCategory = useEcomStore((state)=>state.getCategory)
  const categories = useEcomStore((state)=>state.categories)
  

  const [form, setForm] = useState(initialState)

  useEffect(()=>{
    getCategory()
   fetchProduct(token,id,form)
  },[])

  const fetchProduct = async(token,id,form)=>{
    try{
        //code
        const res = await readProduct(token, id,form)
        console.log('res from backend',res)
        setForm(res.data)
    }catch(err) {
        console.log('Err fetch data',err)
    }

  }
  console.log(form)


  const handleOnchange = (e) => {

    console.log(e.target.name, e.target.value)
    setForm({...form, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await updateProduct(token, id, form)
      console.log(res)
      toast.success(`Add Product ${res.data.title} Success`)
      navigate('/admin/product')
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <form onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <input 
          className='border'
          value={form.title}
          onChange={handleOnchange}
          placeholder='title'
          name='title'
        />
        <input 
          className='border'
          value={form.description}
          onChange={handleOnchange}
          placeholder='Description'
          name='description'
        />
        <input 
          className='border'
          type='number'
          value={form.price}
          onChange={handleOnchange}
          placeholder='price'
          name='price'
        />
        <input 
          className='border'
          type='number'
          value={form.quantity}
          onChange={handleOnchange}
          placeholder='quantity'
          name='quantity'
        />

        <select className='border' name='categoryId' onChange={handleOnchange} required value={form.categoryId}>

          <option value="" disabled>Please Select</option>
          {

            categories.map((item, index)=>

              <option key={index} value={item.id}>{item.name}</option>
            )
          }
        </select>
        <hr/>
        {/* Uploadfile     */}
        <Uploadfile form={form} setForm={setForm}/>

        <button className='bg-blue-500'>Edit Product</button>

        <hr/>
        <br/>
        
      </form>
    </div>
  )
}

export default FormEditProduct