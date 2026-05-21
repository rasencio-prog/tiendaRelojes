import React from 'react';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Offers from './components/Offers';
import SellWatch from './components/SellWatch';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Admin from './components/Admin';
import CartDrawer from './components/CartDrawer';
import './index.css';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Hero />
          <ProductList />
          <Offers />
          <SellWatch />
          <AboutUs />
          <Contact />
          <Admin />
          <CartDrawer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
