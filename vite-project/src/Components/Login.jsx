// Login.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox "Recordar para el futuro"

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked); // Actualiza el estado cuando el usuario selecciona/desselecciona el checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!emailError && email && password) {
      try {

        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (response.ok) {
          const { token } = await response.json(); // Espera el token
  
          if (token) {
            // Llama a la función login del AuthContext y pasa el token y el valor de rememberMe
            login(token, rememberMe);
  
            setLoginMessage('Inicio de sesión exitoso');
            navigate('/'); // Redirige al usuario a la página principal o al destino deseado
          } else {
            setLoginMessage('No se recibió el token.');
          }
        } else {
          const error = await response.text();
          setLoginMessage(error);
        }
      } catch (error) {
        setLoginMessage('Error en la conexión con el servidor.');
      }
    } else {
      setLoginMessage('Por favor, corrige los errores antes de enviar.');
    }
  };
  
  

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setLoginMessage('');
    setRememberMe(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark text-white" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../public/images/logos/hero.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="card p-5" style={{ maxWidth: '450px', width: '100%', borderRadius: '30px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresá tu email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
            />
            {emailError && <div className="text-danger mt-2">{emailError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresá tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
          </div>
          <div className="d-flex flex-column justify-content-between mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange} // Manejador para el checkbox "Recordar para el futuro"
              />
              <label className="form-check-label" htmlFor="remember">Recordar para el futuro</label>
            </div>
            <a href="#" className="text-white">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            <button type="submit" className="btn btn-dark">Aceptar</button>
          </div>
        </form>
        {loginMessage && <div className="mt-3 text-center login-msg">{loginMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
