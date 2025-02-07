import React,{useState, useEffect} from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';


const initialState = {
  
    title:"",
    description:"",
    price: 0,
    quantity: 0,
    categoryId: '',
    images:[]

}


const FormProduct = () => {

  const token = useEcomStore((state)=>state.token)
  const getCategory = useEcomStore((state)=>state.getCategory)
  const categories = useEcomStore((state)=>state.categories)
  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)

  const [form, setForm] = useState({
    title:"",
    description:"",
    price: 0,
    quantity: 0,
    categoryId: '',
    images:[]
  })

  useEffect(()=>{
    getCategory()
    getProduct(10)
  },[])
  //console.log(categories)


  const handleOnchange = (e) => {

    console.log(e.target.name, e.target.value)
    setForm({...form, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await createProduct(token, form)
      console.log(res)
      setForm(initialState)
      toast.success(`Add Product ${res.data.title} Success`)
      getProduct()
    }catch(err) {
      console.log(err)
    }
  }
  const handleDelete = async (id)=>{
  
    if(window.confirm('Delete Product?')){
       try{
        //code
        const res = await deleteProduct(token,id)
        console.log(res)
        toast.success('Deleted product Success')
        getProduct()
       }catch(err){
        console.log(err)
       }

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

        <button className='bg-blue-500 p-2 rounded-md shadow-md hover:scale-110 hover:translate-y-1 hover:duration-200
        '>Add Product</button>
        <hr/>
        <br/>
        
      <table className="table w-full border">
      <thead className='justify-between'>
      <tr className='bg-gray-200 border'>
      <th scope="col">No.</th>
      <th scope="col">Image</th>
      <th scope="col">Name Product</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Sold</th>
      <th scope="col">UpdatedAt</th>
      <th scope="col">Management</th>
      </tr>
    </thead>
    <tbody>
      {
        products.map((item, index)=>{
            //console.log(item)
            return (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  {
                    item.images.length > 0
                    ? <img src={item.images[0].url} className='w-24 h-24 rounded-lg shadow-md hover:scale-110'/>
                    :<div className='w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center shadow-sm'>
                      No Images</div>
                  }
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.sold}</td>
                <td>{item.updatedAt}</td>
                <td className='flex gap-2'>
                  <p className='bg-yellow-500 rounded-md p-1 shadow-md hover:scale-110 hover:translate-y-1 hover:duration-200'>
                    <Link to={'/admin/product/'+item.id}> <Pencil /> </Link></p>
                  <p
                  className='bg-red-500 rounded-md p-1 shadow-md hover:scale-110 hover:translate-y-1 hover:duration-200'
                  onClick={()=>handleDelete(item.id)}
                  
                  > <Trash2 /></p>
                </td>
                </tr>

            )
        })
      }
     
        </tbody>
        </table>


      </form>
    </div>
  )
}

export default FormProduct