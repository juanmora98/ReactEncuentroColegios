import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import "../styles/styles.css";
import ConnectionPoint, { ConnectionPointRef } from './ConnectionPoint';

interface CloudProps {
    topConnected?: boolean;
    bottomConnected?: boolean;
    topIP?: string;
    bottomIP?: string;
}

export interface CloudRef {
    getTopConnectionPoint: () => ConnectionPointRef | null;
    getBottomConnectionPoint: () => ConnectionPointRef | null;
}

const Cloud = forwardRef<CloudRef, CloudProps>(({ 
    topConnected = false, 
    bottomConnected = false, 
    topIP = "192.168.0.100", 
    bottomIP = "192.168.1.100" 
}, ref) => {
    const topPointRef = useRef<ConnectionPointRef>(null);
    const bottomPointRef = useRef<ConnectionPointRef>(null);
    const cloudRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getTopConnectionPoint: () => topPointRef.current,
        getBottomConnectionPoint: () => bottomPointRef.current,
    }));

    return (
        <div className="cloud" ref={cloudRef}>
            ☁️            {/* Punto de conexión superior para servidores que se conectan a la nube */}
            <ConnectionPoint
                ref={topPointRef}
                id="cloud-top"
                initialIP={topIP}
                position="top"
                isConnected={topConnected}
            />
            {/* Punto de conexión inferior para servidores que se conectan a la nube */}
            <ConnectionPoint
                ref={bottomPointRef}
                id="cloud-bottom"
                initialIP={bottomIP}
                position="bottom"
                isConnected={bottomConnected}
            />
        </div>
    );
});

Cloud.displayName = 'Cloud';

export default Cloud;
