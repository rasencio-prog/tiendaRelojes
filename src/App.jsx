import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Offers from './components/Offers';
import SellWatch from './components/SellWatch';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import './index.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <ProductList />
        <Offers />
        <SellWatch />
        <AboutUs />
        <Contact />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
