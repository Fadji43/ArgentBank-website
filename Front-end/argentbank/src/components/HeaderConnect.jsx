import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';
import { fetchProfileData } from '../actions/profileActions';

function HeaderConnect() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const logout = () => {
    // Efface le token du localStorage pour déconnexion
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
          <p>{userData.userName}</p>
      </div>
      <div className="main-nav-item">
        <Link to="/"  onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} />
          Sign Out
        </Link>
      </div>
      </div>
    </nav>
  );
}

export default HeaderConnect;
