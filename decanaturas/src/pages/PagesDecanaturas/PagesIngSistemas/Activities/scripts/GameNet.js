import {Parameters} from "core/scripts/Parameters.js"

const parameters = Parameters();

export function conectarRed(props) {
    const code = document.getElementById("code3").value;

    try {
        const grupoA = eval(code.match(/grupoA\s*=\s*(\[[^\]]+\])/)[1]);
        const grupoB = eval(code.match(/grupoB\s*=\s*(\[[^\]]+\])/)[1]);
        const servidorA = code.match(/servidorA\s*=\s*"([^"]*)"/)[1]; // Extraer IP del Servidor A
        const servidorB = code.match(/servidorB\s*=\s*"([^"]*)"/)[1]; // Extraer IP del Servidor B
        const nube = ["192.168.0.100", "192.168.1.100"];

        // Validar duplicados en las IPs
        if (tieneDuplicados([...grupoA, servidorA])) {
            document.getElementById("resultado3").textContent = "Error: Hay IPs duplicadas en el Grupo A o Servidor A.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }
        if (tieneDuplicados([...grupoB, servidorB])) {
            document.getElementById("resultado3").textContent = "Error: Hay IPs duplicadas en el Grupo B o Servidor B.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        // Validar conexión de los servidores con la nube
        const servidorAConectado = servidorA === nube[0];
        const servidorBConectado = servidorB === nube[1];

        if (!servidorAConectado || servidorA === "") {
            document.getElementById("resultado3").textContent = "Error: La IP del Servidor A no concuerda con la IP de la nube.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        if (!servidorBConectado || servidorB === "") {
            document.getElementById("resultado3").textContent = "Error: La IP del Servidor B no concuerda con la IP de la nube.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        // Validar que las IPs de los computadores formen parte de la IP del servidor
        const servidorAPrefijo = servidorA.split('.').slice(0, 3).join('.');
        const servidorBPrefijo = servidorB.split('.').slice(0, 3).join('.');

        if (!grupoA.every(ip => ip === "" || ip.startsWith(servidorAPrefijo))) {
            document.getElementById("resultado3").textContent = `Error: Todas las IPs del Grupo A deben comenzar con "${servidorAPrefijo}."`;
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        if (!grupoB.every(ip => ip === "" || ip.startsWith(servidorBPrefijo))) {
            document.getElementById("resultado3").textContent = `Error: Todas las IPs del Grupo B deben comenzar con "${servidorBPrefijo}."`;
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        const red = document.getElementById("redVisual");
        red.innerHTML = "";

        let conectadosA = 0, conectadosB = 0;
        let cloudReady = servidorAConectado && servidorBConectado;

        // Mostrar Grupo A
        grupoA.forEach((ip, i) => {
            const div = document.createElement("div");
            div.className = "network-node" + (ip ? " connected" : "");
            div.textContent = `💻 A${i + 1}\n${ip || "sin IP"}`;
            red.appendChild(div);
            if (ip) conectadosA++;
        });

        // Servidor A
        const serverADiv = document.createElement("div");
        if (servidorA === nube[0]) {
            serverADiv.className = "network-node connected";
        }
        else {
            serverADiv.className = "network-node server";
        }
        serverADiv.textContent = `🖥️ Servidor A\n${servidorA || "sin IP"}`;
        red.appendChild(serverADiv);

        // Mostrar Grupo B
        grupoB.forEach((ip, i) => {
            const div = document.createElement("div");
            div.className = "network-node" + (ip ? " connected" : "");
            div.textContent = `💻 B${i + 1}\n${ip || "sin IP"}`;
            red.appendChild(div);
            if (ip) conectadosB++;
        });

        // Servidor B
        const serverBDiv = document.createElement("div");
        if (servidorB === nube[1]) {
            serverBDiv.className = "network-node connected";
        }
        else {
            serverBDiv.className = "network-node server";
        }
        serverBDiv.textContent = `🖥️ Servidor B\n${servidorB || "sin IP"}`;
        red.appendChild(serverBDiv);

        // Nube
        const cloudDiv = document.createElement("div");
        cloudDiv.className = "network-node cloud";
        cloudDiv.textContent = `🌐 Nube\n${nube.join(", ")}`;
        red.appendChild(cloudDiv);

        const r = document.getElementById("resultado3");
        if (conectadosA === 5 && conectadosB === 5 && cloudReady) {
            props.gamesInstance.validationActivities(2);
            props.onActivityComplete();
            r.textContent = "¡Red conectada exitosamente!";
            r.style.color = "green";
        } else {
            r.textContent = "Faltan conexiones o IPs. Asegúrate de conectar todos los PCs por grupo y ambos servidores a la nube.";
            r.style.color = "orange";
        }
    } catch (e) {
        document.getElementById("resultado3").textContent = "Error en el código. Verifica la sintaxis.";
    }
}

  // Función para verificar duplicados en un array
function tieneDuplicados(array) {
    const ips = array.filter(ip => ip); // Filtrar valores vacíos
    return new Set(ips).size !== ips.length;
}

export function reiniciarRed() {
    document.getElementById("code3").value = `Asigna IPs para conectar computadoras a sus servidores
y conecta servidores a la nube
grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""]
grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""]
servidorA = "192.168.0.100"
servidorB = "192.168.1.10"`;
    document.getElementById("redVisual").innerHTML = "";
    document.getElementById("resultado3").textContent = "";
    inicializarRed();
    //completado3 = false;
  }

export function inicializarRed() {
    const grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""];
    const grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""];
    const servidorA = "192.168.0.100"; // IP del Servidor A
    const servidorB = "192.168.1.10"; // IP del Servidor B
    const nube = ["192.168.0.100", "192.168.1.100"]; // Simula la nube

    const red = document.getElementById("redVisual");
    red.innerHTML = "";

    // Mostrar Grupo A
    grupoA.forEach((ip, i) => {
        const div = document.createElement("div");
        div.className = "network-node" + (ip ? " connected" : "");
        div.textContent = `💻 A${i + 1}\n${ip || "sin IP"}`;
        red.appendChild(div);
    });

    // Servidor A
    const serverADiv = document.createElement("div");
    if (servidorA === nube[0]) {
        serverADiv.className = "network-node connected";
    }
    else {
        serverADiv.className = "network-node server";
    }
    serverADiv.textContent = `🖥️ Servidor A\n${servidorA || "sin IP"}`;
    red.appendChild(serverADiv);

    // Mostrar Grupo B
    grupoB.forEach((ip, i) => {
        const div = document.createElement("div");
        div.className = "network-node" + (ip ? " connected" : "");
        div.textContent = `💻 B${i + 1}\n${ip || "sin IP"}`;
        red.appendChild(div);
    });

    // Servidor B
    const serverBDiv = document.createElement("div");
    if (servidorB === nube[1]) {
        serverBDiv.className = "network-node connected";
    }
    else {
        serverBDiv.className = "network-node server";
    }
    serverBDiv.textContent = `🖥️ Servidor B\n${servidorB || "sin IP"}`;
    red.appendChild(serverBDiv);

    // Nube
    const cloudDiv = document.createElement("div");
    cloudDiv.className = "network-node cloud";
    cloudDiv.textContent = `🌐 Nube\n${nube.join(", ")}`;
    red.appendChild(cloudDiv);
}

// Función para parsear el contenido del área de texto y extraer la configuración de red
export function parseNetworkConfig(codeText) {
    const config = parameters.INGSIS_GAMENETNETWORKJSON;
    // Extraer grupoA usando regex más robusta
    const grupoAMatch = codeText.match(/grupoA\s*=\s*(\[[^\]]+\])/);
    config.groups[0].computers = parseArrayString(grupoAMatch[1]);
    // Extraer grupoB usando regex más robusta
    const grupoBMatch = codeText.match(/grupoB\s*=\s*(\[[^\]]+\])/);
    config.groups[1].computers = parseArrayString(grupoBMatch[1]);
    // Extraer servidorA
    const servidorAMatch = codeText.match(/servidorA\s*=\s*["']([^"']+)["']/);
        config.servers[0].ip = servidorAMatch[1];
    // Extraer servidorB
    const servidorBMatch = codeText.match(/servidorB\s*=\s*["']([^"']+)["']/);
    config.servers[1].ip = servidorBMatch[1];
    return config;
}

// Función segura para parsear arrays de strings sin usar eval
function parseArrayString(arrayString) {
    // Remover corchetes y dividir por comas
    const cleanString = arrayString.replace(/[[\]]/g, '').trim();
    
    if (cleanString === '') {
        return [];
    }
    
    // Dividir por comas y limpiar cada elemento
    const elements = cleanString.split(',').map(element => {
        // Remover espacios y comillas
        const cleaned = element.trim().replace(/^["']|["']$/g, '');
        return cleaned === '' ? '' : cleaned;
    });
    
    return elements;
}

// Función auxiliar para validar formato básico de IP
function isValidIPFormat(ip) {
    if (!ip || typeof ip !== 'string') return false;
    
    const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipPattern);
    
    if (!match) return false;
    
    // Validar que cada octeto esté entre 0 y 255
    for (let i = 1; i <= 4; i++) {
        const octeto = parseInt(match[i]);
        if (octeto < 0 || octeto > 255) {
            return false;
        }
    }
    
    return true;
}

// Función para validar y establecer conexión entre computador y servidor
export function connectComputerToServer(computerRef, serverRef, connectionType = 'bottom') {
    if (!computerRef || !serverRef) {
        console.error('Referencias de computador o servidor no válidas');
        return {
            conectado: false,
            error: 'Referencias no válidas'
        };
    }

    try {
        // Obtener IPs de ambos componentes
        const computerIP = computerRef.getIP();
        const serverIP = serverRef.getIP();

        console.log(`Intentando conectar computador ${computerIP} con servidor ${serverIP}`);

        // Validar formato de IPs
        if (!isValidIPFormat(computerIP) || !isValidIPFormat(serverIP)) {
            return {
                conectado: false,
                error: 'Formato de IP inválido',
                computerIP,
                serverIP
            };
        }

        // Dividir IPs en octetos
        const computerOctets = computerIP.split('.');
        const serverOctets = serverIP.split('.');

        // Validar que los primeros 3 octetos sean iguales
        const primerosOctetosIguales = 
            computerOctets[0] === serverOctets[0] &&
            computerOctets[1] === serverOctets[1] &&
            computerOctets[2] === serverOctets[2];

        // Validar que el último octeto del computador sea menor que el del servidor
        const ultimoOctetoMenor = parseInt(computerOctets[3]) < parseInt(serverOctets[3]);        if (primerosOctetosIguales && ultimoOctetoMenor) {
            // ✅ CONEXIÓN VÁLIDA
            console.log(`✅ Conexión válida entre ${computerIP} y ${serverIP} (connectionType: ${connectionType})`);

            // Establecer estado de conexión en el computador
            computerRef.setConnectionStatus(true);
            computerRef.setConnectedIPs([serverIP]);

            // Obtener el punto de conexión específico del servidor
            let targetConnectionPoint;
            if (connectionType === 'top') {
                targetConnectionPoint = serverRef.getTopConnectionPoint();
            } else {
                targetConnectionPoint = serverRef.getBottomConnectionPoint();
            }

            if (targetConnectionPoint) {
                // Agregar la IP del computador a la lista de IPs conectadas del punto específico
                const connectedIPs = targetConnectionPoint.getConnectedIPs();
                if (!connectedIPs.includes(computerIP)) {
                    targetConnectionPoint.addConnectedIP(computerIP);
                }
                
                // Marcar el punto de conexión específico como conectado
                targetConnectionPoint.setConnectionStatus(true);
            } else {
                console.warn(`No se pudo obtener el punto de conexión ${connectionType} del servidor`);
            }

            return {
                conectado: true,
                computerIP,
                serverIP,
                connectionType,
                mensaje: `Computador ${computerIP} conectado exitosamente al servidor ${serverIP}`
            };

        } else {
            // ❌ CONEXIÓN INVÁLIDA
            let razonError = [];
            
            if (!primerosOctetosIguales) {
                razonError.push('Los primeros 3 octetos deben ser iguales');
            }
            
            if (!ultimoOctetoMenor) {
                razonError.push(`El último octeto del computador (${computerOctets[3]}) debe ser menor que el del servidor (${serverOctets[3]})`);
            }

            console.log(`❌ Conexión inválida: ${razonError.join(', ')}`);

            // Asegurar que ambos componentes marquen como desconectados
            computerRef.setConnectionStatus(false);
            computerRef.setConnectedIPs([]);

            // Remover la IP del computador del servidor si estaba conectada
            const serverConnectedIPs = serverRef.getConnectedIPs();
            if (serverConnectedIPs.includes(computerIP)) {
                serverRef.removeConnectedIP(computerIP);
            }

            return {
                conectado: false,
                computerIP,
                serverIP,
                error: razonError.join(', '),
                mensaje: `No se puede conectar ${computerIP} al servidor ${serverIP}: ${razonError.join(', ')}`
            };
        }

    } catch (error) {
        console.error('Error durante la validación de conexión:', error);
        return {
            conectado: false,
            error: `Error interno: ${error.message}`
        };
    }
}

// Función para desconectar un computador de un servidor
export function disconnectComputerFromServer(computerRef, serverRef, connectionType = 'bottom') {
    if (!computerRef || !serverRef) {
        console.error('Referencias de computador o servidor no válidas');
        return false;
    }

    try {
        const computerIP = computerRef.getIP();
        
        console.log(`Desconectando computador ${computerIP} del servidor (connectionType: ${connectionType})`);

        // Desconectar el computador
        computerRef.setConnectionStatus(false);
        computerRef.setConnectedIPs([]);

        // Obtener el punto de conexión específico del servidor
        let targetConnectionPoint;
        if (connectionType === 'top') {
            targetConnectionPoint = serverRef.getTopConnectionPoint();
        } else {
            targetConnectionPoint = serverRef.getBottomConnectionPoint();
        }

        if (targetConnectionPoint) {
            // Remover la IP del computador del punto de conexión específico
            targetConnectionPoint.removeConnectedIP(computerIP);

            // Si el punto de conexión no tiene más computadores conectados, marcarlo como desconectado
            const remainingConnections = targetConnectionPoint.getConnectedIPs();
            if (remainingConnections.length === 0) {
                targetConnectionPoint.setConnectionStatus(false);
            }        } else {
            console.warn(`No se pudo obtener el punto de conexión ${connectionType} del servidor`);
        }

        console.log(`✅ Computador ${computerIP} desconectado del servidor`);
        return true;

    } catch (error) {
        console.error('Error durante la desconexión:', error);
        return false;
    }
}

// Función para validar múltiples conexiones en lote
export function validateConnectionsBatch(connections) {
    const resultados = [];
    
    connections.forEach((conexion, index) => {
        const { computerRef, serverRef, connectionType } = conexion;
        console.log(`Validando conexión ${index + 1}/${connections.length}`);
        
        const resultado = connectComputerToServer(computerRef, serverRef, connectionType);
        resultados.push({
            indice: index,
            ...resultado
        });
    });

    const exitosas = resultados.filter(r => r.conectado).length;
    const fallidas = resultados.filter(r => !r.conectado).length;

    console.log(`📊 Resumen de conexiones: ${exitosas} exitosas, ${fallidas} fallidas`);
    
    return {
        total: connections.length,
        exitosas,
        fallidas,
        resultados
    };
}

