import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';

function Header() {
  return (
<nav class="main-nav">
      <Link to="/" class="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/" class="main-nav-item" href="./user.html">
          <FontAwesomeIcon icon={faSignOut} />  
          Tony
        </Link>
        <Link to="/signin" className="main-nav-item">
          <FontAwesomeIcon icon={faUserCircle} />
          Sign Out
        </Link>
      </div>
    </nav>
    );
  }
      
export default Header;