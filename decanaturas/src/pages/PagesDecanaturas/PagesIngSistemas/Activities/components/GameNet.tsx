import React, {useEffect, useState } from 'react';
import '../styles/GameNet.css';
import { conectarRed, reiniciarRed, inicializarRed } from '../scripts/GameNet.js';
import "../GameNet/components/Computer";
import Computer from '../GameNet/components/Computer';
import Server from '../GameNet/components/Server';

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
      <section className="activity-section">
        <h3>Actividad 3: Red de Computadoras y Servidores</h3>
        <p>
          Varios computadores no esta conectados correctamente a sus servidores,
          y algunos servidores no estan conectados a la nube. Logra realizar las conexiones correctas
          para que todos los computadores puedan acceder a la nube.
        </p>
        <TextCodeArea value={code} onChange={setCode}/>
        <NetDisplay />
      </section>
      <section className="activity">
      <div className="code-visual-container">
        <div id="redVisual" className="network-display"></div>
      </div>
      <button onClick={() => conectarRed(props)} disabled={props.completed}>Ejecutar Código</button>
      <button onClick={reiniciarRed} disabled={props.completed}>Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </section>
    </React.Fragment>
  );
}

function NetDisplay () {
  return (
    <React.Fragment>
      <div className="network-display-container">
        <GenerateGroup idGroup="A" computers={["192.168.0.1", "192.168.0.2", "", "", ""]} />
        <Generateserver idGroup="A"/>
      </div>
    </React.Fragment>
  );
}

function GenerateGroup(props){
  return (
    <React.Fragment>
      <div className="group-container">
        <h4>GRUPO {props.idGroup}</h4>
        <div className="computers-container">
          {props.computers.map(() => (
            <Computer />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

function Generateserver(props){
  return (
    <React.Fragment>
      <div className="group-container">
        <h4>SERVIDOR {props.idGroup}</h4>
        <div className="server-container">
          <Server />
        </div>
      </div>
    </React.Fragment>
  );
}

function TextCodeArea({ value, onChange }) {
  return (
      <textarea
      id="code3"
      rows={3}
      value={value}
      spellCheck={false}
      onChange={e => onChange(e.target.value)}
      className="text-code-area"
    />
  );
}

export default GameNet;