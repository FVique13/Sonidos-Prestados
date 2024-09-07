import React from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de usar el nombre correcto de la importación

const UserMenu = () => {
  const { isLoggedIn, logout } = useAuth();

  // Obtener el token del almacenamiento
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  let user = null;
  let isAdmin = false;

  // Si hay un token, decodificarlo para obtener la información del usuario
  if (token) {
    console.log(token);
    try {
      user = jwtDecode(token);
      isAdmin = user.role[0] =="ADMIN"; // Ajusta esta propiedad según el contenido del token
      console.log(user);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <NavDropdown
          title={user ? `${user.nombre} ${user.apellido}` : 'Nombre Genérico'}
          id="user-menu-dropdown"
          align="end"
        >
          <NavDropdown.Item href="/profile">Mi perfil</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/' onClick={logout}>Cerrar sesión</NavDropdown.Item>
          {isAdmin && (
            <><NavDropdown.Divider />
            <NavDropdown.Item href="/admin">Administrar</NavDropdown.Item></>
          )}
        </NavDropdown>
      ) : (
        <div className="d-flex">
          <Button href="/login" variant="outline-primary">
            Iniciar sesión
          </Button>
          <Button href="/register" variant="outline-primary" className="ms-2">
            Crear Cuenta
          </Button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
