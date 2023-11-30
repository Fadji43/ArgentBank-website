import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/main.css';

function Welcome() {
  return (
    <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <Link to="/profile" className="main-nav-item">
          <button className="edit-button">Edit Name</button>    
        </Link>
    </div>
  )
};
export default Welcome;