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
    try {
        const config = {
            grupoA: null,
            grupoB: null,
            servidorA: null,
            servidorB: null,
            nube: ["192.168.0.100", "192.168.1.100"], // IPs fijas de la nube
            errors: []
        };

        // Extraer grupoA usando regex más robusta
        const grupoAMatch = codeText.match(/grupoA\s*=\s*(\[[^\]]+\])/);
        if (grupoAMatch) {
            try {
                config.grupoA = parseArrayString(grupoAMatch[1]);
                // Validar que sea un array
                if (!Array.isArray(config.grupoA)) {
                    config.errors.push("grupoA debe ser un array");
                }
            } catch (e) {
                config.errors.push("Error al parsear grupoA: sintaxis inválida");
            }
        } else {
            config.errors.push("No se encontró la definición de grupoA");
        }

        // Extraer grupoB usando regex más robusta
        const grupoBMatch = codeText.match(/grupoB\s*=\s*(\[[^\]]+\])/);
        if (grupoBMatch) {
            try {
                config.grupoB = parseArrayString(grupoBMatch[1]);
                // Validar que sea un array
                if (!Array.isArray(config.grupoB)) {
                    config.errors.push("grupoB debe ser un array");
                }
            } catch (e) {
                config.errors.push("Error al parsear grupoB: sintaxis inválida");
            }
        } else {
            config.errors.push("No se encontró la definición de grupoB");
        }

        // Extraer servidorA
        const servidorAMatch = codeText.match(/servidorA\s*=\s*["']([^"']+)["']/);
        if (servidorAMatch) {
            config.servidorA = servidorAMatch[1];
            // Validar formato IP básico
            if (!isValidIPFormat(config.servidorA)) {
                config.errors.push("servidorA tiene un formato de IP inválido");
            }
        } else {
            config.errors.push("No se encontró la definición de servidorA");
        }

        // Extraer servidorB
        const servidorBMatch = codeText.match(/servidorB\s*=\s*["']([^"']+)["']/);
        if (servidorBMatch) {
            config.servidorB = servidorBMatch[1];
            // Validar formato IP básico
            if (!isValidIPFormat(config.servidorB)) {
                config.errors.push("servidorB tiene un formato de IP inválido");
            }
        } else {
            config.errors.push("No se encontró la definición de servidorB");
        }

        return config;

    } catch (error) {
        return {
            grupoA: null,
            grupoB: null,
            servidorA: null,
            servidorB: null,
            nube: ["192.168.0.100", "192.168.1.100"],
            errors: [`Error general al parsear el código: ${error.message}`]
        };
    }
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

// Función de prueba para demostrar el uso de parseNetworkConfig
export function testParseNetworkConfig(props) {
    const result = parseNetworkConfig(props);
    console.log("Resultado del parseo:", result);
    return result;
}
