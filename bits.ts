export function getBit(pNum, pBitIndex)
{
    const bitMask = 1 << pBitIndex; // 00000001 se hace corrimiento para poner el 1 en el indice a buscar

    const result = pNum & bitMask;  // and dara 0 si el bit es 0, 1 si el bit es 1

    return result >>> pBitIndex;    //zero-fill shift a la derecha
}

export function setBit (pNum, pBitIndex){

    const bitMask = 1 << pBitIndex; // 00000001 se hace corrimiento para poner el 1 en el indice a activar

    return pNum | bitMask;          // or dejara todos los bits iguales excepto el que se esta cambiando
}

export function clearBit (pNum, pBitIndex){

    const bitMask = ~(1 << pBitIndex); // 00000001 se hace corrimiento para poner el 1 en el indice a apagar
                                       // se usa un not para invertir los valores

    return pNum & bitMask;             // and dejara todos los bits iguales excepto el que se esta cambiando
}

export function combineBits (pNumber1, pNumber2){

    let newNumber=0; //variable usara para ir sumando los valores
    let answer=0;//variable que guardara la respuesta
    for (let index = 7; index < 16; index++){ //primer for para obtener bits del primer numero
        answer += getBit(pNumber1,index)==1 ? setBit(newNumber,index) : 0; //if acortado, le summa al nuevo numero la respuesta
                                                                              //si el bit solicitado ==1 pone lo activa en el nuevo tambien
    }
    for (let index = 0; index < 7; index++){ //primer for para obtener bits del segundo numero
        answer += getBit(pNumber2,index)==1 ? setBit(newNumber,index) : 0;
    }
    return answer;
}