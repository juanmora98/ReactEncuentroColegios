import {Parameters} from "core/scripts/Parameters.js"

const parameters = Parameters();

export function validationIpServerCloud(serverIp, cloudIp){
    var isConnected = true;
    var cloudIpList = stringToIntegerList(cloudIp);
    var serverIpList = stringToIntegerList(serverIp);
    cloudIpList.forEach((num, index) => {
        if (num !== serverIpList[index]) {
            isConnected = false;
        }
    });
    return isConnected;
}

export function validationIpComputerServer(computerIp, server){
    var isConnected = false;
    var computerIpList = stringToIntegerList(computerIp);
    var serverIpList = stringToIntegerList(server.ip);
    computerIpList.forEach((num, index) => {
        if (num !== serverIpList[index]) {
            if(index === computerIpList.length - 1 && num < serverIpList[index]){
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
    
export function parseNetworkConfig(newConfig, oldConfig) {
    var config = JSON.parse(JSON.stringify(oldConfig));
    const grupoAMatch = newConfig.match(/grupoA\s*=\s*(\[[^\]]+\])/);
    const grupoAIPs = parseArrayString(grupoAMatch[1]);
    const grupoBMatch = newConfig.match(/grupoB\s*=\s*(\[[^\]]+\])/);
    const grupoBIPs = parseArrayString(grupoBMatch[1]);
    //Si quiero que funcione asi tengo que volver la entrada una lista para que funcione bien si no no va a funcionar
    const servidorAMatch = newConfig.match(/servidorA\s*=\s*["']([^"']+)["']/);
    const servidorBMatch = newConfig.match(/servidorB\s*=\s*["']([^"']+)["']/);
    const servidorAIPs =parseArrayString(servidorAMatch[1]);
    const servidorBIPs =parseArrayString(servidorBMatch[1]);
    // Extraer servidorA
    config.servers[0].ip = servidorAIPs[0];
    // Extraer servidorB
    config.servers[1].ip = servidorBIPs[0];
    config.groups[0].computers = grupoAIPs.map((ipN, index) => ({
        ip: ipN,
        isConnected: validationIpComputerServer(ipN, config.servers[0])
    }));
    config.groups[1].computers = grupoBIPs.map((ip, index) => ({
        ip: ip,
        isConnected: validationIpComputerServer(ip, config.servers[1])
    }));
    
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

