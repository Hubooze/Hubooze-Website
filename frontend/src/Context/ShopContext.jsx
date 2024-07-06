import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaltCart = () => {
//   let cart = {};
//   for (let i = 0; i < 300+1; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };


// const ShopContextProvider = (props) => {
  
//   const [all_product,setAll_product]=useState([]);
//   const [cartItem, setCartItem] = useState(getDefaltCart());

//   useEffect(()=>{
//     fetch('http://localhost:4000/allproducts')
//     .then((response)=>response.json())
//     .then((data)=>setAll_product(data))

//     if(localStorage.getItem('auth-token')){
//       fetch('http://localhost:4000/getcart',{
//         method: 'GET',
//         headers: {
//           Accept:'application/form-data',
//           'auth-token':`${localStorage.getItem('auth-token')}`,
//           'Content-Type': 'application/json',
//         },
//         body:"",
//       }).then((response)=>response.json())
//         .then((data)=>setCartItem(data))
//     }

//   },[])

//   const addToCart = (itemId) => {
//     setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
     
//       if(localStorage.getItem('auth-token')) {
//         fetch('http://localhost:4000/addtocart', {
//           method: 'POST',
//           headers: {
//             'auth-token': `${localStorage.getItem('auth-token')}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             "itemId": itemId
//           })
//         })
//         .then((response) => response.json()) 
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//       }
//   };
  

//   const removeaddToCart = (itemId) => {
//     setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if(localStorage.getItem('auth-token'))
//     {
//       fetch('http://localhost:4000/removefromCart',{
//         method:'POST',
//         headers:{
//            Accept:'application/form-data',
//            'auth-token':`${localStorage.getItem('auth-token')}`,
//            'Content-Type':'application/json',
//         },
//         body:JSON.stringify({
//          "itemId":itemId})
//       })
//       .then((response)=>response.json()) 
//       .then((data)=>{
//         console.log(data)
//       })
//     }
//   };

//   const getTotalCartAmount=()=>{
//     let totalAmont=0;
//     for( const item in cartItem)
//     {
//       if(cartItem[item]>0)
//       {
//             let iteminfo=all_product.find((product)=>product.id===Number(item))
//             totalAmont+=iteminfo.new_price*cartItem[item]
//       }
      
//     }
//     return totalAmont;
//   }

//   const getTotalcartItem=()=>{
//     let totalitem=0;
//     for(const item in cartItem)
//     {
//       if(cartItem[item]>0)
//       {
//         totalitem+=cartItem[item];
//       }
//     }
//     return totalitem;

//   }

//   const contextValue = {getTotalcartItem,getTotalCartAmount,all_product, cartItem, addToCart, removeaddToCart };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };
// export default ShopContextProvider;


// import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://192.168.1.109:3000/allproducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => setAll_product(data))
      .catch((error) => console.error('Error fetching all products:', error));

    if (localStorage.getItem('auth-token')) {
      fetch('http://192.168.1.109:3000/getcart', {
        method: 'GET',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => setCartItem(data))
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://192.168.1.109:3000/addtocart', {
        method: 'POST',
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  const removeaddToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://192.168.1.109:3000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error('Error removing from cart:', error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalcartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = { getTotalcartItem, getTotalCartAmount, all_product, cartItem, addToCart, removeaddToCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

