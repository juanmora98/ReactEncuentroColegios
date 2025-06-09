import React from 'react';
import "../styles/styles.css";

interface ComputerProps {
    connectionPosition?: 'top' | 'bottom';
    isConnected?: boolean;
    ip?: string;
}

function Computer({ connectionPosition = 'bottom', isConnected = false, ip }: ComputerProps) {
    // Determinar el color del punto de conexión
    const connectionColor = ip ? (isConnected ? '#00aa00' : '#ff4444') : '#cccccc';
    
    return (
        <React.Fragment>
             <div className="computer">
                💻
                <div 
                    className={connectionPosition === 'top' ? "connection-point-top" : "connection-point-bottom"}
                    style={{
                        backgroundColor: connectionColor,
                    }}
                    data-testid="computer-connection-point"
                ></div>
             </div>
        </React.Fragment>
    );
}

export default Computer;