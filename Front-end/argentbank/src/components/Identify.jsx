import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { updateUsername } from '../actions/userNameActions';

function Identify() {
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
            'authorization': `bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData({
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
          setEditableUsername(userData.username);
        } else {
          console.error('Erreur lors de la récupération des données utilisateur');
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          newUsername: editableUsername,
        }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        // Dispatchez l'action pour mettre à jour le nom d'utilisateur dans le store Redux
        dispatch(updateUsername(updatedUserData.username));
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
                onChange={(e) => setEditableUsername(e.target.value)} // Gérer les changements dans le champ d'édition
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
