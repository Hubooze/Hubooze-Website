// client/src/components/RazorpayIntegration.js
import React from 'react';
import axios from 'axios';

const RazorpayIntegration = ({ amount, currency, receipt }) => {
  const handlePayment = async () => {
    const { data } = await axios.post('http://192.168.1.109:3000/api/payment/create', { amount, currency, receipt, paymentMethod: 'Prepaid' });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: data.order.id,
      handler: async (response) => {
        const paymentResult = await axios.post('http://192.168.1.109:3000/api/payment/verify', {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        alert(paymentResult.data.message);
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Your Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button onClick={handlePayment}>Pay with Razorpay</button>
  );
};

export default RazorpayIntegration;
