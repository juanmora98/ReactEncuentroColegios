import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import "../styles/styles.css";
import ConnectionPoint, { ConnectionPointRef } from './ConnectionPoint';
import { isConnected } from '../scripts/GameController';

interface ComputerProps {
    id: string;
    ip?: string;
    connectedToServer?: boolean;
}

export interface ComputerRef {
    getIP: () => string;
    setIP: (newIP: string) => void;
    getConnectedToServer: () => boolean;
    setConnectedToServer: (connected: boolean) => void;
    getConnectionPoint: () => ConnectionPointRef | null;
    getID: () => string;
    setID: (newID: string) => void;
}

const Computer = forwardRef<ComputerRef, ComputerProps>(({ 
    id, 
    ip = '',
    connectionPosition = 'bottom',
    connectedToServer = false 
}, ref) => {
   
    const connectionPointRef = useRef<ConnectionPointRef>(null);
    const [currentID, setCurrentID] = useState<string>(id);
    const [currentIP, setCurrentIP] = useState<string>(ip || '');
    const [currentConnectedToServer, setCurrentConnectedToServer] = useState<boolean>(connectedToServer);

    // Sincronizar el estado interno cuando cambien los props
    useEffect(() => {
        setCurrentIP(ip || '');
    }, [ip]);

    useEffect(() => {
        setCurrentConnectedToServer(connectedToServer);
    }, [connectedToServer]);    
    
    const getID = (): string => {
        return currentID;
    };

    const setID = (newID: string): void => {
        setCurrentID(newID);
    };

    // Métodos get y set para IP
    const getIP = (): string => {
        return currentIP;
    };

    const setIP = (newIP: string): void => {
        setCurrentIP(newIP);
    };

    // Métodos get y set para conexión a servidor
    const getConnectedToServer = (): boolean => {
        return currentConnectedToServer;
    };

    const setConnectedToServer = (connected: boolean): void => {
        setCurrentConnectedToServer(connected);
    };
    
    useImperativeHandle(ref, () => ({
        getConnectionPoint: () => connectionPointRef.current,
        getID,
        setID,
        getIP,
        setIP,
        getConnectedToServer,
        setConnectedToServer,
    }));

    return (
        <React.Fragment>
             <div className="computer" style={{ position: 'relative' }}>
                💻
                <ConnectionPoint
                    ref={connectionPointRef}
                    id={id}
                    position={connectionPosition}
                    connected={isConnected(currentIP, currentConnectedToServer)}
                />
             </div>
        </React.Fragment>
    );
});

Computer.displayName = 'Computer';

export default Computer;