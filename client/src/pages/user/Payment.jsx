import React, { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import { payment } from "../../api/Stripe";
const stripePromise = loadStripe("pk_test_51QopnmCOR1xnITx0vWxMeScnjEYwsyE8hwU60AqhkjtWYHVVy9RajHcKLnpbb0W8YJ8InZgHirusilZigYDBcjtg00gyixhSqJ")
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckOutForm";


const Payment = () => {
    const [clientSecret, setClientSecret] = useState('')
    const token = useEcomStore((state)=>state.token)


    useEffect(()=>{
      payment(token)
      .then((res)=>{
        console.log(res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => console.log(err))
    },[])


    const appearance = {
      them: 'Stripe',
    }
    const loader = 'auto'

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
              <CheckoutForm/> 
          </Elements>
        )


      }

    </div>
  )
}

export default Payment