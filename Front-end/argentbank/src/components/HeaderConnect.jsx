import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import { logout } from '../slices/profileSlice';
import { setUsername } from '../slices/usernameSlice';

const mapStateToProps = (state) => {
  return {
    userData: state.profile.userData,
  };
};

function HeaderConnect({ userData, onUsernameUpdate  }) {
  const userName = userData?.body?.userName;
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const newUsername = userData?.body?.userName;
    if (newUsername) {
      console.log('Nouveau nom d\'utilisateur:', newUsername);
      dispatch(setUsername({
        loading: false,
        error: null,
        userData: { userName: newUsername },
      }));

      // Appeler la fonction de mise à jour du nom d'utilisateur dans le composant Welcome
      onUsernameUpdate(newUsername);
    }
  }, [userData, dispatch, onUsernameUpdate]);

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

      {userName ? (
        <div className="nav_connect">
          <div className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            <p>{userName}</p>
          </div>
          <div className="main-nav-item">
            <Link to="/" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignOut} />
              {' '} Sign Out
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

// Connectez le composant au store Redux
export default connect(mapStateToProps)(HeaderConnect);
