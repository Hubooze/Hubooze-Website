import React, { useState, useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle automatic image sliding when hovered
  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.image.length);
      }, 1500); // Slide every 1.5 seconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Clean up the interval on unmount or when not hovered
  }, [isHovered, props.image.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + props.image.length) % props.image.length);
  };

  return (
    <div 
      className='item'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${props.id}`}>
        <div className='cart'>
          <span id='shopping_cart' className="material-symbols-outlined">add_shopping_cart</span>
        </div>

        {/* Image Display */}
        <img className='imagehandler' src={props.image[currentImageIndex]} alt={props.name} />

        {/* Dots Indicator */}
        {/* <div className="dots-container">
          {props.image.map((_img, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div> */}

        {/* Item Details */}
        <p className="item-name">{props.name}</p>
        <div className="item-prices-row">
          <div className="item-price-old">
            ₹{props.market_price}
          </div>
          <div className="item-price-new">
            <b>₹{props.selling_price}</b>
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default Item;