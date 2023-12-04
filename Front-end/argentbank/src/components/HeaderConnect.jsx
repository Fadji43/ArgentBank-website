import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';

function HeaderConnect() {
  const [userData, setUserData] = useState({
    firstName: '',
  });

  // Utilisez le hook useDispatch pour dispatcher des actions Redux
  const dispatch = useDispatch();
 

  // Récupérer le token depuis le localStorage une seule fois au début du composant
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData({
            firstName: userData.body.firstName,
          });
        } else {
          console.error('Erreur lors de la récupération des données utilisateur');
          // Gérer l'erreur de manière conviviale, par exemple afficher un message à l'utilisateur
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
        // Gérer l'erreur de manière conviviale, par exemple afficher un message à l'utilisateur
      }
    };

    fetchData();
  }, [dispatch, token]);

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
      <div className="nav-gap">
        <div className="main-nav-item">
          <FontAwesomeIcon icon={faUserCircle} />
          <p>{userData.firstName}</p>
        </div>
        <div className="main-nav-item" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} />
          Sign Out
        </div>
      </div>
    </nav>
  );
}

export default HeaderConnect;
