import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';

function HeaderConnect() {
  return (
<nav className="main-nav">
      <Link to="/" className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="nav-gap">
        <Link to="/" className="main-nav-item" href="./user.html">
          <FontAwesomeIcon icon={faUserCircle} />  
          Tony
        </Link>
        <Link to="/signin" className="main-nav-item">
          <FontAwesomeIcon icon={faSignOut} />
          Sign Out
        </Link>
      </div>
    </nav>
    );
  }
      
export default HeaderConnect;