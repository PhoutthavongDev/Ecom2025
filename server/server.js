//Step1 import...
const express = require('express')
const app =express()
const morgan = require('morgan')
const { readdirSync} = require('fs')
const cors = require('cors')
//const authRouter = require('./routes/auth')
//const categoryRouter = require('./routes/category')
//middleware
app.use(morgan('dev'))
app.use(express.json({limit:'20mb'}))
app.use(cors())
//app.use('/api',authRouter)
//app.use('/api',categoryRouter)

readdirSync('./routes')
.map((c) => app.use('/api', require('./routes/'+c)))
//Step 3 Router
// app.post('/api',(req, res)=>{
//     //code
//     const { username, password } = req.body
//     console.log(username, password)
//     res.send('Jukkuu555+')
// })




//Step2 start server
app.listen(5000,()=> console.log('Server is running 0n port 5000'))









