import escuelaLogo from 'resources/img/LOGO ESCUELA/Fondo Blanco/LogoTipo2.jpg';
import '../CSS/NavBar.css';

function NavBar() {
  return (
    <header>
      <nav className="navbar" id="escuela">
        <div className="navbar-logo">
            <a href="https://www.escuelaing.edu.co/es/" target="_blank" rel='noreferrer'>
                <img src={escuelaLogo} alt="Logo"/>
            </a>
        </div>
        <div className="navbar-title">
            <h1>DECANATURAS</h1>
        </div>
      </nav>
  </header>
  );
}

export default NavBar;