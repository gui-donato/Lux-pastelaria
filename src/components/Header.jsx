import React from 'react';
import './Header.css';
import imagemDesktop from '../components/pastel.jpg'; // Imagem para telas grandes
import imagemMobile from '../components/pastel.jpg'; // Imagem para telas menores

const Header = () => {
  const isMobile = window.innerWidth <= 768;
  const imagem = isMobile ? imagemMobile : imagemDesktop;

  return (
    <header
      className="header"
      style={{
        background: `url(${imagem})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'top center' : 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1>Lux Pastelaria</h1>
    </header>
  );
};

export default Header;
