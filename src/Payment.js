// src/Payment.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    mobile: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ⚠️ Use the token key "token" as saved in localStorage by Login.js
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${API_BASE}/orders/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting payment:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return <div className="payment-success">✅ Payment processed. We will deliver your order soon!</div>;
  }

  return (
    <div className="payment-container">
      <h2>Enter Delivery Details</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <button type="submit">Make Payment</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Payment;
