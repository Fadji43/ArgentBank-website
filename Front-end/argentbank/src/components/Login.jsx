import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, loginFailure } from '../slices/authSlice';
import '../css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.body && data.body.token;

        if (token) {
          dispatch(setToken(token));
          navigate('/user');
        } else {
          alert('Identifiants incorrects');
          
        }
      } else {
        dispatch(loginFailure());
        setLoginFailed(true);
      }

      if (rememberMe && data.body && data.body.token) {
        localStorage.setItem('authToken', data.body.token);
        console.log('localStorage', data.body.token);
      }

    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      alert('Erreur de connexion');
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
              onChange={(e) => setEmail(e.target.value)}
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
        {loginFailed && (
          <div className="login-failed-line">
            <p>Identifiants ou mot de passe incorrects</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
