import React, { useState } from 'react';

import './Register.css';

import { register } from '../../services/api';

export default function Register() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert("Registration successful! Please log in.");
    } catch (err) {
      console.log("Registration error:", err);
    }
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <input className='register-input' type="text" name="username" placeholder='Username' onChange={handleChange} />
        <input className='register-input' type="email" name="email" placeholder='Email' onChange={handleChange} />
        <input className='register-input' type="password" name="password" placeholder='Password' onChange={handleChange} />
        <button className='register-button' type='submit'>Register</button>
      </form>
    </div>
  );
}