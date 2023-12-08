import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsername } from '../actions/userNameActions'; 
import { Link } from 'react-router-dom';

function Identify() {
  const [userData, setUserData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
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
            userName: userData.body.userName,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
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

  const [editableUsername, setEditableUsername] = useState('');

  const handleSave = async () => {
    try {
      // Récupérer le jeton JWT depuis le localStorage
      const jwtToken = localStorage.getItem('token');
  
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,  // Ajout du jeton JWT dans l'en-tête
        },
        body: JSON.stringify({
          userName: editableUsername,
        }),
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
  
        // Comparer le nouveau nom d'utilisateur avec l'ancien
        if (updatedUserData.username !== userData.userName) {
          // Le nom d'utilisateur a été modifié avec succès
          console.log('Le nom d\'utilisateur a été modifié avec succès.');
  
          // Dispatchez l'action pour mettre à jour le nom d'utilisateur dans le store Redux
          dispatch(updateUsername(updatedUserData.username));
        } else {
          console.log('Le nom d\'utilisateur n\'a pas été modifié.');
        }
      } else {
        console.error("Erreur lors de la mise à jour du nom d'utilisateur");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  

  
  return (
<div>
  <h1>Edit user info</h1>
  <div className='formulaire'>
    <form className="info">
      <div className="form-row">
        <label>
          User name :
          <input
            type="text"
            name="username"
            value={editableUsername}
            onChange={(e) => setEditableUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          First name :
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            disabled
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Last Name :
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            disabled
          />
        </label>
      </div>
      <div className="buttons">
        <button className="edit-button" type="button" onClick={handleSave}>
          Save
        </button>
        <Link to="/user" href="./index.html">
          <button className="edit-button" type="button">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>

  );
}

export default Identify;
