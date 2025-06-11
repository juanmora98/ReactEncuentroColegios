import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import "../styles/styles.css";
import ConnectionPoint, { ConnectionPointRef } from './ConnectionPoint';
import { isConnected, refAsignation } from '../scripts/GameController';

interface ServerProps {
    id?: string;
    computerConnected?: boolean;
    cloudConnected?: boolean;
    ipComputer?: string;
    ipCloud?: string;
}

export interface ServerRef {
    getTopConnectionPoint: () => ConnectionPointRef | null;
    getBottomConnectionPoint: () => ConnectionPointRef | null;
    getComputerConnected: () => boolean;
    setComputerConnected: (connected: boolean) => void;
    getCloudConnected: () => boolean;
    setCloudConnected: (connected: boolean) => void;
    getIpComputer: () => string;
    setIpComputer: (ip: string) => void;
    getIpCloud: () => string;
    setIpCloud: (ip: string) => void;
    getId: () => string;
    setId: (id: string) => void;
}

const Server = forwardRef<ServerRef, ServerProps>(({ 
    id = "",
    computerConnected = false,
    cloudConnected = false,
    ipComputer = "",
    ipCloud = "",
    InitialIP="",
    connectionPositionCloud = 'top',
    connectionPositionComputer = 'bottom',
}, ref) => {
    const topPointRef = useRef<ConnectionPointRef>(null);
    const bottomPointRef = useRef<ConnectionPointRef>(null);
    
    // State for internal management
    const [internalId, setInternalId] = useState(id);
    const [internalComputerConnected, setInternalComputerConnected] = useState(computerConnected);
    const [internalCloudConnected, setInternalCloudConnected] = useState(cloudConnected);
    const [internalIpComputer, setInternalIpComputer] = useState(ipComputer);
    const [internalIpCloud, setInternalIpCloud] = useState(ipCloud);
    
    // useEffect hooks for each state
    useEffect(() => {
        setInternalId("server-"+ id);
    }, [id]);
    
    useEffect(() => {
        setInternalComputerConnected(computerConnected);
    }, [computerConnected]);
    
    useEffect(() => {
        setInternalCloudConnected(cloudConnected);
    }, [cloudConnected]);
    
    useEffect(() => {
        setInternalIpComputer(ipComputer);
    }, [ipComputer]);
    
    useEffect(() => {
        setInternalIpCloud(ipCloud);
    }, [ipCloud]);
    
    useImperativeHandle(ref, () => ({
        getTopConnectionPoint: () => topPointRef.current,
        getBottomConnectionPoint: () => bottomPointRef.current,
        getComputerConnected: () => internalComputerConnected,
        setComputerConnected: (connected: boolean) => setInternalComputerConnected(connected),
        getCloudConnected: () => internalCloudConnected,
        setCloudConnected: (connected: boolean) => setInternalCloudConnected(connected),
        getIpComputer: () => internalIpComputer,
        setIpComputer: (ip: string) => setInternalIpComputer(ip),
        getIpCloud: () => internalIpCloud,
        setIpCloud: (ip: string) => setInternalIpCloud(ip),
        getId: () => internalId,
        setId: (newId: string) => setInternalId(newId),
    }));

    return (
        <React.Fragment>
             <div className="server" style={{display: 'inline-block' }}>
                <div className="server-icon">
                    🖥️
                </div>
                <ConnectionPoint
                    ref={refAsignation([topPointRef, bottomPointRef], connectionPositionCloud)}
                    id={id}
                    position={connectionPositionCloud}
                    connected={isConnected(ipCloud, internalIpCloud)}
                />
                <ConnectionPoint
                    ref={refAsignation([topPointRef, bottomPointRef], connectionPositionComputer)}
                    id={id}
                    initialIP={InitialIP}
                    position={connectionPositionComputer}
                    isConnected={isConnected(ipComputer, internalComputerConnected)}
                />
            </div>
        </React.Fragment>
    );
});

export default Server;