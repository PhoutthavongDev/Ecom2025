import React,{useState} from 'react'
import axios, { Axios } from 'axios'
import { toast } from 'react-toastify';

const initialState = {
  email:"",
  password:"",
  confirmPassword:""
}


const Register = () => {
//javascript
  const [form, setForm] = useState(initialState)

  const handleOnChange = (e)=>{
    setForm({
      ...form, 
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match!!!')
    }
    console.log(form)
    //send to back
    try{
        const res = await axios.post('http://localhost:5000/api/register', form)

        console.log(res)
        setForm(initialState)
        toast.success(res.data)
     
    }catch(err){
      const errmsg = err.response?.data?.message
      toast.error(errmsg) 
      console.log(err)
    }
  }


  return (
    <div>
      Register
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
      confirmPassword
         <input className='border'
          onChange={handleOnChange}
          name='confirmPassword'
          type='text'
        />
        <button className='bg-blue-500 rounded-md'>Register</button>

      
      </form>
    </div>
  )
}

export default Register