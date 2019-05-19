

function getBit(pNum, pBitIndex)
{
    const bitMask = 1 << pBitIndex; // 00000001 se hace corrimiento para poner el 1 en el indice a buscar

    const result = pNum & bitMask;  // and dara 0 si el bit es 0, 1 si el bit es 1

    return result >>> pBitIndex;    //zero-fill shift a la derecha
}

function setBit (pNum, pBitIndex){

    const bitMask = 1 << pBitIndex; // 00000001 se hace corrimiento para poner el 1 en el indice a activar

    return pNum | bitMask;          // or dejara todos los bits iguales excepto el que se esta cambiando
}

function clearBit (pNum, pBitIndex){

    const bitMask = ~(1 << pBitIndex); // 00000001 se hace corrimiento para poner el 1 en el indice a apagar
                                       // se usa un not para invertir los valores

    return pNum & bitMask;             // and dejara todos los bits iguales excepto el que se esta cambiando
}

function combineBits (pNumber1, pNumber2){

    let newNumber=0;
    let answer=0;

    for (let index = 7; index < 16; index++){
        answer += getBit(pNumber1,index)==1 ? setBit(newNumber,index) : newNumber;
    }
    for (let index = 0; index < 7; index++){
        answer += getBit(pNumber2,index)==1 ? setBit(newNumber,index) : newNumber;
    }
    return answer;
}

console.log(combineBits(55830,0));