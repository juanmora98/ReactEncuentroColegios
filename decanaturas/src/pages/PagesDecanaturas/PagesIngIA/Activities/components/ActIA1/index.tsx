import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {Navigation} from 'services/scripts/Navigation';
import '../../styles/ActIA1.css';
import IALogo from 'resources/img/IA/ActividadesColegios/IAIcon.png';
import IATutorial from 'resources/img/IA/ActividadesColegios/tutorial.png';
import {ActivityValidation} from '../../scripts/ActIA1';

function ActIA1() {
  return (
    <div className="Background">
      <NavBar ing="IA" ingName="ingenieria en inteligencia artificial" />
      <main>
        <BackgroundCard>
            <ActivityController/>
        </BackgroundCard>
      </main>
    </div>
  );
}

function ActivityController() {
  const navigate = Navigation();

  const handleValidation = () => {
    const isValid = ActivityValidation();
    if (isValid) {
      navigate('/');
    }
  };
  return (
    <React.Fragment>
        <h1>¡Resuelve el ejercicio para continuar!</h1>
        <h1 className="phase-title">Identificacion de imagenes</h1>
        <p className="description">Haz clic en la imagen para iniciar el reto.</p>
        <p className="description">Logra que la IA aprenda lo que es un caracol, una estrella y un arbol.</p>
        <div className="image-link-section">
            <a href="https://teachablemachine.withgoogle.com/train/image" target="_blank" rel="noreferrer">
                <img src={IALogo} alt="Actividad" className="activity-image"/>
            </a>
        </div>
        <div className="tutorial-section">
            <h2 className="tutorial-title">¿Necesitas ayuda? Consulta el tutorial:</h2>
            <a href="https://medium.com/@warronbebster/teachable-machine-tutorial-bananameter-4bfffa765866" target="_blank" rel="noreferrer">
                <img src={IATutorial} alt="Tutorial" className="tutorial-image"/>
            </a>
        </div>
        <div className="text-check-section">
            <h2 className="big-bold-text">Valida con la palabra clave</h2>
            <input type="text" id="textInput" placeholder="Ingresa la clave"/>
            <button onClick={handleValidation}>Verificar</button>
            <div id="mensaje" className="mensaje-tip"/>
        </div>
      </React.Fragment>
  );
}

export default ActIA1;