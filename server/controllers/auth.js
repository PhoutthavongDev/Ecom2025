const { json } = require("express")
const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    try{
        //code
        const { email, password } = req.body
        if(!email){
            //
            return res.status(400).json({ message : 'Email is required!!!'})
        }
        if(!password){
            //
            return res.status(400).json({ message : 'Password is required!!!'})
        }
        //step 2 check email in DB
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if (user) {
            return res.status(400).json({ message :"Email already exits!"})
        }
        //step 3 hashpassword

        const hashPassword = await bcrypt.hash(password, 10)

        //step4 Register
        await prisma.user.create({
            data:{
                email : email,
                password : hashPassword
            }
        })
        res.send('Register Success')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req,res)=>{
    //code
    try{
        //code
        const { email , password } = req.body

        //step 1 check email
       const user = await prisma.user.findFirst({
            where: {
                email : email
        }
       })
       if(!user || !user.enable) {
            return res.status(400).json({message : 'User is Not Found or Not Enable'})
       }
       //step 2 check password

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: 'Password Inalid!!!'})
        }
        
        //step3 create payload

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        //step4 Token
        jwt.sign(payload,process.env.SECRET,{expiresIn:'10d'},(err, token)=>{
            if(err) {
                return res.status(500).json({message :'Server Error'})
            }
            res.json({payload, token})
        })
    }catch(err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }

}

exports.currentUser = async (req,res)=>{

    try{
        //code
        const user = await prisma.user.findFirst({
            where:{
                email:req.user.email
            },select:{
                id:true,
                email:true,
                name:true,
                role:true
            }
        })
        res.json({user})
    }catch(err) {
        //err
        console.log(err)
        res.status(500),json({ message: "Server Error"})
    }

}