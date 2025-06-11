import React from 'react';
import "../styles/styles.css";
import ConnectionPoint from './ConnectionPoint';
import { isConnected } from '../scripts/GameController';

export function Computer(props) {
    return (
        <React.Fragment>
             <div className="computer" style={{ position: 'relative' }}>
                💻
                <ConnectionPoint
                    position={props.connectionPosition}
                    connected={isConnected(props.ip, props.connectedToServer)}
                />
             </div>
        </React.Fragment>
    );
}


export default Computer;