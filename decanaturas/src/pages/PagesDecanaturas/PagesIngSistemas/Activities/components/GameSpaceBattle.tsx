import React, { useState } from 'react';
import { Attack } from '../scripts/GameSpaceBattle';
import '../styles/Activity.css';
import '../styles/GameBattleSpace.css';
import 'core/components/Buttons/styles/buttons.css';

function GameSpaceBattle(props) {
  const codeDefault = `player_damage = 10
marciano_hp = 50`;

  const [code, setCode] = useState(codeDefault);

  return (
    <section className="activity-section">
      <h3>Actividad 1: Batalla contra el Marciano</h3>
      <p>
        Debes ajustar el daño del jugador para vencer al marciano.
      </p>
      <TextCodeArea value={code} onChange={setCode}/>
      <SpaceBattleDisplay />
      <button className="custom-buttons" onClick={() => Attack(props)} disabled={props.completed}>Ejecutar Código</button>
    </section>
  );
}

function TextCodeArea({ value, onChange }) {
  return (
      <textarea
      id="code1"
      rows={2}
      value={value}
      spellCheck={false}
      onChange={e => onChange(e.target.value)}
      className="text-code-area"
    />
  );
}

function SpaceBattleDisplay () {
  return (
    <react-fragment>
      <div className="space-battle-display">
      🚀 <span>VS</span> 👾
      </div>
      <div id="resultado1" className="result-box"></div>
    </react-fragment>
  );
}

export default GameSpaceBattle;