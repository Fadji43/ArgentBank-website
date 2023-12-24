import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/main.css';
import { fetchProfileSuccess, fetchProfileFailure } from '../actions/profileActions';

function Welcome() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);
  const token = useSelector((state) => state.profile.token);
  console.log('Token from login:', token);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const { firstName, lastName } = userData.body;
            dispatch(fetchProfileSuccess(userData.body, firstName, lastName));
          } else {
            dispatch(fetchProfileFailure('Erreur lors de la récupération des données utilisateur'));
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
          dispatch(fetchProfileFailure(`Erreur réseau : ${error.message}`));
        }
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
