import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {AnswerValidation} from '../scripts/ActEst1'
import {Navigation} from 'services/scripts/Navigation';

function ActEst1() {
  return (
    <div className="Background">
      <NavBar ing="estadistica" ingName="ingenieria de estadistica" />
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
          <h1>¡Resuelve las tres preguntas encontrando los valores esperados!</h1>
          <div className="materials">
              <p><strong>1. Descarga el archivo Excel con los datos para resolver las preguntas:</strong></p>
              <a href="/resources/excel/tabla_estudiantes.xlsx" download>Descargar tabla de estudiantes (Excel)</a>

              <p><strong>2. Consulta las formulas que necesitas aqui:</strong></p>
              <a href="/resources/pdf/explicacion_promedio_media_moda.pdf" download>Descargar explicación (PDF)</a>
          </div>
          <div className="lock-section">
              <div className="lock-icon" id="lockIcon">🔒</div>
              <p>Responde correctamente las siguientes preguntas para continuar:</p>
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
              <button onClick={handleValidation}>Enviar Respuestas</button>
              <div id="mensajeFinal" className="mensaje-final"></div>
              <p id="error-message" style={{ color: 'red' }}></p>
          </div>
      </React.Fragment>
  );
}

export default ActEst1;