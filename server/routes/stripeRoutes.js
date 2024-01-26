//stripe.js
import express from 'express';
import Stripe from 'stripe';  // Import the Stripe library
import * as dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
const app = express();
app.use(express.json());


app.post('/', async (req, res) => {
  const {products} = req.body
  console.log("Products",products)
  const lineItems = products.map((product)=>({
    price_data:{
        currency:"USD",
        product_data:{
            name:product.name,
            images:[product.photo],
            description:product.prompt
        },
        unit_amount:product.price*100,
    },
    quantity:product.quantity
}));  
const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://127.0.0.1:5173/success",
    cancel_url:"http://127.0.0.1:5173/cancel",
});
res.json({id:session.id})

})


export default app