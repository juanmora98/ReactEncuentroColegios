import React from 'react';
import "../styles/styles.css";
import ConnectionPoint from './ConnectionPoint';
import { isConnected } from '../scripts/GameController';
import {validationIpServerCloud} from "../../scripts/GameNet.js"

export function Cloud(props) {
    return (
        <div className="cloud">
            <div className="cloud-description">
                <p>
                    {props.topIP}
                </p>
                ☁️
                <p>
                    {props.bottomIP}
                </p>
            </div>
            <ConnectionPoint
                position="top"
                connected={isConnected(props.topIP, validationIpServerCloud(props.topConnected, props.topIP))}
            />
            <ConnectionPoint
                position="bottom"
                connected={isConnected(props.bottomIP, validationIpServerCloud(props.bottomConnected, props.bottomIP))}
            />
            
        </div>
    );
}

export default Cloud;
