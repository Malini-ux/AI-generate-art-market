import React from 'react';
//import{ useState,useEffect } from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';
import { useCart } from '../CartContext/CartContext';

const Card = ({ _id, name, prompt, photo }) => {

  const { addToCart} = useCart();

  const handleAddToCart = () => {
    
    const newItem = { _id, name, prompt, photo,quantity:1,price:10};
    addToCart(newItem);
  };
  return(
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div>{name[0]}</div>
          <p className="text-white text-sm font-bold">{name}</p>
        </div>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
        <button type="button" onClick={handleAddToCart} className="w-20 h-7 rounded-md object-cover bg-[#B5338A] flex justify-center items-center text-white text-xs font-bold">Add to cart</button>
      </div>
    </div>
  </div>
);
  }
export default Card;