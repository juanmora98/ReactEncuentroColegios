import React, { useState, useRef, useEffect } from 'react';
import "../styles/styles.css";

interface ConnectionPointProps {
    id: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    connected?: number;
}

const ConnectionPoint = React.forwardRef<HTMLDivElement, ConnectionPointProps>(({
    id,
    position = 'top',
    connected = 0
}, ref) => {
    // Estados internos
    const [currentId, setCurrentId] = useState<string>(id);
    const [currentPosition, setCurrentPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(position);
    const [currentConnected, setCurrentConnected] = useState<number>(connected);
    
    // Referencia interna del elemento
    const elementRef = useRef<HTMLDivElement>(null);

    // Métodos get y set para ID
    const getId = (): string => {
        return currentId;
    };

    const setId = (newId: string): void => {
        setCurrentId(newId);
    };

    // Métodos get y set para position
    const getPosition = (): 'top' | 'bottom' | 'left' | 'right' => {
        return currentPosition;
    };

    const setPosition = (newPosition: 'top' | 'bottom' | 'left' | 'right'): void => {
        setCurrentPosition(newPosition);
    };

    // Métodos get y set para connected
    const getConnected = (): number => {
        return currentConnected;
    };

    const setConnected = (newConnected: number): void => {
        setCurrentConnected(newConnected);
    };

    useEffect(() => {
            setConnected(connected || 0);
        }, [connected]);

    // Exponer métodos a través de la ref
    React.useImperativeHandle(ref, () => ({
        getId,
        setId,
        getPosition,
        setPosition,
        getConnected,
        setConnected,
        getElement: () => elementRef.current
    }));

    // Determinar el color basado en el estado connected
    const getBackgroundColor = (): string => {
        switch (currentConnected) {
            case 1:
                return '#00aa00';
            case 2:
                return '#ff0000';
            default:
                return '#cccccc';
        }
    };

    // Determinar la clase CSS basada en la posición
    const getClassName = (): string => {
        return `connection-point-${currentPosition}`;
    };

    return (
        <div
            ref={elementRef}
            className={getClassName()}
            style={{
                backgroundColor: getBackgroundColor()
            }}
        ></div>
    );
});

ConnectionPoint.displayName = 'ConnectionPoint';

export default ConnectionPoint;

// Tipos exportados para uso en otros componentes
export type { ConnectionPointProps };

// Referencia extendida para acceso a métodos públicos
export interface ConnectionPointRef {
    getId: () => string;
    setId: (newId: string) => void;
    getPosition: () => 'top' | 'bottom' | 'left' | 'right';
    setPosition: (newPosition: 'top' | 'bottom' | 'left' | 'right') => void;
    getConnected: () => number;
    setConnected: (newConnected: number) => void;
    getElement: () => HTMLDivElement | null;
}
