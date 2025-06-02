import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {Navigation} from 'services/scripts/Navigation';
import {AnswerValidation} from '../scripts/ActCiber1';

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

  const handleValidation = () => {
    const isValid = AnswerValidation();
    if (isValid) {
      navigate('/');
    }
  };
  return (
      <React.Fragment>
          <h1>¡Resuelve las tres preguntas encontrando los valores esperados!</h1>
          <h1>¡Descifra el codigo secreto!</h1>
            <div className="info-section">
                <span><strong>cf jdroanovgadbfb qs on nscs tojqscsvdf, ndqs tfwrdoq moansqfn. toqvf jgdbfbs jsq csn mdaftfn dqxsawftdjsn.</strong></span>
                <p><strong>Estas son las palabras clave que te ayudarán a encontrar la clave secreta:</strong></p>
                <ul>
                    <li>gato -{'>'} vfts</li>
                    <li>mango -{'>'} wfqvs</li>
                    <li>escuela colombiana de ingenieria -{'>'} onjgocf jscswrdfqf bo dqvoqdoadf</li>
                </ul>
            </div>
            <div className="text-check-section">
                <h2 className="big-bold-text">Escribe la clave secreta para continuar</h2>
                <h3 className="big-bold-text">Recuerda, si vez una coma o punto tienes que ponerlos en la respuesta</h3>
                <input type="text" id="textInput" placeholder="Ingresa el texto aquí"/>
                <button onClick={handleValidation}>Verificar</button>
                <div id="mensaje" className="mensaje-tip"></div>
            </div>
      </React.Fragment>
  );
}

export default ActCiber1;