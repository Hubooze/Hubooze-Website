// import React from 'react'
// import './Item.css'
// import { Link } from 'react-router-dom'
// const item = (props) => {
//   return (
//     <div className='item'>
//      <Link to={`/product/${props.id}`}><img className='imgehandler' onClick={window.scrollTo(0,0)} src={props.image}  alt=''/></Link> 
//       <p>{props.name}</p>
//       <div className="item-prices">
//         <div className="item-price-new">
//         ₹{props.new_price}
//         </div>
//         <div className="item-price-old">
//         ₹{props.old_price}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default item

import React, { useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + props.images.length) % props.images.length);
  };

  const calculateDiscountPercentage = (newPrice, oldPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  return (
    <div className='item'>
    <Link to={`/product/${props.id}`}>
     <div className='cart' >
     <span id='shopping_cart' className="material-symbols-outlined">add_shopping_cart</span>
     {/* <span id='like' className="material-symbols-outlined">favorite</span> */}
     </div>
      <div className='card_arrows'>
        <div id='arrow_back' className="material-symbols-outlined" onClick={handlePrevImage}>chevron_left</div>
        <div id='arrow_forward' className="material-symbols-outlined" onClick={handleNextImage}>chevron_right</div>
      </div>
      <img className='imgehandler' src={props.images[currentImageIndex]} alt='' />
      <div className="dots-container">
        {props.images.map((_, index) => (
          <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(index)}></span>
        ))}
      </div>
      <p className="item-name">{props.name}</p>
      <div className="item-prices-row">
        <div className="item-price-new font-size"><b>₹{props.new_price}</b></div>
        <div className="item-price-old font-size">₹{props.old_price}</div>
        <div className="discount-percentage font-size">{calculateDiscountPercentage(props.new_price, props.old_price)}% off</div>
      </div>
      </Link>
    </div> 
  );
}

export default Item;
