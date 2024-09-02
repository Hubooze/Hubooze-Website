import React, { useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (products) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.image.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + products.image.length) % products.image.length);
  };

  const calculateDiscountPercentage = (newPrice, oldPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  return (
    <div className='item'>
    <Link to={`/product/${products._id}`}>
     <div className='cart' >
     <span id='shopping_cart' className="material-symbols-outlined">add_shopping_cart</span>
     {/* <span id='like' className="material-symbols-outlined">favorite</span> */}
     </div>
      <div className='card_arrows'>
        <div id='arrow_back' className="material-symbols-outlined" onClick={handlePrevImage}>chevron_left</div>
        <div id='arrow_forward' className="material-symbols-outlined" onClick={handleNextImage}>chevron_right</div>
      </div>
      <img className='imagehandler' src={products.image[currentImageIndex]} alt='' />
      <div className="dots-container">
        {products.image.map((_, index) => (
          <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(index)}></span>
        ))}
      </div>
      <p className="item-name">{products.name}</p>
      <div className="item-prices-row">
        <div className="item-price-new font-size"><b>₹{products.market_price}</b></div>
        <div className="item-price-old font-size">₹{products.selling_price}</div>
        <div className="discount-percentage font-size">{calculateDiscountPercentage(products.market_price, products.selling_price)}% off</div>
      </div>
      </Link>
    </div> 
  );
}

export default Item;
