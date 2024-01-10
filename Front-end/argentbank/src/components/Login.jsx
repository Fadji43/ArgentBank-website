import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../slices/authSlice';
import { loginFailure } from '../slices/profileSlice';
import '../css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setUserName] = useState(''); 
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    let token; // Déclarer la variable à un niveau plus élevé

    try {
      const data = await response.json();
    
      if (response.ok) {
        token = data.body && data.body.token;
        console.log('Token from Login:', { token });
        console.log('Server response:', data.body);
    
        // Vérifier si le token existe avant de l'utiliser
        if (token) {
          // Connexion réussie, dispatcher l'action pour mettre à jour le token dans le store Redux
          dispatch(setToken(token));
    
          // Naviguer vers la page /user
          navigate('/user');
        } else {
          // Afficher un message d'erreur à l'utilisateur
          alert('Identifiants incorrects');
          console.log('Alerte affichée');
        }
      } else {
        // Informations de connexion incorrectes, dispatcher l'action d'échec
        dispatch(loginFailure());
    
        // Afficher un message d'erreur à l'utilisateur
        alert('Identifiants incorrects');
        console.log('Alerte affichée');
      }
    
      // Condition pour stocker le token dans le localStorage si "Remember Me" est activé
      if (rememberMe && token) {
        localStorage.setItem('authToken', token);
      }
    
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      // Gérer les erreurs de connexion, par exemple, afficher un message d'erreur à l'utilisateur
    } finally {
      setRememberMe(false);
    }
  };
      
  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
         <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            { ' ' }Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
