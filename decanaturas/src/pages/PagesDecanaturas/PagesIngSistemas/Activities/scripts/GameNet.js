import {Parameters} from "core/scripts/Parameters.js"

const parameters = Parameters();

export function validationIpComputerServer(computerIp, serverIp){
    var isConnected = false;
    var computerIpList = stringToIntegerList(computerIp);
    var serverIpList = stringToIntegerList(serverIp);
    computerIpList.forEach((num, index) => {
        if (num !== serverIpList[index]) {
            if(index === computerIpList.length - 1 && num < serverIpList[index]){
                console.log("Validating connection between computer IP: " + computerIp + " and server IP: " + serverIp);
                isConnected = true;
            }
        }
    });
    return isConnected;
}

function stringToIntegerList(inputString) {
        // Verificar si el string es válido
        if (!inputString || typeof inputString !== 'string') {
            return [];
        }
        
        // Separar por puntos y convertir cada parte a entero
        const parts = inputString.split('.');
        const integerList = parts.map(part => {
            const num = parseInt(part.trim(), 10);
            return isNaN(num) ? 0 : num; // Si no es un número válido, usar 0
        });
        
        return integerList;
    }
    


export function parseNetworkConfig(newConfig) {
    var config = JSON.parse(JSON.stringify(parameters.INGSIS_GAMENETNETWORKJSON));
    const grupoAMatch = newConfig.match(/grupoA\s*=\s*(\[[^\]]+\])/);
    const grupoAIPs = parseArrayString(grupoAMatch[1]);
    const grupoBMatch = newConfig.match(/grupoB\s*=\s*(\[[^\]]+\])/);
    const grupoBIPs = parseArrayString(grupoBMatch[1]);
    const servidorAMatch = newConfig.match(/servidorA\s*=\s*["']([^"']+)["']/);
    const servidorBMatch = newConfig.match(/servidorB\s*=\s*["']([^"']+)["']/);
    const servidorAIPs =parseArrayString(servidorAMatch[1]);
    const servidorBIPs =parseArrayString(servidorBMatch[1]);
    console.log(grupoAIPs);
    config.groups[0].computers = grupoAIPs.map((ipN) => ({
        ip: ipN,
        isConnected: validationIpComputerServer(ipN, servidorAIPs[0])
    }));
    console.log(config.groups[0].computers);
    config.groups[1].computers = grupoBIPs.map((ip) => ({
        ip: ip,
        isConnected: validationIpComputerServer(ip, servidorBIPs[0])
    }));
    // Extraer servidorA
    config.servers[0].ip = servidorAIPs[0];
    // Extraer servidorB
    config.servers[1].ip = servidorBIPs[0];
    return config;
}

export function initializeNetworkconfig(code){
    const config = JSON.parse(JSON.stringify(parameters.INGSIS_GAMENETNETWORKJSON));
     const grupoAMatch = code.match(/grupoA\s*=\s*(\[[^\]]+\])/);
    const grupoAIPs = parseArrayString(grupoAMatch[1]);
    // Convertir strings a objetos con ip e isConnected
    config.groups[0].computers = grupoAIPs.map((ip) => ({
        ip: ip,
        isConnected: false
    }));
    // Extraer grupoB usando regex más robusta
    const grupoBMatch = code.match(/grupoB\s*=\s*(\[[^\]]+\])/);
    const grupoBIPs = parseArrayString(grupoBMatch[1]);
    // Convertir strings a objetos con ip e isConnected
    config.groups[1].computers = grupoBIPs.map((ip) => ({
        ip: ip,
        isConnected: false
    }));
    // Extraer servidorA
    const servidorAMatch = code.match(/servidorA\s*=\s*["']([^"']+)["']/);
    config.servers[0].ip = servidorAMatch[1];
    // Extraer servidorB
    const servidorBMatch = code.match(/servidorB\s*=\s*["']([^"']+)["']/);
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

