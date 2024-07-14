import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to TaskMaster!</h1>
        <h2>Make Your Day Awesome by Arranging Your Day
        Are you ready to boost your productivity and take 
        control of your day? TaskMaster is here to help you
         organize your tasks, manage your time, and achieve
          your goals effortlessly</h2>
        <button onClick={() => navigate('/todo')}>make todo</button>
      </div>
    </div>
  );
}

export default Home;
