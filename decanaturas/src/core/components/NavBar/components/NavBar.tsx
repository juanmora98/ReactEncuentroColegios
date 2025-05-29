import React from 'react';
import escuelaLogo from 'resources/img/LOGOESCUELA/FondoBlanco/LogoTipo1.jpg';
import '../CSS/NavBar.css';

function NavBar(props) {
  return (
    <header>
      <nav className="navbar" id={props.ing}>
        <div className="navbar-logo">
            <a href="https://www.escuelaing.edu.co/es/" target="_blank" rel='noreferrer'>
                <img src={escuelaLogo} alt="Logo"/>
            </a>
        </div>
        <div className="navbar-title">
            <h1>{props.ingName}</h1>
        </div>
      </nav>
  </header>
  );
}

export default NavBar;