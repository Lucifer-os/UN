import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        try {
          const cartData = await cartService.getCart();
          setCart(cartData);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.updateQuantity(productId, quantity);
      setCart(updatedCart);
      toast.success('Cart updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from cart');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const updatedCart = await cartService.clearCart();
      setCart(updatedCart);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 