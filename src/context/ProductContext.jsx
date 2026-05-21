import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('luxe_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing stored products", e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('luxe_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts(prev => {
      // Generate a simple ID for the local mock
      const newId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, { ...newProduct, id: newId }];
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
