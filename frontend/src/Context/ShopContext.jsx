import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

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

    if (localStorage.getItem('auth-token')) {
      fetchCartData();
    }

    return () => {
      console.log('ShopProvider unmounted');
    };
  }, []);

  const calculateTotalAmount = (cartData) => {
    console.log('Calculating total amount...');
    let total = 0;
    for (let [itemId, quantity] of Object.entries(cartData)) {
      total += quantity * 10; // Replace 10 with your getProductPriceById(itemId)
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
    <ShopContext.Provider value={{ cartData, addToCart, removeFromCart, totalAmount }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;






// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i < 300 + 1; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [all_product, setAll_product] = useState([]);
//   const [cartItem, setCartItem] = useState(getDefaultCart());

//   useEffect(() => {
//     fetch('http://192.168.1.109:3000/allproducts')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//         .then((data) => setAll_product(data))
//         .catch((error) => console.error('Error fetching all products:', error));

//     if (localStorage.getItem('auth-token')) {
//       fetch('http://192.168.1.109:3000/getcart', {
//         method: 'GET',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem('auth-token')}`,
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//           }
//           return response.json();
//         })
//         .then((data) => setCartItem(data))
//         .catch((error) => console.error('Error fetching cart items:', error));
//     }
//   }, []);

//   const addToCart = (itemId) => {
//     setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

//     if (localStorage.getItem('auth-token')) {
//       fetch('http://192.168.1.109:3000/addtocart', {
//         method: 'POST',
//         headers: {
//           'auth-token': `${localStorage.getItem('auth-token')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ itemId: itemId }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//           }
//           return response.json();
//         })
//         .then((data) => console.log(data))
//         .catch((error) => console.error('Error adding to cart:', error));
//     }
//   };

//   const removeaddToCart = (itemId) => {
//     setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

//     if (localStorage.getItem('auth-token')) {
//       fetch('http://192.168.1.109:3000/removefromcart', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem('auth-token')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ itemId: itemId }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//           }
//           return response.json();
//         })
//         .then((data) => console.log(data))
//         .catch((error) => console.error('Error removing from cart:', error));
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItem) {
//       if (cartItem[item] > 0) {
//         let itemInfo = all_product.find((product) => product.id === Number(item));
//         if (itemInfo) {
//           totalAmount += itemInfo.new_price * cartItem[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const getTotalcartItem = () => {
//     let totalItem = 0;
//     for (const item in cartItem) {
//       if (cartItem[item] > 0) {
//         totalItem += cartItem[item];
//       }
//     }
//     return totalItem;
//   };

//   const contextValue = { getTotalcartItem, getTotalCartAmount, all_product, cartItem, addToCart, removeaddToCart };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

