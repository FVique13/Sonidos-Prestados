import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className='background-nav'>
      <div>
        <img src="/public/images/Logos/Logo White.png" alt="" />
      </div>
      <div className="hero">
      <ul className='nav'>
        <li style={{fontWeight: 'lighter', fontSize: '16px',}}><a href="/">INICIO</a></li>
        <li style={{fontWeight: 'lighter', fontSize: '16px',}} ><a href="/products">ALQUILER DE INSTRUMENTOS</a></li>
        <li style={{fontWeight: 'lighter', fontSize: '16px',}}><a href="/contact">CATEGORÍAS</a></li>
        <li style={{fontWeight: 'lighter', fontSize: '16px',}}><a href="/about">CONTACTO</a></li>
      </ul>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
          <h1 style={{fontWeight: 'bold', fontSize: '64px',  marginBottom: '-45px'}}>TU MÚSICA</h1>
          <h1 style={{fontWeight: 'bold', fontSize: '64px', }}>NUESTRO INSTRUMENTO</h1>
      </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;