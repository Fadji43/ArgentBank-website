import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../actions/loginActions';

const Login = () => {
  const [email, setUserName] = useState(''); 
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    try {
      const data = await response.json();
      
      if (response.ok) {
        const token = data.body && data.body.token;
    
        // Vérifier si le token existe avant de l'utiliser
        if (token) {
          // Connexion réussie, dispatcher l'action pour mettre à jour l'état global
          dispatch(loginSuccess(token));
    
          // Enregistrer le token dans le local storage
          localStorage.setItem('token', token);
    
          // Rediriger ou effectuer d'autres actions nécessaires
          window.location.href = '/user';
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
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      // Gérer les erreurs de connexion, par exemple, afficher un message d'erreur à l'utilisateur
    }
  };    


  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
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
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="button" onClick={handleLogin}>
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
