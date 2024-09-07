import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Agrega estado para el token
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    return saved === 'true';
  });

  const login = (token, rememberMe) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setToken(token); // Guarda el token en el estado
      setIsLoggedIn(true);

      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(decodedToken));
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(decodedToken));
        sessionStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Limpia el estado del token
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  const fetchUser = async (email) => {
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

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setToken(token); // Establece el token en el estado
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

