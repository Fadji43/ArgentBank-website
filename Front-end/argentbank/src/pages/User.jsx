import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderConnect from '../components/HeaderConnect';
import LayoutUser from '../components/LayoutUser';
import Welcome from '../components/Welcome';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { fetchProfileSuccess, fetchProfileFailure } from '../slices/profileSlice';
import { logout } from '../slices/authSlice'

function User() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const userData = useSelector((state) => state.profile.userData);
  console.log('userData in User component:', userData);
  const token = useSelector((state) => state.auth?.token);
  console.log('Token from Login:', { token });

  const handleUsernameUpdate = (newUsername) => {
    setUsername(newUsername); 
  };

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
            dispatch(fetchProfileSuccess({ userData, token }));
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
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <main>
        <HeaderConnect 
          handleLogout={handleLogout}
          onUsernameUpdate={handleUsernameUpdate} />
        <LayoutUser style={{ backgroundColor: '#12002b' }}>
          <Welcome userData={userData} userName={username} onUsernameUpdate={handleUsernameUpdate} />
          <Account />
          <Account />
          <Account />
        </LayoutUser>
        <Footer />
      </main>
    </div>
  );
}

export default User;