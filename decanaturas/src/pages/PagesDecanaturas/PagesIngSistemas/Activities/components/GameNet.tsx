import React, {useEffect, useState} from 'react';
import {Parameters} from "core/scripts/Parameters.js"
import '../styles/GameNet.css';
import { validationIpComputerServer, parseNetworkConfig, initializeNetworkconfig, validationIpServerCloud } from '../scripts/GameNet.js';
import "../GameNet/components/Computer";
import Computer from '../GameNet/components/Computer';
import Server from '../GameNet/components/Server';
import Cloud from '../GameNet/components/Cloud';

const parameters = Parameters();

function GameNet(props) {
  const codeDefault = `Asigna IPs para conectar computadoras a sus servidores
y conecta servidores a la nube
grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""]
grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""]
servidorA = "192.168.0.100"
servidorB = ""`;
  const [code, setCode] = useState(codeDefault);
  const [networkConfig, setNetworkConfig] = useState(parameters.INGSIS_GAMENETNETWORKJSON);
  useEffect(() => {
    // Solo inicializar la configuración una vez al cargar el componente
    const initialConfig = initializeNetworkconfig(codeDefault);
    setNetworkConfig(initialConfig);
  }, []); // Array vacío para que solo se ejecute una vez
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
        <NetDisplay networkConfig={networkConfig}/>
      </section>
    <button onClick={() => updateNetworkConfig(code, networkConfig, setNetworkConfig)} disabled={props.completed}>Ejecutar Código</button>
      <button  disabled={props.completed}>Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </React.Fragment>
  );
}

function updateNetworkConfig(newConfig, oldConfig, setConfiguration) {
  const parsedConfig = parseNetworkConfig(newConfig, oldConfig);
  console.log("Parsed Network Configuration:", parsedConfig);
  setConfiguration(parsedConfig);
}

function NetDisplay (props) {
    return (
    <React.Fragment>
      <div 
        className="network-display-container" 
      >
        <div className="network-element-container">
          <GenerateGroup 
              idGroup={props.networkConfig.groups[0].id}
              computers = {props.networkConfig.groups[0].computers}
              server = {props.networkConfig.servers[0]}
          />
        </div>
        <div className="network-element-container">
          <Generateserver 
            serverConfig ={props.networkConfig.servers[0]}
            computers = {props.networkConfig.groups[0].computers}
            cloudIp = {props.networkConfig.cloud[0].ip}
          />
        </div>
        <div className="network-element-container">
          <Cloud 
            topConnected={props.networkConfig.servers[0].ip}
            bottomConnected={props.networkConfig.servers[1].ip}
            topIP="192.168.0.100"
            bottomIP="192.168.1.100"
          />
        </div>
        <div className="network-element-container">
          <Generateserver 
            serverConfig ={props.networkConfig.servers[1]}
            computers = {props.networkConfig.groups[1].computers}
            cloudIp = {props.networkConfig.cloud[1].ip}
          />
        </div>
        <div className="network-element-container">
          <GenerateGroup 
              idGroup={props.networkConfig.groups[1].id}
              computers = {props.networkConfig.groups[1].computers}
              server = {props.networkConfig.servers[1]}
          />
        </div>
        {/* SVG para las líneas de conexión */}
        <svg className="network-display-container-svg">
          {/* Aquí irán las líneas de conexión */}
          
        </svg>
        
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
          {props.computers.map((computer, computerIndex) => {
            const computerConnected = validationIpComputerServer(computer.ip, props.server);
            props.computers[computerIndex].isConnected = computerConnected;
            return (
              <div 
                key={`computer-group-${props.idGroup}-${computerIndex}`}
              >
                <Computer
                  key={`computer-component-${props.idGroup}-${computerIndex}-${computer.ip || 'empty'}`}
                  ip = {computer.ip}
                  connectionPosition={ConnectionPointPosition(props.idGroup)}
                  connectedToServer ={computerConnected}
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}


function ConnectionPointPosition(props){
  var position = "top";
  if (props === "A") {
    position = "bottom";
  }
  return position;
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

function Generateserver(props){
  return (
    <React.Fragment>
      <div className="group-container">
        <h4>SERVIDOR {props.serverConfig.id}</h4>
        <div className="server-container">
          <Server
            ip={props.serverConfig.ip}
            topConnected={(() => {
              if (props.serverConfig.id === "A") {
                return props.computers.some(computer => computer.isConnected);
              } else {
                return validationIpServerCloud(props.serverConfig.ip, props.cloudIp);
              }
            })()}
            bottomConnected={(() => {
              if (props.serverConfig.id === "B") {
                return props.computers.some(computer => computer.isConnected);
              } else {
                return validationIpServerCloud(props.serverConfig.ip, props.cloudIp);
              }
            })()}
            computerConnected={props.computerConnected}
            cloudConnected={validationIpServerCloud(props.serverConfig.ip, props.cloudIp)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default GameNet;