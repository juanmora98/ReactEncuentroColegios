import React from 'react';
import "../styles/styles.css";

export default function ConnectionPoint(props){
    return (
        <div    
        className={getClassName(props)}
        style={{
            backgroundColor: getBackgroundColor(props)
        }}
        ></div>
    );

}

function getClassName(props){
    return `connection-point-${props.position}`;
}

function getBackgroundColor(props){
    switch (props.connected) {
        case 1:
            return '#00aa00'; // Verde
        case 2:
            return '#ff0000'; // Rojo
        default:
            return '#cccccc'; // Gris
    }
}

