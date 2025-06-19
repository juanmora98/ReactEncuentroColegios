export function NumberGenerator(listSize, number, id){
    const numberActive = parseInt(number.replace(id, ""));
    if(numberActive === listSize){
        return 1;
    }
    else{
        return numberActive + 1;
    }
}
