import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername, updateUsernameRequest } from '../actions/userNameActions';
import { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure } from '../actions/profileActions';
import '../css/main.css';
import { Link, useNavigate } from 'react-router-dom';

export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProfileRequest());

    try {
      // Récupérez le token depuis le Redux store
      const token = getState().token;  // Assurez-vous que 'token' correspond à la clé dans votre état global

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(fetchProfileSuccess(userData.body));
      } else {
        dispatch(fetchProfileFailure('Erreur lors de la récupération des données utilisateur'));
      }
    } catch (error) {
      dispatch(fetchProfileFailure('Erreur réseau :', error));
    }
  };
};

function Identify() {
  const userData = useSelector((state) => state.profile.userData);
  const [editableUsername, setEditableUsername] = useState(userData.userName || ''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer le token depuis le store Redux
  const token = useSelector((state) => state.token); 
  console.log('Token:', token);

  useEffect(() => {
    if (userData.userName) {
      setEditableUsername(userData.userName);
    }

    dispatch(fetchData());
  }, [dispatch, userData.userName, token]); 

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

        if (updatedUserData.username !== userData.userName) {
          console.log('Le nom d\'utilisateur a été modifié avec succès.');
          dispatch(updateUsername(updatedUserData.username));
          navigate('/user');
        } else {
          console.log('Le nom d\'utilisateur n\'a pas été modifié.');
        }
      } else {
        console.error('Erreur lors de la mise à jour du nom d\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
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
