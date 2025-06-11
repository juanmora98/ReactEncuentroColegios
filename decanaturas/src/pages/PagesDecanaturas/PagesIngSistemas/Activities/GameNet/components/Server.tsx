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
                    connected={isConnected(props.ip, props.topConnected)}
                />
                <ConnectionPoint
                    position="bottom"
                    connected={isConnected(props.ip, props.bottomConnected)}
                />
            </div>
        </React.Fragment>
    );
}

export default Server;