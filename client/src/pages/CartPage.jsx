import React from 'react';
import { useCart } from '../CartContext/CartContext';
import { loadStripe } from "@stripe/stripe-js"; 

const CartPage = () => {
  const { cartItems, removeFromCart, adjustQuantity } = useCart();
  console.log(cartItems)
  // Function to handle quantity adjustment
  const handleAdjustQuantity = (itemId, newQuantity) => {
    adjustQuantity(itemId, newQuantity);
  
  };

  // Function to handle item deletion
  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Function to handle checkout
  const handleCheckout = async() => {
    const stripe = await loadStripe("STRIPE_PUBLISHED_KEY")
    const response = await fetch('http://localhost:8080/api/v1/create-checkout-session',{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({products:cartItems}) 
    });
    console.log("res",response)
    const session = await response.json();
    const result = stripe.redirectToCheckout({sessionId:session.id});
  
    if(result.error){console.log(result.error);}
  }
  return (
    <div>
      <h2 className="font-bold py-1">Cost for each poster is 10$</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="w-13 grid grid-cols-4 gap-1">
          {cartItems.map((item) => (
           
           <div key={item._id} className="w-15 bg-white p-4 rounded-md shadow-md flex">
           <img src={item.photo} alt={item.prompt} className="w-34 h-32 rounded-md" />
           <div className="flex flex-col ml-2 mt-1 p-3">
             <p className="font-bold">Name: {item.name}</p>
         
             <div className="flex items-center"> 

               <div className="quantity-adjustment flex items-center pt-3"> 
                 <button
                   className="w-8 quantity-button border-black font-bold border-t-2 border-b-2 border-l-2 rounded-l-md pr-1"
                   onClick={() => handleAdjustQuantity(item._id, item.quantity - 1)}
                 >
                   -
                 </button>
                 <span className="w-10 quantity-display border-black font-bold border-t-2 border-b-2 border-l-2 border-r-2 px-3 flex items-center">{item.quantity}</span>
                 <button
                   className="w-8 quantity-button border-black font-bold border-t-2 border-b-2 border-r-2 rounded-r-md"
                   onClick={() => handleAdjustQuantity(item._id, item.quantity + 1)}
                 >
                   +
                 </button>
               </div>
             </div>
         
             
             <button className="mt-3 -w-18 quantity-button border-black font-bold border-l-2 border-t-2 border-b-2 border-r-2 rounded-r-md rounded-l-md" onClick={() => handleDeleteItem(item._id)}>Delete</button>
           </div>
         </div>
         
        ))}
        </div>
      )}
      <div className="flex justify-center mt-19">
       <button className="mt-5 p-3 font-extrabold font-inter font-medium bg-[#B5338A] text-white px-2 py-3" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
      </div>
  );
};

export default CartPage;
