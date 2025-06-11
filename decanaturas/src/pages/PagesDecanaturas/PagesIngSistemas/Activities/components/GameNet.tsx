import React, {useEffect, useState, useRef, useLayoutEffect } from 'react';
import {Parameters} from "core/scripts/Parameters.js"
import '../styles/GameNet.css';
import { reiniciarRed, parseNetworkConfig } from '../scripts/GameNet.js';
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
servidorB = "192.168.1.10"`;
  const [code, setCode] = useState(codeDefault);
  const [networkConfig, setNetworkConfig] = useState(getNetworkConfiguration());

  useEffect(() => {
    console.log("GameNet component mounted");
    setNetworkConfig(initializeNetwork(networkConfig, code));
    console.log("GameNet component final");
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
        <NetDisplay networkConfig={networkConfig}/>
      </section>
    <button onClick={() => parseNetworkConfig(code)} disabled={props.completed}>Ejecutar Código</button>
      <button onClick={reiniciarRed} disabled={props.completed}>Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </React.Fragment>
  );
}

//inicializador de la red
function initializeNetwork(networkConfig, code) {
  // Parsear el código ingresado por el usuario
  const parsedConfig = parseNetworkConfig(code);
  // Si el parseo falla, retornar la configuración inicial
  if (!parsedConfig) {
    return networkConfig;
  }
  return parsedConfig;
}

// Función para obtener la configuración inicial de la red
export function getNetworkConfiguration() {
  return {
    groups: [
      { id: "A", computers: ["", "", "", "", ""] },
      { id: "B", computers: ["", "", "", "", ""] }
    ],
    servers: [
      { id: "A", ip: ""},
      { id: "B", ip: ""}
    ],
    defaultConnectionColor: '#0074D9',
    connectionColors: [
      { name: 'Azul', color: '#0074D9' },
      { name: 'Rojo', color: '#ff4444' },
      { name: 'Verde', color: '#00aa00' },
      { name: 'Naranja', color: '#ffaa00' }
    ]
  };
}






// Función para determinar el estado de conexión de los elementos
export function getConnectionStatus(groups, servers) {
  return {
    serverA: {
      topConnected: groups[0].computers.some(ip => ip !== ""),
      bottomConnected: servers[0].hasCloudConnection && servers[0].ip === "192.168.0.100"
    },
    serverB: {
      topConnected: servers[1].hasCloudConnection && servers[1].ip === "192.168.1.100",
      bottomConnected: groups[1].computers.some(ip => ip !== "")
    },
    cloud: {
      topConnected: servers[0].hasCloudConnection && servers[0].ip === "192.168.0.100",
      bottomConnected: servers[1].hasCloudConnection && servers[1].ip === "192.168.1.100"
    }
  };
}

function NetDisplay (props) {
  const containerRef = useRef(null);
  const computerRefs = useRef([]);
  const serverRefs = useRef([]);  
  const cloudRef = useRef(null); // Referencia para la nube
  const [forceLineUpdate, setForceLineUpdate] = useState(0); // Estado para forzar actualización de líneas
    // Obtener configuración de la red
  const { groups, servers } = props.networkConfig;
  const [connectionColor] = useState("#0074D9"); // Color de conexión por defecto
  
  // Obtener estado de conexiones
  const connectionStatus = getConnectionStatus(groups, servers);

  // Forzar recálculo de las líneas después del renderizado inicial
  useLayoutEffect(() => {
    const forceUpdate = () => {
      setForceLineUpdate(prev => prev + 1);
    };

    // Forzar actualización inmediata
    forceUpdate();

    // También forzar después de un pequeño delay para asegurar que todos los elementos están renderizados
    const timer1 = setTimeout(forceUpdate, 50);
    const timer2 = setTimeout(forceUpdate, 150);
    const timer3 = setTimeout(forceUpdate, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  return (
    <React.Fragment>
      <div 
        className="network-display-container" 
        ref={containerRef}
      >
        <div className="network-element-container">
          <GenerateGroup 
              idGroup="A"
              computers={groups[0].computers}
              computerRefs={computerRefs}
              groupIndex={0}
              connectionPosition="bottom"
          />
        </div>
        <div className="network-element-container">
          <Generateserver 
            idGroup="A" 
            serverRef={serverRefs}
            serverIndex={0}
            topConnected={connectionStatus.serverA.topConnected}
            bottomConnected={connectionStatus.serverA.bottomConnected}
          />
        </div>        <div className="network-element-container">
          <Cloud 
            ref={cloudRef}
            topConnected={connectionStatus.cloud.topConnected}
            bottomConnected={connectionStatus.cloud.bottomConnected}
            topIP="192.168.0.100"
            bottomIP="192.168.1.100"
          />
        </div>
        <div className="network-element-container">
          <Generateserver 
            idGroup="B" 
            serverRef={serverRefs}
            serverIndex={1}
            topConnected={connectionStatus.serverB.topConnected}
            bottomConnected={connectionStatus.serverB.bottomConnected}
          />
        </div>
        <div className="network-element-container">
          <GenerateGroup 
              idGroup="B" 
              computers={groups[1].computers}
              computerRefs={computerRefs}
              groupIndex={1}
              connectionPosition="top"
          />
        </div>        {/* SVG para las líneas de conexión */}
        <svg className="network-display-container-svg">      
          {/* Dibujar líneas válidas entre computadoras y servidores */}
          {generateValidConnections(computerRefs, serverRefs, groups, servers, containerRef, connectionColor, forceLineUpdate)}
          
          {/* Dibujar líneas desde cada servidor a la nube */}
          {servers.map((server, serverIndex) => {
            if (serverRefs.current[serverIndex] && cloudRef.current) {
              return (
                <ConnectionLine
                  key={`server-cloud-${serverIndex}`}
                  startRef={{ current: serverRefs.current[serverIndex] }}
                  endRef={cloudRef}
                  containerRef={containerRef}
                  color={connectionColor}
                  strokeWidth={3}
                  connectionType={serverIndex === 0 ? 'server-to-cloud-top' : 'server-to-cloud-bottom'}
                  forceUpdate={forceLineUpdate}
                />
              );
            }
            return null;
          })}
        </svg>
      </div>
    </React.Fragment>
  );
}

function GenerateGroup(props){
  // Inicializar el array de refs para este grupo si no existe
  if (!props.computerRefs.current[props.groupIndex]) {
    props.computerRefs.current[props.groupIndex] = [];
  }
  console.log(`CODIGO DE PROPS IMPORTANTE`, {props});
  return (
    <React.Fragment>
      <div className="group-container">
        <h4>GRUPO {props.idGroup}</h4>
        <div className="computers-container">          
          {props.computers.map((ip, computerIndex) => (
            console.log(`IP de computadora: ${ip}`),
            <div 
              key={computerIndex}
              className="computer-container"
              ref={el => props.computerRefs.current[props.groupIndex][computerIndex] = el}
            >
              <Computer
                id={`computer-${props.idGroup}-${computerIndex}`}
                ip={ip}
                connectionPosition={props.connectionPosition || 'bottom'}
                connectedToServer ={false}
              />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

function Generateserver(props){
  // Obtener la IP del servidor según el grupo
  const { servers } = getNetworkConfiguration();
  const serverIP = servers[props.serverIndex]?.ip || `192.168.${props.serverIndex}.100`;

  return (
    <React.Fragment>
      <div className="group-container">
        <h4>SERVIDOR {props.idGroup}</h4>
        <div 
          className="server-container"
          ref={el => props.serverRef.current[props.serverIndex] = el}        >
          <Server 
            id={`server-${props.idGroup}`}
            computerConnected={props.topConnected || false}
            cloudConnected={props.bottomConnected || false}
            ipComputer={props.topConnected}
            ipCloud={props.bottomConnected}
            InitialIP={serverIP}
            connectionPositionCloud={props.serverIndex === 0 ? 'top' : 'bottom'}
            connectionPositionComputer={props.serverIndex === 0 ? 'bottom' : 'top'}
          />
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

// Interfaz para las props del componente ConnectionLine
interface ConnectionLineProps {
  startRef: any;
  endRef: any;
  containerRef: any;
  color?: string;
  strokeWidth?: number;
  key?: string; // Agregamos la prop key
  connectionType?: string; // Tipo de conexión para determinar el punto específico
  forceUpdate?: number; // Prop para forzar actualización
}

// Componente para dibujar una línea de conexión entre dos elementos
function ConnectionLine({ startRef, endRef, containerRef, color = '#0074D9', strokeWidth = 2, connectionType, forceUpdate }: ConnectionLineProps) {
  const [coordinates, setCoordinates] = useState(null);
  
  useLayoutEffect(() => {
    const calculateCoordinates = () => {
      console.log(`🎯 ConnectionLine calculating coordinates:`, {
        connectionType,
        hasStartRef: !!startRef?.current,
        hasEndRef: !!endRef?.current,
        hasContainerRef: !!containerRef?.current,
        startRefType: startRef?.current ? typeof startRef.current : 'undefined'
      });

      if (startRef?.current && endRef?.current && containerRef?.current) {
        let startConnectionPoint;
        let endConnectionPoint;
        
        // Lógica para elementos DOM completos (computadoras, servidores y nube)
        if (connectionType === 'computer-to-server-A') {
          startConnectionPoint = startRef.current.querySelector('[data-testid="connection-point-computer-bottom"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="connection-point-server-top"]');
        } else if (connectionType === 'computer-to-server-B') {
          startConnectionPoint = startRef.current.querySelector('[data-testid="connection-point-computer-top"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="connection-point-server-bottom"]');
        } else if (connectionType === 'server-to-cloud-top') {
          startConnectionPoint = startRef.current.querySelector('[data-testid="connection-point-server-bottom"]');
          // Para la nube, usar el método del imperative handle
          const cloudTopPoint = endRef.current.getTopConnectionPoint();
          endConnectionPoint = cloudTopPoint ? cloudTopPoint.getElement() : null;
        } else if (connectionType === 'server-to-cloud-bottom') {
          startConnectionPoint = startRef.current.querySelector('[data-testid="connection-point-server-top"]');
          // Para la nube, usar el método del imperative handle
          const cloudBottomPoint = endRef.current.getBottomConnectionPoint();
          endConnectionPoint = cloudBottomPoint ? cloudBottomPoint.getElement() : null;
        } else {
          // Conexiones por defecto
          startConnectionPoint = startRef.current.querySelector('[data-testid="connection-point-computer-bottom"]') ||
                                startRef.current.querySelector('[data-testid="connection-point-computer-top"]') ||
                                startRef.current.querySelector('[data-testid="connection-point-server-top"]') ||
                                startRef.current.querySelector('[data-testid="connection-point-server-bottom"]');
          // Para endRef, verificar si es una nube o un servidor
          if (endRef.current.getTopConnectionPoint && endRef.current.getBottomConnectionPoint) {
            // Es una nube
            const cloudTopPoint = endRef.current.getTopConnectionPoint();
            const cloudBottomPoint = endRef.current.getBottomConnectionPoint();
            endConnectionPoint = (cloudTopPoint ? cloudTopPoint.getElement() : null) ||
                               (cloudBottomPoint ? cloudBottomPoint.getElement() : null);
          } else {
            // Es un servidor u otro elemento
            endConnectionPoint = endRef.current.querySelector('[data-testid="connection-point-server-top"]') ||
                               endRef.current.querySelector('[data-testid="connection-point-server-bottom"]');
          }
        }
        
        if (startConnectionPoint && endConnectionPoint) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const startRect = startConnectionPoint.getBoundingClientRect();
          const endRect = endConnectionPoint.getBoundingClientRect();

          const startX = startRect.left - containerRect.left + startRect.width / 2;
          const startY = startRect.top - containerRect.top + startRect.height / 2;
          const endX = endRect.left - containerRect.left + endRect.width / 2;
          const endY = endRect.top - containerRect.top + endRect.height / 2;

          setCoordinates({
            x1: startX,
            y1: startY,
            x2: endX,
            y2: endY
          });
        }
      }
    };

    calculateCoordinates();
    const timer = setTimeout(calculateCoordinates, 10);
    
    return () => clearTimeout(timer);
  }, [startRef, endRef, containerRef, connectionType, forceUpdate]);

  if (!coordinates) return null;

  return (
    <line
      x1={coordinates.x1}
      y1={coordinates.y1}
      x2={coordinates.x2}
      y2={coordinates.y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray="5,5" // Línea punteada para mejor visualización
    />
  );
}

// Función para validar si una IP tiene formato válido
function isValidIPFormat(ip) {
  if (!ip || typeof ip !== 'string') return false;
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}

// Función para validar conexión entre computadora y servidor
function validateComputerServerConnection(computerIP, serverIP) {
  if (!isValidIPFormat(computerIP) || !isValidIPFormat(serverIP)) {
    return false;
  }

  const computerOctets = computerIP.split('.');
  const serverOctets = serverIP.split('.');

  // Validar que los primeros 3 octetos sean iguales
  const primerosOctetosIguales = 
    computerOctets[0] === serverOctets[0] &&
    computerOctets[1] === serverOctets[1] &&
    computerOctets[2] === serverOctets[2];

  // Validar que el último octeto del computador sea menor que el del servidor
  const ultimoOctetoMenor = parseInt(computerOctets[3]) < parseInt(serverOctets[3]);

  return primerosOctetosIguales && ultimoOctetoMenor;
}

// Función para generar líneas de conexión válidas entre computadoras y servidores
function generateValidConnections(computerRefs, serverRefs, groups, servers, containerRef, connectionColor, forceLineUpdate) {
  const validConnections = [];

  console.log('🔍 Debugging generateValidConnections:');
  console.log('computerRefs:', computerRefs.current);
  console.log('serverRefs:', serverRefs.current);
  console.log('groups:', groups);
  console.log('servers:', servers);
  groups.forEach((group, groupIndex) => {
    group.computers.forEach((ip, computerIndex) => {
      // Solo procesar computadoras con IP válida y con referencia DOM
      if (!ip || !computerRefs.current[groupIndex] || !computerRefs.current[groupIndex][computerIndex]) {
        console.log(`❌ Skipping computer ${groupIndex}-${computerIndex}: no IP or ref`);
        return;
      }

      const computerElement = computerRefs.current[groupIndex][computerIndex];
      
      console.log(`🖥️ Computer ${groupIndex}-${computerIndex}:`, {
        originalIP: ip,
        hasElement: !!computerElement
      });

      // Buscar servidores válidos para esta computadora
      servers.forEach((server, serverIndex) => {
        if (!serverRefs.current[serverIndex]) {
          console.log(`❌ No server ref for ${serverIndex}`);
          return;
        }

        const serverIP = server.ip;
        
        console.log(`🔗 Checking connection: ${ip} → ${serverIP}`);
        
        // Validar si la computadora puede conectarse al servidor
        if (validateComputerServerConnection(ip, serverIP)) {
          console.log(`✅ Valid connection: ${ip} → ${serverIP}`);
          
          // Determinar el tipo de conexión basado en la red
          const connectionType = groupIndex === 0 ? 'computer-to-server-A' : 'computer-to-server-B';
          
          validConnections.push(
            <ConnectionLine
              key={`valid-connection-${groupIndex}-${computerIndex}-${serverIndex}`}
              startRef={{ current: computerElement }}
              endRef={{ current: serverRefs.current[serverIndex] }}
              containerRef={containerRef}
              color={connectionColor}
              strokeWidth={3}
              connectionType={connectionType}
              forceUpdate={forceLineUpdate}
            />
          );
        } else {
          console.log(`❌ Invalid connection: ${ip} → ${serverIP}`);
        }
      });
    });
  });

  console.log(`📊 Total valid connections: ${validConnections.length}`);
  return validConnections;
}

export default GameNet;