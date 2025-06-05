import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {AnswerValidation} from '../../scripts/ActEst1';
import {Navigation} from 'services/scripts/Navigation';
import '../../styles/ActEst1.css';
import 'core/styles/activity.css';
import 'core/components/Buttons/styles/buttons.css';
import IconLupa from 'resources/img/Estadistica/IconLupa.png';
import IconHelp from 'resources/img/Estadistica/IconHelp.png';

function ActEst1() {
  return (
    <div className="Background">
      <NavBar ing="estadistica" ingName="ingenieria estadistica" />
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
    const isValid = AnswerValidation();
    if (isValid) {
      navigate('/');
    }
  };
  return (
      <React.Fragment>
        <div className="activity-title">
          <h1>¡Bienvenido a la actividad de Ingeniería estadística!</h1>
          <h2>¡Detectives de Datos en Acción! Encuentra los valores a partir de los datos.</h2>
        </div>
        <div className="activity-description">
          <h3>¡Resuelve los siguientes problemas para avanzar!</h3>
          <p>Imagina que eres parte de un equipo de análisis de datos de la Escuela Colombiana de Ingeniería Julio Garavito. Tu tarea es examinar una tabla de estudiantes y encontrar tres datos clave que ayudarán a la escuela a comprender mejor a sus alumnos.</p>
          <p>En la tabla siguiente encontrarás información como el color favorito, el deporte favorito, si les gusta leer, sus calificaciones y hábitos de estudio.<br />
          Analiza los datos con atención y responde correctamente para avanzar en la actividad.
          </p>
          <div className="materials">
            <div className="materials-section">
              <h4><strong>Tabla de datos.</strong></h4>
              <a href={`${process.env.PUBLIC_URL}/resources/excel/tabla_estudiantes.xlsx`} download>
                <img src={IconLupa} alt="Descargar tabla de datos" />
              </a>
            </div>
            <div className="materials-section">
              <h4><strong>¿Necesitas ayuda?</strong></h4>
              <a href={`${process.env.PUBLIC_URL}/resources/pdf/explicacion_promedio_media_moda.pdf`} download>
                <img src={IconHelp} alt="Descargar explicación PDF" />
              </a>
            </div>
          </div>
        </div>
        <div className="lock-section">
            <label htmlFor="question1">1. ¿Cuál es el <strong>promedio de horas de estudio</strong> por semana?</label>
            <div>
                <input type="number" step="0.01" id="question1" placeholder="Respuesta en horas" required />
            </div>
            <label htmlFor="question2">2. ¿Cuál es la <strong>moda en las horas dedicadas a actividades extracurriculares</strong>?</label>
            <div>
              <input type="number" id="question2" placeholder="Respuesta en horas" required/>
            </div>
            <label htmlFor="question3">3. ¿Cuál es la <strong>mediana de las calificaciones en Lengua</strong>?</label>
            <div>
              <input type="number" step="0.01" id="question3" placeholder="Respuesta en calificación" required/>
            </div>
            <button className="custom-buttons" onClick={handleValidation}>Enviar Respuestas</button>
            <div id="mensajeFinal" className="mensaje-final"></div>
            <p id="error-message" style={{ color: 'red' }}></p>
        </div>
      </React.Fragment>
  );
}

export default ActEst1;