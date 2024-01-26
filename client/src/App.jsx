import {React,useEffect} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { logo,cartIcon } from './assets';
import { Home, CreatePost, CartPage } from './pages';
import { Success, Cancel } from './components';
import { CartProvider, useCart } from './CartContext/CartContext'; // Import the CartProvider
const App = () => {
  const { cartItems = [], addToCart, removeFromCart, adjustQuantity } = useCart();
  useEffect(() => {
    console.log('Cart Items length:', cartItems.total_unique_items);
  }, [cartItems]);
  return (
    <CartProvider>
      <Router>
        <header className="w-full flex">
          <div className="w-full gap-3 flex items-center bg-[#B5338A] border-b border-b-[#e6ebf4] font-medium bg-[#B5338A] text-white px-2 py-3 rounded-m">
          <Link to="/" className="bg-white font-bold text-black px-5 py-1 text-center">
          Gallery
          </Link>

          
            <Link to="/create-post" className="bg-white font-bold text-black px-5 py-1 text-center">
              Create
            </Link>
            </div>
            <div className="flex justify-end py-2 px-1  bg-[#B5338A]">
            <Link to="/cart">
            <img src={cartIcon} alt="cartIcon" className="w-13 h-10 mr-4" />
            </Link>
            </div>
        
        </header>

        <main className="sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home cartItems={cartItems} addToCart={addToCart} />}/>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} adjustQuantity={adjustQuantity} />} />
            <Route  path='/success' element={<Success />}/>
            <Route  path='/cancel' element={<Cancel />}/>
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
};

export default App;
