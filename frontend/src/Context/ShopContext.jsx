import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('ShopProvider mounted');

    const fetchCartData = async () => {
      try {
        console.log('Fetching cart data...');
        const response = await axios.get('http://192.168.1.109:3000/api/cart/getcart', {
          headers: {
            'auth-token': `${localStorage.getItem('auth-token')}`,
          },
        });
        console.log('Cart data fetched:', response.data);
        setCartData(response.data);
        calculateTotalAmount(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axios.get('http://192.168.1.109:3000/api/user/profile', {
          headers: {
            'auth-token': `${localStorage.getItem('auth-token')}`,
          },
        });
        console.log('User data fetched:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorage.getItem('auth-token')) {
      fetchCartData();
      fetchUserData();
    }

    return () => {
      console.log('ShopProvider unmounted');
    };
  }, []);

  const getProductPriceById = async (itemId) => {
    try {
      const response = await axios.get(`http://192.168.1.109:3000/api/products/${itemId}`);
      return response.data.price;
    } catch (error) {
      console.error('Error fetching product price:', error);
      return 0;
    }
  };

  const calculateTotalAmount = async (cartData) => {
    console.log('Calculating total amount...');
    let total = 0;
    for (let [itemId, quantity] of Object.entries(cartData)) {
      const price = await getProductPriceById(itemId);
      total += quantity * price;
    }
    console.log('Total amount calculated:', total);
    setTotalAmount(total);
  };

  const addToCart = async (itemId) => {
    console.log('Adding to cart:', itemId);
    try {
      await axios.post('http://192.168.1.109:3000/api/cart/addtocart', { itemId }, {
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      });
      setCartData((prevCartData) => {
        const updatedCart = {
          ...prevCartData,
          [itemId]: (prevCartData[itemId] || 0) + 1,
        };
        calculateTotalAmount(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    console.log('Removing from cart:', itemId);
    try {
      await axios.post('http://192.168.1.109:3000/api/cart/removefromcart', { itemId }, {
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      });
      setCartData((prevCartData) => {
        const updatedCart = { ...prevCartData };
        if (updatedCart[itemId] > 1) {
          updatedCart[itemId] -= 1;
        } else {
          delete updatedCart[itemId];
        }
        calculateTotalAmount(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <ShopContext.Provider value={{ cartData, addToCart, removeFromCart, totalAmount, user }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
