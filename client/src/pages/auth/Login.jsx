import React,{useState} from 'react'
import axios, { Axios } from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
//javascript

  const navigate = useNavigate()
  const actionLogin = useEcomStore((state)=>state.actionLogin)

  const user = useEcomStore((sate)=>sate.user)
  console.log('user form zustan', user)

  const [form, setForm] = useState({
    email:"",
    password:"",
  })

  const handleOnChange = (e)=>{
    setForm({
      ...form, 
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await actionLogin(form)
      console.log('res',res)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome Back')
    }catch(err){
      const errmsg = err.response?.data?.message
      toast.error(errmsg)
      console.log(err)
    }
   
  }


  const roleRedirect = (role)=>{

    if(role === 'admin') {
      navigate('/admin')
    }else {
      navigate(-1)
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>


      Email
        <input className='border'
          onChange={handleOnChange}
          name='email'
          type='email'
        
        />
      Password
        <input className='border'
          onChange={handleOnChange}
          name='password'
          type='text'
        
        />
        <button className='bg-blue-500 rounded-md'>Login</button>

      
      </form>
    </div>
  )
}

export default Login