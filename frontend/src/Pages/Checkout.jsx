import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import './CSS/Checkout.css';

const Checkout = () => {
  const { cartData, totalAmount } = useContext(ShopContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/payment/create', {
        amount: totalAmount,
        currency: 'INR',
        receipt: 'receipt#1',
      });

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'Hubooze',
        description: 'Order Payment',
        order_id: response.data.id,
        handler: async function (response) {
          const verificationResponse = await axios.post('http://192.168.1.109:3000/api/payment/verify', {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            userId: 'USER_ID',  // Replace with actual user ID
            cartData,
          });
          console.log(verificationResponse.data);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: phone,
        },
        notes: {
          address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <div className="checkout-item">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="checkout-item">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="checkout-item">
          <label>Pincode:</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="checkout-summary">
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Checkout;