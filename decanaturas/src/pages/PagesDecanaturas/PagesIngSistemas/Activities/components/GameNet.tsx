import React, {useEffect, useState, useRef} from 'react';
import {Parameters} from "core/scripts/Parameters.js"
import '../styles/GameNet.css';
import { validationIpComputerServer, parseNetworkConfig, initializeNetworkconfig, validationIpServerCloud } from '../scripts/GameNet.js';
import "../GameNet/components/Computer";
import Computer from '../GameNet/components/Computer';
import Server from '../GameNet/components/Server';
import Cloud from '../GameNet/components/Cloud';
import 'core/components/Buttons/styles/buttons.css';

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
      <ButtonArea code={code} networkConfig={networkConfig} setNetworkConfig={setNetworkConfig} completed={props.completed}/>
    <div id="resultado3" className="result-box"></div>
    </React.Fragment>
  );
}

function ButtonArea(props){
  return (
    <React.Fragment>
      <div className="activity-section-buttons">
        <button className="custom-buttons" onClick={() => updateNetworkConfig(props.code, props.networkConfig, props.setNetworkConfig)} disabled={props.completed}>Ejecutar Código</button>
        <button className="custom-buttons" disabled={props.completed}>Reiniciar</button>
      </div>
    </React.Fragment>
  );
}

function updateNetworkConfig(newConfig, oldConfig, setConfiguration) {
  const parsedConfig = parseNetworkConfig(newConfig, oldConfig);
  setConfiguration(parsedConfig);
}

function NetDisplay (props) {
    // Referencias para obtener posiciones de elementos
    const containerRef = useRef(null);
    const groupARefs = useRef([]);
    const groupBRefs = useRef([]);
    const serverARefs = useRef(null);
    const serverBRefs = useRef(null);
    const cloudRef = useRef(null);

    return (
    <React.Fragment>
      <div 
        className="network-display-container" 
        ref={containerRef}
      >
        <div className="network-element-container">
          <GenerateGroup 
              idGroup={props.networkConfig.groups[0].id}
              computers = {props.networkConfig.groups[0].computers}
              server = {props.networkConfig.servers[0]}
              groupRefs={groupARefs}
          />
        </div>
        <div className="network-element-container" ref={serverARefs}>
          <Generateserver 
            serverConfig ={props.networkConfig.servers[0]}
            computers = {props.networkConfig.groups[0].computers}
            cloudIp = {props.networkConfig.cloud[0].ip}
          />
        </div>
        <div className="network-element-container" ref={cloudRef}>
          <Cloud 
            topConnected={props.networkConfig.servers[0].ip}
            bottomConnected={props.networkConfig.servers[1].ip}
            topIP="192.168.0.100"
            bottomIP="192.168.1.100"
          />
        </div>
        <div className="network-element-container" ref={serverBRefs}>
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
              groupRefs={groupBRefs}
          />
        </div>
        {/* SVG para las líneas de conexión */}
        <svg className="network-display-container-svg">
          {generateConnectionLinesWithRefs(props.networkConfig, containerRef, groupARefs, groupBRefs, serverARefs, serverBRefs, cloudRef)}
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
                ref={el => {
                  if (props.groupRefs && props.groupRefs.current) {
                    props.groupRefs.current[computerIndex] = el;
                  }
                }}
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

// 🎯 Función para generar líneas usando refs para obtener posiciones reales
function generateConnectionLinesWithRefs(networkConfig, containerRef, groupARefs, groupBRefs, serverARefs, serverBRefs, cloudRef) {
  const lines = [];
  
  // Verificar que tenemos el contenedor y las referencias
  if (!containerRef.current) {
    return lines;
  }
  
  const containerRect = containerRef.current.getBoundingClientRect();
  
  // 1. Líneas computador → servidor (Grupo A)
  if (groupARefs.current && serverARefs.current) {
    networkConfig.groups[0].computers.forEach((computer, computerIndex) => {
      const computerElement = groupARefs.current[computerIndex];
      const serverElement = serverARefs.current;
      
      if (computerElement && serverElement && computer.ip && 
          validationIpComputerServer(computer.ip, networkConfig.servers[0])) {
        
        const computerRect = computerElement.getBoundingClientRect();
        const serverRect = serverElement.getBoundingClientRect();
          // Calcular posiciones relativas al contenedor
        const x1 = computerRect.left - containerRect.left + computerRect.width / 2;
        // Ajustar Y para apuntar al punto de conexión según la posición
        const y1 = computerRect.top - containerRect.top + 
                   (computerIndex < networkConfig.groups[0].computers.length && 
                    ConnectionPointPosition(networkConfig.groups[0].id) === "bottom" 
                    ? computerRect.height : 0); // Si es bottom, punto abajo; si es top, punto arriba
        const x2 = serverRect.left - containerRect.left + serverRect.width / 2;
        const y2 = serverRect.top - containerRect.top + serverRect.height / 2;
        
        lines.push(
          <line
            key={`computer-A-${computerIndex}-to-server`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00ff00"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
        );
      }
    });
  }
  
  // 2. Líneas computador → servidor (Grupo B)
  if (groupBRefs.current && serverBRefs.current) {
    networkConfig.groups[1].computers.forEach((computer, computerIndex) => {
      const computerElement = groupBRefs.current[computerIndex];
      const serverElement = serverBRefs.current;
      
      if (computerElement && serverElement && computer.ip && 
          validationIpComputerServer(computer.ip, networkConfig.servers[1])) {
          const computerRect = computerElement.getBoundingClientRect();
        const serverRect = serverElement.getBoundingClientRect();
        
        const x1 = computerRect.left - containerRect.left + computerRect.width / 2;
        // Ajustar Y para apuntar al punto de conexión según la posición
        const y1 = computerRect.top - containerRect.top + 
                   (computerIndex < networkConfig.groups[1].computers.length && 
                    ConnectionPointPosition(networkConfig.groups[1].id) === "bottom" 
                    ? computerRect.height : 0); // Si es bottom, punto abajo; si es top, punto arriba
        const x2 = serverRect.left - containerRect.left + serverRect.width / 2;
        const y2 = (serverRect.top - containerRect.top + serverRect.height / 2)+30;
        
        lines.push(
          <line
            key={`computer-B-${computerIndex}-to-server`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00ff00"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
        );
      }
    });
  }
  
  // 3. Líneas servidor → nube
  if (cloudRef.current) {
    const cloudRect = cloudRef.current.getBoundingClientRect();
    const cloudX = cloudRect.left - containerRect.left + cloudRect.width / 2;
    const cloudY = cloudRect.top - containerRect.top + cloudRect.height / 2;
    
    // Servidor A → Nube
    if (serverARefs.current && networkConfig.servers[0].ip && 
        validationIpServerCloud(networkConfig.servers[0].ip, networkConfig.cloud[0].ip)) {
      
      const serverRect = serverARefs.current.getBoundingClientRect();
      const serverX = serverRect.left - containerRect.left + serverRect.width / 2;
      const serverY = serverRect.top - containerRect.top + serverRect.height / 2;
      
      lines.push(
        <line
          key="server-A-to-cloud"
          x1={serverX}
          y1={serverY}
          x2={cloudX}
          y2={cloudY}
          stroke="#0074D9"
          strokeWidth={3}
          strokeDasharray="10,5"
        />
      );
    }
    
    // Servidor B → Nube
    if (serverBRefs.current && networkConfig.servers[1].ip && 
        validationIpServerCloud(networkConfig.servers[1].ip, networkConfig.cloud[1].ip)) {
      
      const serverRect = serverBRefs.current.getBoundingClientRect();
      const serverX = serverRect.left - containerRect.left + serverRect.width / 2;
      const serverY = serverRect.top - containerRect.top + serverRect.height / 2;
      
      lines.push(
        <line
          key="server-B-to-cloud"
          x1={serverX}
          y1={serverY}
          x2={cloudX}
          y2={cloudY}
          stroke="#0074D9"
          strokeWidth={3}
          strokeDasharray="10,5"
        />
      );
    }
  }
  
  return lines;
}
export default GameNet;