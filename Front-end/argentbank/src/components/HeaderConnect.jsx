import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';
import { fetchProfileSuccess, fetchProfileFailure } from '../actions/profileActions';
import { logout } from '../actions/loginActions';

debugger
function HeaderConnect() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);
  const token = useSelector((state) => state.login.token);
  console.log('Token from Login:', { token });

  //const [userName, setUserName] = useState("");

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
            const userName = userData && userData.userName;
            dispatch(fetchProfileSuccess(userData.body, userName));
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

  const handleLogout = () => {
    // Supprimer le token du store Redux en dispatchant l'action de déconnexion
    dispatch(logout());

    localStorage.removeItem('token');
  };

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
      <div className="nav_connect">
        <div className="main-nav-item">
          <FontAwesomeIcon icon={faUserCircle} />
          <p>{userData.userName}</p>
        </div>
        <div className="main-nav-item">
          <Link to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HeaderConnect;
