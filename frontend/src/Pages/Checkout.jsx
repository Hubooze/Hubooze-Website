import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import './CSS/Checkout.css';

const Checkout = () => {
  const { cartData, totalAmount } = useContext(ShopContext);
  const [userId, setUserId] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.1.109:3000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        
        const user = response.data;
        setUserId(user._id);
        setName(user.name || '');
        setEmail(user.email || '');
        setAddress(user.address || '');
        setPhone(user.phone || '');
        setPincode(user.pincode || '');
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://192.168.1.109:3000/api/payment/create', {
        amount: totalAmount,
        currency: 'INR',
        receipt: 'receipt#1',
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
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
            userId,  // Replace with actual user ID
            cartData,
          });
        //   console.log(verificationResponse.data);
        // },
        const delhiveryResponse = await axios.post('http://192.168.1.109:3000/api/shipping/create-shipment', {
          address,
          phone,
          pincode,
          cartData,
          orderId: response.razorpay_order_id,
        });

        await axios.post('http://192.168.1.109:3000/api/shipping/send-confirmation-email', {
          userId,
          orderId: response.razorpay_order_id,
          email: email, // Assuming email is also fetched with user data
          address,
          pincode,
          phone,
          shippingDetails: delhiveryResponse.data,
        });
      },
        prefill: {
          name: name,
          email: email,
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