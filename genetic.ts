const max = 65535;

var arrayToSlice = Array.apply(null, {length: max}).map(Number.call, Number);

/** Se usara esta interface para tener una estructura de dicionario */
interface dictionary {
    [cromosome: string] : any;
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
    for(let index = 0; index < pData.lenght; index++) {
        let cant = getCantNums(pData[index][1]);        
        /**Se usa slice y la cantidad de numneros en negativo para que devuelvva esa cantidad de valores
         * se hace un reverse a todo el array para que corte los nums en orden
         * se le vuelve a hacer reverse para que queden en orden
         * por ultimo se cortan los numeros usados del array
         */
        dictionary[ pData[index][0] ] = ((arrayToSlice.reverse()).slice( cant*-1)).reverse(); 
        arrayToSlice = arrayToSlice.slice(cant);
    };
    
}

//let p = [1,2,3,4,5,6,7,8,9];
//console.log(p.slice(3));
/**iterar sobre el diccionario 
 * Object.keys(dictionary).forEach((key) => {console.log(dictionary[key])});
*/
