import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {Navigation} from 'services/scripts/Navigation';
import '../../styles/ActIA1.css';
import 'core/styles/activity.css';
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
    <React.Fragment><div className="activity-title">
          <h1>¡Bienvenido a la actividad de Ingeniería en inteligencia artificial!</h1>
          <h2>¡Entrenando la IA! Tu primera IA.</h2>
        </div>
        <div className="activity-description">
          <p>
            Día a día, todos nosotros utilizamos muchas IAs como ChatGPT, Gemini, Siri, entre muchas más. Se han vuelto parte de nuestras vidas, pero, ¿alguna vez has pensado cómo llega a funcionar una de estas o incluso cómo nació? ¡En esta actividad, darás tus primeros pasos para entenderlo entrenando tu propia IA para identificar imágenes!
          </p>
          <p>
            En esta actividad, te invitamos a que entrenes una IA para que pueda identificar imágenes de un caracol, una estrella y un árbol. Para ello, deberás subir imágenes de cada uno de estos objetos y luego probar si la IA puede reconocerlos correctamente.
          </p>
          <p>
            Recuerda que la IA aprende a partir de los datos que le proporcionas, así que asegúrate de subir suficientes imágenes de cada categoría para que pueda aprender de manera efectiva.
          </p>
          <p>
            Para iniciar, dale click al icono de la actividad que se encuentra a continuación.
          </p>
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
        </div>
        <div className="answer-section">
            <h3>Presenta tu IA al profesor, el te dara el siguiente codigo:</h3>
            <input type="text" id="textInput" placeholder="Ingresa el texto aquí"/>
            <button className="custom-buttons" onClick={handleValidation}>Verificar</button>
            <div id="mensaje" className="mensaje-tip"></div>
        </div>
      </React.Fragment>
  );
}

export default ActIA1;