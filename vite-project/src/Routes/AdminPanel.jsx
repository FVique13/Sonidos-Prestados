import React, { useState } from 'react';
import AdminMisDatos from '../Components/Admin/AdminDatos'; 
import AdminUsuarios from '../Components/Admin/AdminUsuarios';
import AdminProductos from '../Components/Admin/AdminProductos';
import { Button, Col, Container, Row, Offcanvas } from 'react-bootstrap';
import '../Components/Admin/Admin.css'; // Asegúrate de que este archivo está importado

const AdminPanel = () => {
    const [selectedSection, setSelectedSection] = useState('MisDatos');
    const [showSidebar, setShowSidebar] = useState(false);

    const renderView = () => {
        switch (selectedSection) {
            case 'Usuarios':
                return <AdminUsuarios />;
            case 'Productos':
                return <AdminProductos />;
            case 'MisDatos':
            default:
                return <AdminMisDatos />;
        }
    };

    return (
        <Container fluid>
            <Row>
                {/* Sidebar for larger screens */}
                <Col md={3} className="d-none d-md-block sidebar bg-dark p-3">
                    <Button 
                        variant="primary" 
                        className={`btn-custom w-100 mb-2 ${selectedSection === 'MisDatos' ? 'selected' : ''}`}
                        onClick={() => setSelectedSection('MisDatos')}
                    >
                        Mis Datos
                    </Button>
                    <hr className={`hr-custom ${selectedSection === 'MisDatos' ? 'selected' : ''}`} />
                    <Button 
                        variant="primary" 
                        className={`btn-custom w-100 mb-2 ${selectedSection === 'Usuarios' ? 'selected' : ''}`}
                        onClick={() => setSelectedSection('Usuarios')}
                    >
                        Usuarios
                    </Button>
                    <hr className={`hr-custom ${selectedSection === 'Usuarios' ? 'selected' : ''}`} />
                    <Button 
                        variant="primary" 
                        className={`btn-custom w-100 mb-2 ${selectedSection === 'Productos' ? 'selected' : ''}`}
                        onClick={() => setSelectedSection('Productos')}
                    >
                        Productos
                    </Button>
                    <hr className={`hr-custom ${selectedSection === 'Productos' ? 'selected' : ''}`} />
                </Col>

                {/* Content area */}
                <Col md={9} className="p-3">
                    {renderView()}
                </Col>

                {/* Sidebar for smaller screens */}
                <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Button 
                            className={`offcanvas-button w-100 mb-2 ${selectedSection === 'MisDatos' ? 'selected' : ''}`}
                            onClick={() => { setSelectedSection('MisDatos'); setShowSidebar(false); }}
                        >
                            Mis Datos
                        </Button>
                        <hr className={`hr-custom ${selectedSection === 'MisDatos' ? 'selected' : ''}`} />
                        <Button 
                            className={`offcanvas-button w-100 mb-2 ${selectedSection === 'Usuarios' ? 'selected' : ''}`}
                            onClick={() => { setSelectedSection('Usuarios'); setShowSidebar(false); }}
                        >
                            Usuarios
                        </Button>
                        <hr className={`hr-custom ${selectedSection === 'Usuarios' ? 'selected' : ''}`} />
                        <Button 
                            className={`offcanvas-button w-100 mb-2 ${selectedSection === 'Productos' ? 'selected' : ''}`}
                            onClick={() => { setSelectedSection('Productos'); setShowSidebar(false); }}
                        >
                            Productos
                        </Button>
                        <hr className={`hr-custom ${selectedSection === 'Productos' ? 'selected' : ''}`} />
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Toggle button for small screens */}
                <Button 
                    className="menu-button d-md-none" 
                    variant="primary" 
                    onClick={() => setShowSidebar(true)}
                >
                    Menu
                </Button>
            </Row>
        </Container>
    );
};

export default AdminPanel;
