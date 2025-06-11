export function Parameters() {
    return {
        APP: "App",
        INGSISTEMAS_ACTIVITY: "/ing-sistemas/actividad",
        INGIA_ACTIVITY: "/ing-IA/actividad",
        INGIESTADISTICA_ACTIVITY: "/ing-estadistica/actividad",
        INGICIBERSEGURIDAD_ACTIVITY: "/ing-ciberseguridad/actividad",
        INCIBER_CODE: "La ciberseguridad no es solo tecnología, sino también personas. Tenga cuidado con los piratas informáticos.",
        INGSIS_GAMESNAKEMESSAGE:`Control de movimiento de la culebra
move = [0, 0]  # [movimientos en la fila, movimientos en la columna]
Prueba moverlo 1, 0 y luego 0,-1`,
        INGSIS_GAMENETNETWORKJSON:{
            groups: [
                { 
                    id: "A", 
                    computers: [
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false }
                    ]
                },
                { 
                    id: "B", 
                    computers: [
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false },
                    { ip: "", isConnected: false }
                    ]
                }
            ],
            servers: [
                { 
                    id: "A",
                    ip: "",
                    computerConnected: false,
                    cloudConnected: false
                },
                { 
                    id: "B",
                    ip: "",
                    computerConnected: false,
                    cloudConnected: false
                }
            ],
            cloud:[
                {
                    ip: "192.168.0.100"
                },
                {
                    ip:"192.168.1.100"
                }
            ]

        } 
    };
}