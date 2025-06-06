import React, {useEffect, useState } from 'react';
import '../styles/GameNet.css';
import { conectarRed, reiniciarRed, inicializarRed } from '../scripts/GameNet.js';

function GameNet(props) {
  const codeDefault = `Asigna IPs para conectar computadoras a sus servidores
y conecta servidores a la nube
grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""]
grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""]
servidorA = "192.168.0.100"
servidorB = "192.168.1.10"`;
  const [code, setCode] = useState(codeDefault);
  useEffect(() => {
    inicializarRed();
  }, []);

  return (
    <React.Fragment>
      <section className="activity">
      <h2>Actividad 3: Red de Computadoras y Servidores</h2>
      <div className="code-visual-container">
        <textarea id="code3" rows={7}
          value={code}
          spellCheck={false}
          onChange={e => setCode(e.target.value)}/>
        <div id="redVisual" className="network-display"></div>
      </div>
      <button onClick={() => conectarRed(props)} disabled={props.completed}>Ejecutar Código</button>
      <button onClick={reiniciarRed} disabled={props.completed}>Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </section>
    </React.Fragment>
  );
}

export default GameNet;