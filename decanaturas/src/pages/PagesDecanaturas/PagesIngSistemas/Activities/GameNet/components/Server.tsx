import React from 'react';
import "../styles/styles.css";

interface ServerProps {
    topConnected?: boolean;
    bottomConnected?: boolean;
}

function Server({ topConnected = false, bottomConnected = false }: ServerProps) {
    return (
        <React.Fragment>
             <div className="server" style={{ position: 'relative', display: 'inline-block' }}>
                🖥️
                {/* Punto de conexión superior */}
                <div 
                    className="connection-point-top"
                    style={{
                        backgroundColor: topConnected ? '#00aa00' : '#ff4444'
                    }}
                    data-testid="server-connection-point-top"
                ></div>
                {/* Punto de conexión inferior */}
                <div 
                    className="connection-point-bottom"
                    style={{
                        backgroundColor: bottomConnected ? '#00aa00' : '#ff4444'
                    }}
                    data-testid="server-connection-point-bottom"
                ></div>
             </div>
        </React.Fragment>
    );
}

export default Server;