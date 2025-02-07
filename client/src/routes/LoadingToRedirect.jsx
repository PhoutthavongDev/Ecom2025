import React,{useEffect,useState} from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        const intervel = setInterval(()=>{
            setCount((currentCount)=>{
                    if(currentCount===1) {
                        clearInterval(intervel)
                        setRedirect(true)
                    }
                    return currentCount - 1
            })

        },1000)


        return ()=> clearInterval(intervel)
    },[])

    if(redirect) {
        return <Navigate to={'/'} />
    }
  return (
    <div>No Permission Redirect in {count}</div>
  )
}

export default LoadingToRedirect