import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsernameSuccess,  updateUsernameFailure } from '../slices/usernameSlice';

function Welcome({ userData }) {
  const { firstName, lastName, userName } = userData && userData.body ? userData.body : {};
  const [editableUsername, setEditableUsername] = useState(userName || '');  // Initialisation avec userName
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.token);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mettre à jour editableUsername lorsque userData change
    setEditableUsername(userName || '');
  }, [userName]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


  const handleSave = async (e) => {
    e.preventDefault();

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
        const newUserName = updatedUserData.body.userName;

        if (newUserName !== userName) {
          console.log(updatedUserData);
          dispatch(updateUsernameSuccess({
            userData: updatedUserData,
      
          }));

          // Dispatch l'action setUsername avec le nouveau nom d'utilisateur
        //dispatch(setUsername(updatedUserData.body.userName));

              // Appeler la fonction de mise à jour du nom d'utilisateur dans le composant parent (User)
              //onUsernameUpdate(updatedUserData.body.userName);
              console.log('Welcome: Nouveau nom d\'utilisateur détecté -', newUserName);
        }
      } else {
        console.error('Erreur lors de la mise à jour du nom d\'utilisateur');
        dispatch(updateUsernameFailure('Erreur lors de la mise à jour du nom d\'utilisateur'));
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      dispatch(updateUsernameFailure('Erreur réseau : ' + error.message));
    } finally {
      setIsEditing(false);
    }
  };

  return ( 
    <div>
      {isEditing ? (
        <div>
          <h1>Edit user info</h1>
          <div className='formulaire'>
            <form className="info" onSubmit={handleSave}>
              <div className="form-row">
                <label>
                  User name:
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
                <button className="edit-button" type="submit">
                  Save
                </button>
                <button className="edit-button" type="button" onClick={toggleEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={toggleEdit}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  );
}

export default Welcome;