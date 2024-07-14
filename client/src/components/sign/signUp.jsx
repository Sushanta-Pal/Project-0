import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sign.css';

const SignUp = () => {
  const [input, setInput] = useState({ userName: '', email: '', password: '' });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (input.userName === '' || input.email === '' || input.password === '') {
      toast.warning('Please fill all the fields');
      setInput({ userName: '', email: '', password: '' });
    } else {
      try {
        const res = await axios.post(`${window.location.origin}/api/v1/signup`, input);
        alert(res.data.message);
        setInput({ userName: '', email: '', password: '' });
        navigate('/signin');
      } catch (error) {
        toast.error('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Join Us</h2>
        <form >
          <input
            type="text"
            name="userName"
            value={input.userName}
            onChange={change}
            placeholder="Fullname"
          />
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={change}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={change}
            placeholder="Password"
          />
          <button type="submit" onClick={addUser}>Sign up</button>
        </form>
        
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignUp;
