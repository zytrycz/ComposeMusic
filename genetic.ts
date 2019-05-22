import { formas } from "./patron";

const max = 65535;

var arrayToSlice = Array.apply(null, {length: max}).map(Number.call, Number);

/** Se usara esta interface para tener una estructura de dicionario */
export interface dictionary {
    [cromosome: number] : any;
}

let dictionary: dictionary = {};

function getCantNums(pCant){
    //vemos cuanto porcentaje del total (65535) representa el cromosoma
    let numPercent = pCant/max;
    //Vemos la cantidad de numeros maxima posible con ese porcentaje
    return Math.floor(numPercent*max);     
}

export function createTable(pData){
    /** In: array[ [cromosome1,cant],
     *             [cromosome2,cant], ... ] */
    for(let index = 0; index < pData.length; index++) {
        let copyArray = Object.assign([], arrayToSlice);
        let cant = getCantNums(pData[index][1]);        
        /**Se usa slice y la cantidad de numneros en negativo para que devuelvva esa cantidad de valores
         * se hace un reverse a todo el array para que corte los nums en orden
         * se le vuelve a hacer reverse para que queden en orden
         * por ultimo se cortan los numeros usados del array
         */
        dictionary[pData[index][0]] = ((copyArray.reverse() ).slice( cant*-1)).reverse(); 
        arrayToSlice = arrayToSlice.slice(cant);
    };
    return dictionary;
}
//createTable([["A",32767],["b",16383],["c",16383]]);
//let p = [1,2,3,4,5,6,7,8,9];
//console.log(p.slice(3));
/**iterar sobre el diccionario 
 * Object.keys(dictionary).forEach((key) => {console.log(dictionary[key])});
*/
 
export function findIfBelongs(pkey,pDictionary,pNumberToFind):boolean{
    return pDictionary[pkey].includes(pNumberToFind);
}

export function keyIfBelongs(pDictionary:dictionary,pNumberToFind):number{
    for(let index=0;index<7;index++){
        if(findIfBelongs(index,pDictionary,pNumberToFind)){
            return index;
        }
    }
    return -1;//que no esta
}