export function isConnected(currentIP, currentConnectedToServer) {
    var connected = 0;
    if(currentIP){
        connected = 2;
        if(currentConnectedToServer){
            connected = 1;
        }
    }
    return connected;
}

export function refAsignation(pointRefList, position) {
    var ref = pointRefList[0];
    if (position === "bottom"){
        ref = pointRefList[1];
    }
    return ref;
}