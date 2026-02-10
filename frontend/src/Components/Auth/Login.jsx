import React, { useState } from 'react';
import './Register.css';
import { login } from '../../services/api';

export default function Login() {

  const [formData, setFormData] = useState({
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
      const {data} = await login(formData);
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('userID', data.userID);

      alert("Login successful! Welcome back.");
    } catch (err) {
      console.log("Login error:", err);
    }
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <input className='register-input' type="email" name="email" placeholder='Email' onChange={handleChange} />
        <input className='register-input' type="password" name="password" placeholder='Password' onChange={handleChange} />
        <button className='register-button' type='submit'>Login</button>
      </form>
    </div>
  );
}