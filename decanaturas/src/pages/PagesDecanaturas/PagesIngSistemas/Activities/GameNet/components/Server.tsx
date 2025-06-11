import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import "../styles/styles.css";
import ConnectionPoint from './ConnectionPoint';
import { isConnected, refAsignation } from '../scripts/GameController';

function Server(props) {
    return (
        <React.Fragment>
             <div className="server" style={{display: 'inline-block' }}>
                <div className="server-icon">
                    🖥️
                </div>
                <ConnectionPoint
                    position="top"
                    connected={false}
                />
                <ConnectionPoint
                    position="bottom"
                    connected={false}
                />
            </div>
        </React.Fragment>
    );
}

export default Server;