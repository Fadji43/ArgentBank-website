import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import { logout } from '../slices/profileSlice';
import '../css/main.css';

function HeaderConnect({ userData }) {
  const userName = userData?.body?.userName; 

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Supprimer le token du store Redux en dispatchant l'action de déconnexion
    dispatch(logout());
    localStorage.removeItem('token');
  };

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
      <div className="nav_connect">
        <div className="main-nav-item">
          <FontAwesomeIcon icon={faUserCircle} />
          <p>{userName}</p>
        </div>
        <div className="main-nav-item">
          <Link to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            {' '} Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HeaderConnect;
