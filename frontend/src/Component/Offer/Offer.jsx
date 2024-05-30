import React from 'react'
import './Offer.css';
import exculsive_img from '../Assets/exclusive_image.png';
import { useNavigate } from 'react-router-dom';

const Offer = () => {
  
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/offers');
  };

  return (
    <div className='offers'>
      <div className="offer-left">
       <h1>Exclusive</h1>
       <h1>Offers For You</h1>
       <p>ONLY ON BEST SELLERS PRODUCT</p>
      <button onClick={handleNavigation}>Check Now</button>
      </div>
      <div className="offer-right">
        <img src={exculsive_img} alt='' />
      </div>
    </div>
  )
}

export default Offer
