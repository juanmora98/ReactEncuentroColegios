import React, { useEffect, useState } from 'react';
import {moverCulebra, reiniciarCulebra} from '../scripts/GameSnake';

function GameSnake(props) {

  const codeDefault = `Control de movimiento de la culebra
move = [0, 0]  # [fila, columna]
Prueba moverlo 1, 0 y luego 0,-1`;
  const [code, setCode] = useState(codeDefault);

  useEffect(() => {
    reiniciarCulebra();
  }, []);

  return (
    <section className="activity">
      <h2>Actividad 2: Juego de la Culebrita</h2>
      <div className="code-visual-container">
          <textarea id="code2" rows={3}
          value={code}
          spellCheck={false}
          onChange={e => setCode(e.target.value)}/>
          <div id="matrizJuego" className="matrix-display"></div>
      </div>
      <div id="tableroInicial" className="matrix-display"></div>
        <button onClick={() => moverCulebra(props)} disabled={props.completed}>Mover Culebra</button>
        <button onClick={reiniciarCulebra} disabled={props.completed}>Reiniciar</button>
      <div id="resultado2" className="result-box"></div>
    </section>
  );
}

export default GameSnake;