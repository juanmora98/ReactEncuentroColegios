export function isConnected(ip, isConnected) {
    var connected = 0;
    if(ip !== ""){
        connected = 2;
        if(isConnected){
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