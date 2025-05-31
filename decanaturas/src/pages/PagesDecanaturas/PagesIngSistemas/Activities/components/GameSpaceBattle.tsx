import React, { useState } from 'react';
import { Attack } from '../scripts/GameSpaceBattle';

function GameSpaceBattle(props) {
  const codeDefault = `Ajusta el daño del jugador para vencer al marciano
player_damage = 10
marciano_hp = 50`;

  const [code, setCode] = useState(codeDefault);

  return (
    <section className="activity">
      <h2>Actividad 1: Batalla contra el Marciano</h2>
      <div className="code-visual-container">
        <textarea
          id="code1"
          rows={3}
          value={code}
          spellCheck={false}
          onChange={e => setCode(e.target.value)}
        />
        <div className="visual" id="visual1">
          <div
            className="icon-display"
            style={{
              fontSize: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🚀 <span style={{ margin: '0 10px', fontWeight: 'bold' }}>VS</span> 👾
          </div>
          <div id="resultado1" className="result-box"></div>
        </div>
      </div>
      <button onClick={() => Attack(props)} disabled={props.completed}>Ejecutar Código</button>
    </section>
  );
}

export default GameSpaceBattle;