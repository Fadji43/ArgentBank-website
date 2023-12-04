import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsername } from '../actions/userNameActions'; 
import { fetchUserData } from '../actions/profileActions'

function Identify() {
  const [userData] = useState({
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
        // Utilisez fetchUserData au lieu de la requête POST manuelle
        dispatch(fetchUserData());
      } catch (error) {
        console.error('Erreur réseau :', error);
      }
    };
  
    fetchData();
  }, [dispatch, token]);
  

  const [editableUsername, setEditableUsername] = useState('');

const handleSave = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
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
        <button className="edit-button" type="button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Identify;
