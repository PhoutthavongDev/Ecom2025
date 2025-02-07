
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../Layouts/Layout'
import LayoutAdmin from '../Layouts/LayoutAdmin'
import LayoutUser from '../Layouts/LayoutUser'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import HomeUser from '../pages/user/HomeUser'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import ManageOrder from '../pages/admin/ManageOrder'

const router = createBrowserRouter([
    {path:'/', element:<Layout/>,
        children:[
                {index:true, element:<Home/>},
                {path:'shop', element:<Shop/>},
                {path:'cart', element:<Cart/>},
                {path:'checkout', element:<Checkout/>},
                {path:'login', element:<Login/>},
                {path:'register', element:<Register/>},
        ]
    },
    {
        path:'/admin', element:
        <ProtectRouteAdmin 
        element={ <LayoutAdmin/>} 
        />
       ,
        children:[
                {index:true,element:<Dashboard/>},
                {path:'category',element:<Category/>},
                {path:'product',element:<Product/>},
                {path:'product/:id',element:<EditProduct/>},
                {path:'manage',element:<Manage/>},
                {path:'orders',element:<ManageOrder/>},
            
        ]
    },
    {
        path:'/user', 
        //element:<LayoutUser/>,
        element:<ProtectRouteUser element={<LayoutUser />}/>,
        children:[
                {index:true,element:<HomeUser/>},
                {path:'Payment',element:<Payment/>},
                {path:'history', element:<History/>},
     
        ]
    }

])




const Approutes = () => {

  
  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}



export default Approutes