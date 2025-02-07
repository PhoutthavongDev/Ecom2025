const prisma = require("../config/prisma")
const stripe = require('stripe')('sk_test_51QopnmCOR1xnITx0smALWZyrD8rPaDNDE49IK6txOT6uz8NQBrpIavkbvuVS333TkhxfduvOYGL9IVWeqj1Cr7jy00pIGggTdi')

exports.payment = async(req, res)=>{

    try{
        //code
        const cart = await prisma.cart.findFirst({
            where:{
                orderById:req.user.id
            }
        })
        const amountTHB = cart.cartTotal * 100


        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountTHB,
            currency: "thb",

            automatic_payment_methods: {
                enabled:true,
            },
        })

        res.send({
            clientSecret: paymentIntent.client_secret,
        })

    }catch(err){
        console.log(err)
        res.status(500).json({message:'Server Error!!'})
    }


}