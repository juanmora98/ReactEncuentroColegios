import React from 'react';
import "../styles/styles.css";
import ConnectionPoint from './ConnectionPoint';


export function Cloud(props) {
    return (
        <div className="cloud">
            ☁️
            <ConnectionPoint
                position="top"
            />
            {/* Punto de conexión inferior para servidores que se conectan a la nube */}
            <ConnectionPoint
                position="bottom"
            />
        </div>
    );
}

export default Cloud;
