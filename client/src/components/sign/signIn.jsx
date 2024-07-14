import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sign.css';

function SignIn() {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const accessUser = async (e) => {
    e.preventDefault();
    if (input.email === '' || input.password === '') {
      toast.warning('Please fill all the fields');
      setInput({ email: '', password: '' });
    } else {
      try {
        const res = await axios.post(`${window.location.origin}/api/v1/signin`, input);
        if (res.data.message === "User not found, please sign up first" || res.data.message === "Password is incorrect, try again") {
          toast(res.data.message);
          setInput({ email: '', password: '' });
        } else {
          alert("Sign In successful");
          sessionStorage.setItem('id', res.data.others._id);
          setInput({ email: '', password: '' });
          dispatch(authActions.login());
          navigate('/todo');
        }
      } catch (error) {
        toast.error('Error signing in. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form >
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
          <button type="submit" onClick={accessUser}>Sign In</button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SignIn;
