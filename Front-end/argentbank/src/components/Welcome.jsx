// Welcome.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch} from 'react-redux';
import { fetchUserData } from '../actions/profileActions.js';



function Welcome() {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
  });

  const [editableUsername, setEditableUsername] = useState('');

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
            username: userData.body.username,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
          });
          setEditableUsername(userData.body.username);
        } else {
          console.error('Erreur lors de la récupération des données utilisateur');
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
      }
    };

    fetchData();
  }, [dispatch, token]);


  return (
    <div className="header">
      <h1>Welcome back<br />{`${userData.firstName} ${userData.lastName}!`}</h1>
      <Link to="/profile" className="main-nav-item">
        <button className="edit-button">Edit Name</button>
      </Link>
    </div>
  );
}

export default Welcome;
