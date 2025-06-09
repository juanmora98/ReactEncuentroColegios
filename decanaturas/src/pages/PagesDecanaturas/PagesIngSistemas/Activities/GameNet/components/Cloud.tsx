import React, { forwardRef } from 'react';
import "../styles/styles.css";

interface CloudProps {
    topConnected?: boolean;
    bottomConnected?: boolean;
}

const Cloud = forwardRef<HTMLDivElement, CloudProps>(({ topConnected = false, bottomConnected = false }, ref) => {
    return (
        <div className="cloud" ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            ☁️
            {/* Punto de conexión superior para servidores que se conectan a la nube */}
            <div 
                className="connection-point-top"
                style={{
                    backgroundColor: topConnected ? '#00aa00' : '#ff4444'
                }}
                data-testid="cloud-connection-point-top"
            ></div>
            {/* Punto de conexión inferior para servidores que se conectan a la nube */}
            <div 
                className="connection-point-bottom"
                style={{
                    backgroundColor: bottomConnected ? '#00aa00' : '#ff4444'
                }}
                data-testid="cloud-connection-point-bottom"
            ></div>
        </div>
    );
});

Cloud.displayName = 'Cloud';

export default Cloud;
