import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de usar el nombre correcto de la importación
import { useAuth } from '../../context/AuthContext';

const MisDatos = () => {
  const { token, fetchUser } = useAuth(); // Asegúrate de que `token` esté disponible en el contexto
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id_usuario: '', // Este campo no parece estar en el token
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '', // Este campo no parece estar en el token
    contraseña: '',
    rol: ''
  });
  const [originalPassword, setOriginalPassword] = useState(''); // Este campo no está en el token

  useEffect(() => {
    console.log(token); // Asegúrate de que el token esté presente en la consola
    if (token) {
      try {
        // Decodifica el token JWT
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Asegúrate de que los datos del usuario estén presentes en la consola

        // Extrae los datos del usuario desde el token decodificado
        setUserData({
          id_usuario: '', // Este campo no parece estar en el token
          nombre: decodedToken.nombre || '',
          apellido: decodedToken.apellido || '',
          correo: decodedToken.sub || '', // Usar `sub` para el correo electrónico
          direccion: '', // Este campo no está en el token
          contraseña: '', // Deja este campo vacío para la edición
          rol: (decodedToken.role && decodedToken.role.length > 0) ? decodedToken.role[0] : '' // Ajustar el rol
        });
        setOriginalPassword(''); // Este campo no está en el token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Preparar el cuerpo de la solicitud, excluyendo la contraseña si no ha cambiado
      const body = {
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.correo,
        direccion: userData.direccion,
        esAdmin: userData.rol === 'ADMIN' // Ajustar la lógica según el rol
      };

      if (userData.contraseña.trim() !== '') {
        body.contraseña = userData.contraseña;
      } else {
        body.contraseña = originalPassword; // Mantén la contraseña original si no se ha cambiado
      }

      const response = await fetch(`http://localhost:8080/api/usuarios/${userData.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envía el token en el encabezado
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        await fetchUser(); // Actualiza el contexto con la información más reciente del usuario
        setIsEditing(false);
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Mis Datos</h2>
          <Button
            variant="primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        </div>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={userData.apellido}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={userData.correo}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={userData.direccion}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contraseña"
                  value={userData.contraseña}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                <Form.Text className="text-muted">
                  Deja el campo vacío si no deseas cambiar la contraseña.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="text"
                  name="rol"
                  value={userData.rol}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          {isEditing && (
            <Button
              variant="success"
              onClick={handleSave}
              className="mt-3"
            >
              Guardar
            </Button>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default MisDatos;
