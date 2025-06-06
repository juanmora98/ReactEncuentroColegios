import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import 'core/styles/activity.css';
import '../../styles/styles.css';
import {Navigation} from 'services/scripts/Navigation';
import {Parameters} from 'core/scripts/Parameters';
import {AnswerValidation, CodeTransformation} from '../../scripts/ActCiber1';

function ActCiber1() {
  return (
    <div className="Background">
      <NavBar ing="ciberseguridad" ingName="ingenieria de ciberseguridad" />
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
  const paramaters = Parameters();

  const handleValidation = () => {
    const isValid = AnswerValidation();
    if (isValid) {
      navigate('/');
    }
  };

  const cryptedPhase = CodeTransformation(paramaters.INCIBER_CODE);

  return (
      <React.Fragment>
        <div className="activity-title">
          <h1>¡Bienvenido a la actividad de Ingeniería de ciberseguridad!</h1>
          <h2>¡Descifra el codigo secreto!</h2>
        </div>
        <div className="activity-description">
          <p>
            En ciberseguridad, es común encontrar códigos secretos que los piratas informáticos buscan aprovechar. Como parte del equipo, deberás descifrarlos para proteger la información y ayudar a las personas.
          </p>
          <h3>
            CLAVE SECRETA
          </h3>
          <p>
            <strong>
              {cryptedPhase}
            </strong>
          </p>
          <p><strong>Estas son las palabras clave que te ayudarán a encontrar la clave secreta:</strong></p>
          <ul>
              <li>gato -{'>'} {CodeTransformation("gato")}</li>
              <li>Ágil y útil -{'>'} {CodeTransformation("Ágil y útil")}</li>
              <li>Escuela Colombiana de Ingeniería -{'>'} {CodeTransformation("Escuela Colombiana de Ingeniería")}</li>
          </ul>
        </div>
        <div className="answer-section">
            <h3>Escribe la clave secreta para continuar</h3>
            <p className="answer-section-description">Recuerda, si vez una coma o punto tienes que ponerlos en la respuesta</p>
            <input type="text" id="textInput" placeholder="Ingresa el texto aquí"/>
            <button className="custom-buttons" onClick={handleValidation}>Verificar</button>
            <div id="mensaje" className="mensaje-tip"></div>
        </div>
      </React.Fragment>
  );
}

export default ActCiber1;