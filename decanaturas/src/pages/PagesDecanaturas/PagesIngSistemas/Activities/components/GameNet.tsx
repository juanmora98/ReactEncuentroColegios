import React, {useEffect, useState, useRef, useLayoutEffect } from 'react';
import '../styles/GameNet.css';
import { testParseNetworkConfig, reiniciarRed, inicializarRed } from '../scripts/GameNet.js';
import "../GameNet/components/Computer";
import Computer from '../GameNet/components/Computer';
import Server from '../GameNet/components/Server';
import Cloud from '../GameNet/components/Cloud';

function GameNet(props) {  const codeDefault = `Asigna IPs para conectar computadoras a sus servidores
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
      <button onClick={() => testParseNetworkConfig(code)} disabled={props.completed}>Ejecutar Código</button>
      <button onClick={reiniciarRed} disabled={props.completed}>Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </section>
    </React.Fragment>
  );
}

// Función para obtener la configuración inicial de la red
export function getNetworkConfiguration() {
  return {
    groups: [
      { id: "A", computers: ["192.168.0.1", "192.168.0.2", "", "", ""] },
      { id: "B", computers: ["", "192.168.1.2", "192.168.1.3", "", ""] }
    ],
    servers: [
      { id: "A", ip: "192.168.0.100", hasCloudConnection: true },
      { id: "B", ip: "192.168.1.10", hasCloudConnection: false }
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

function NetDisplay () {
  const containerRef = useRef(null);
  const computerRefs = useRef([]);
  const serverRefs = useRef([]);  const cloudRef = useRef(null); // Referencia para la nube
  const [forceLineUpdate, setForceLineUpdate] = useState(0); // Estado para forzar actualización de líneas
    // Obtener configuración de la red
  const { groups, servers, defaultConnectionColor, connectionColors } = getNetworkConfiguration();
  const [connectionColor, setConnectionColor] = useState(defaultConnectionColor);
  
  // Obtener estado de conexiones
  const connectionStatus = getConnectionStatus(groups, servers);

  // Función para cambiar el color de las líneas
  const changeConnectionColor = (newColor) => {
    setConnectionColor(newColor);
  };
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
        ref={containerRef}
        className="network-display-container" 
        style={{ 
          position: 'relative', 
          minHeight: '500px', 
          border: '1px solid #ccc', 
          padding: '20px',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >        {/* Botones para cambiar color */}
        <div style={{ marginBottom: '10px' }}>
          {connectionColors.map((colorConfig, index) => (
            <button 
              key={index}
              onClick={() => changeConnectionColor(colorConfig.color)} 
              style={{ 
                marginRight: index < connectionColors.length - 1 ? '5px' : '0px', 
                backgroundColor: colorConfig.color, 
                color: 'white' 
              }}
            >
              {colorConfig.name}
            </button>
          ))}
        </div>
        
        {/* Estructura dinámica: Grupo A -> Servidor A -> Nube -> Servidor B -> Grupo B */}
          {/* Grupo A */}
        <div className="network-element-container">
          <GenerateGroup 
              idGroup="A"
              computers={groups[0].computers}
              computerRefs={computerRefs}
              groupIndex={0}
              connectionPosition="bottom"
          />
        </div>        {/* Servidor A */}
        <div className="network-element-container">
          <Generateserver 
            idGroup="A" 
            serverRef={serverRefs}
            serverIndex={0}
            topConnected={connectionStatus.serverA.topConnected}
            bottomConnected={connectionStatus.serverA.bottomConnected}
          />
        </div>        {/* Nube (representación visual) - Centrada */}
        <div className="network-element-container">
          <Cloud 
            ref={cloudRef}
            topConnected={connectionStatus.cloud.topConnected}
            bottomConnected={connectionStatus.cloud.bottomConnected}
          />
        </div>        {/* Servidor B */}
        <div className="network-element-container">
          <Generateserver 
            idGroup="B" 
            serverRef={serverRefs}
            serverIndex={1}
            topConnected={connectionStatus.serverB.topConnected}
            bottomConnected={connectionStatus.serverB.bottomConnected}
          />
        </div>{/* Grupo B */}
        <div className="network-element-container">
          <GenerateGroup 
              idGroup="B" 
              computers={groups[1].computers}
              computerRefs={computerRefs}
              groupIndex={1}
              connectionPosition="top"
          />
        </div>
        {/* SVG para las líneas de conexión */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >          {/* Dibujar líneas desde cada computador con IP al servidor correspondiente */}
          {groups.map((group, groupIndex) => 
            group.computers.map((ip, computerIndex) => {
              if (ip && computerRefs.current[groupIndex] && computerRefs.current[groupIndex][computerIndex] && 
                  serverRefs.current[groupIndex]) {
                return (                  <ConnectionLine
                    key={`connection-${groupIndex}-${computerIndex}`}
                    startRef={{ current: computerRefs.current[groupIndex][computerIndex] }}
                    endRef={{ current: serverRefs.current[groupIndex] }}
                    containerRef={containerRef}
                    color={connectionColor}
                    strokeWidth={3}
                    connectionType={groupIndex === 0 ? 'computer-to-server-A' : 'computer-to-server-B'}
                    forceUpdate={forceLineUpdate}
                  />
                );
              }
              return null;
            })
          )}{/* Dibujar líneas desde cada servidor a la nube */}
          {servers.map((server, serverIndex) => {
            if (server.hasCloudConnection && serverRefs.current[serverIndex] && cloudRef.current) {
              return (                <ConnectionLine
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

  return (
    <React.Fragment>
      <div className="group-container">
        <h4>GRUPO {props.idGroup}</h4>
        <div className="computers-container">
          {props.computers.map((ip, computerIndex) => (
            <div 
              key={computerIndex}
              ref={el => props.computerRefs.current[props.groupIndex][computerIndex] = el}
            >
              <Computer 
                connectionPosition={props.connectionPosition || 'bottom'}
                isConnected={!!ip}
                ip={ip}
              />
            </div>
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
        <div 
          className="server-container"
          ref={el => props.serverRef.current[props.serverIndex] = el}
        >
          <Server 
            topConnected={props.topConnected || false}
            bottomConnected={props.bottomConnected || false}
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
      if (startRef?.current && endRef?.current && containerRef?.current) {
        // Buscar los puntos de conexión específicos dentro de los elementos
        let startConnectionPoint;
        let endConnectionPoint;
        
        // Determinar puntos de conexión según el tipo de conexión
        if (connectionType === 'computer-to-server-A') {
          // Computador del grupo A al punto superior del servidor A
          startConnectionPoint = startRef.current.querySelector('[data-testid="computer-connection-point"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="server-connection-point-top"]');
        } else if (connectionType === 'computer-to-server-B') {
          // Computador del grupo B al punto inferior del servidor B
          startConnectionPoint = startRef.current.querySelector('[data-testid="computer-connection-point"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="server-connection-point-bottom"]');
        } else if (connectionType === 'server-to-cloud-top') {
          // Servidor A (punto inferior) a la nube (punto superior)
          startConnectionPoint = startRef.current.querySelector('[data-testid="server-connection-point-bottom"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="cloud-connection-point-top"]');
        } else if (connectionType === 'server-to-cloud-bottom') {
          // Servidor B (punto superior) a la nube (punto inferior)
          startConnectionPoint = startRef.current.querySelector('[data-testid="server-connection-point-top"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="cloud-connection-point-bottom"]');
        } else {
          // Conexiones por defecto (retrocompatibilidad)
          startConnectionPoint = startRef.current.querySelector('[data-testid="computer-connection-point"]') ||
                                startRef.current.querySelector('[data-testid="server-connection-point-top"]') ||
                                startRef.current.querySelector('[data-testid="server-connection-point"]');
          endConnectionPoint = endRef.current.querySelector('[data-testid="server-connection-point-top"]') ||
                             endRef.current.querySelector('[data-testid="server-connection-point"]') ||
                             endRef.current.querySelector('[data-testid="cloud-connection-point-top"]') ||
                             endRef.current.querySelector('[data-testid="cloud-connection-point-bottom"]');
        }
        
        if (startConnectionPoint && endConnectionPoint) {
          // Obtener las posiciones de los elementos
          const containerRect = containerRef.current.getBoundingClientRect();
          const startRect = startConnectionPoint.getBoundingClientRect();
          const endRect = endConnectionPoint.getBoundingClientRect();

          // Calcular coordenadas relativas al contenedor
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

    // Calcular inmediatamente
    calculateCoordinates();

    // También calcular después de un pequeño delay para elementos que puedan tardar en renderizar
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

export default GameNet;