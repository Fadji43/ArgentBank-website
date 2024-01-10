import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsernameSuccess, updateUsernameRequest, updateUsernameFailure } from '../slices/usernameSlice';

import '../css/main.css';
import { Link, useNavigate } from 'react-router-dom';

function Identify({ userData }) {
  const { firstName, lastName, userName } = userData && userData.body ? userData.body : {};
  const [editableUsername, setEditableUsername] = useState(userName || '');  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.token);
  console.log('Token from Redux:', token);

  const handleSave = async () => {
    dispatch(updateUsernameRequest());
  
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: editableUsername,
        }),
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
  
        if (updatedUserData.username !== userName) {
          console.log('Le nom d\'utilisateur a été modifié avec succès.');
          dispatch(updateUsernameSuccess({
            userData: updatedUserData,
            token: token,
          }));
  
          navigate('/user');
        } else {
          console.log('Le nom d\'utilisateur n\'a pas été modifié.');
        }
      } else {
        console.error('Erreur lors de la mise à jour du nom d\'utilisateur');
        dispatch(updateUsernameFailure('Erreur lors de la mise à jour du nom d\'utilisateur'));
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      dispatch(updateUsernameFailure('Erreur réseau : ' + error.message));
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
                value={firstName}
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
                value={lastName}
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
