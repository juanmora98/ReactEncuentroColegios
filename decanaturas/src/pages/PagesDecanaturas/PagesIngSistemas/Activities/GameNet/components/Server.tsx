import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import "../styles/styles.css";
import ConnectionPoint, { ConnectionPointRef } from './ConnectionPoint';

interface ServerProps {
    topConnected?: boolean;
    bottomConnected?: boolean;
    InitialIP?: string;
}

export interface ServerRef {
    getTopConnectionPoint: () => ConnectionPointRef | null;
    getBottomConnectionPoint: () => ConnectionPointRef | null;
}

const Server = forwardRef<ServerRef, ServerProps>(({ 
    topConnected = false, 
    bottomConnected = false, 
    InitialIP=""
}, ref) => {
    const topPointRef = useRef<ConnectionPointRef>(null);
    const bottomPointRef = useRef<ConnectionPointRef>(null);
    useImperativeHandle(ref, () => ({
        getTopConnectionPoint: () => topPointRef.current,
        getBottomConnectionPoint: () => bottomPointRef.current,
    }));

    return (
        <React.Fragment>
             <div className="server" style={{display: 'inline-block' }}>
                <div className="server-icon">
                    🖥️
                </div>
                <ConnectionPoint
                    ref={topPointRef}
                    id="server-top"
                    initialIP={InitialIP}
                    position="top"
                    isConnected={topConnected}
                />
                <ConnectionPoint
                    ref={bottomPointRef}
                    id="server-bottom"
                    initialIP={InitialIP}
                    position="bottom"
                    isConnected={bottomConnected}
                />
            </div>
        </React.Fragment>
    );
});

export default Server;