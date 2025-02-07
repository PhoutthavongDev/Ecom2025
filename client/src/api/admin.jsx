import axios from "axios";

export const getOrderAdmin = async(token)=>{


    return axios.get('http://localhost:5000/api/admin/orders',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

