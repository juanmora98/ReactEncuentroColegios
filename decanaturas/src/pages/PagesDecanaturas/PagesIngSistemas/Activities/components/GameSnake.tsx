import React, { useEffect, useState } from 'react';
import {moverCulebra, reiniciarCulebra} from '../scripts/GameSnake';
import 'core/components/Buttons/styles/buttons.css';

function GameSnake(props) {

  const codeDefault = props.parameters.INGSIS_GAMESNAKEMESSAGE;
  const [code, setCode] = useState(codeDefault);

  useEffect(() => {
    reiniciarCulebra();
  }, []);

  return (
    <React.Fragment>
      <section className="activity-section">
        <h3>Actividad 2: Juego de la Culebrita</h3>
        <p>
          Logra que la culebra se mueva por el tablero y coma las manzanas.
        </p>
        <TextCodeArea value={code} onChange={setCode}/>
        <div id="matrizJuego" className="matrix-display"></div>
        <div id="resultado2" className="result-box"></div>
        <section className="activity-section-buttons">
          <button className="custom-buttons" onClick={() => moverCulebra(props)} disabled={props.completed}>Mover Culebra</button>
          <button className="custom-buttons" onClick={reiniciarCulebra} disabled={props.completed}>Reiniciar</button>
        </section>
      </section>
    </React.Fragment>
  );
}

function TextCodeArea({ value, onChange }) {
  return (
      <textarea
      id="code2"
      rows={3}
      value={value}
      spellCheck={false}
      onChange={e => onChange(e.target.value)}
      className="text-code-area"
    />
  );
}

export default GameSnake;