import {Song,NotasIgnoradas} from './song'
import {formas} from './patron'
import {readAudio} from './audio'
import {createTable,dictionary,keyIfBelongs} from './genetic'
import {combineBits,getBit,setBit,clearBit} from './bits'

const ValorMutacion=635;
const TopCeiling=10000;
//crear poblacion ->done
//funcion fitness ->
//repeat
//-|> se puede salir una vez la distribucion varie un total de %

export function compose(pShortSong:string,pLongSong:string){//devuelve una tabla
    let shortEnvolvement=readAudio(pShortSong),longEvolvement=readAudio(pLongSong);
    //Obtener el L de cada cancion
    let shortSong= new Song(shortEnvolvement),longSong=new Song(longEvolvement);
    //Crear el Objeto Song de cada cancion
    shortSong.extendLeng(longSong.final);
    //la extendemos para que haga match con la larga
    const shortStats= shortSong.contarFormas();
    //poblacion meta
    let longStats= longSong.contarFormas();
    //primera poblacion
    const bitsFromShort= createTable(shortStats);
    //let diccionarioTemp= createTable(longStats);
    return fitness(longStats,shortStats,bitsFromShort);
    }
/*
export function generarPoblacion(pPastState:Array<[formas,number]>)
{

}*/

export function fitness(pPoblacion,pCondicion,diccionario){
    let soleSurvivors=0,genCounter=0,cantProduce=0,
    totalP=totalForms(pPoblacion),totalC=totalForms(pCondicion);
    while(soleSurvivors<6){
        soleSurvivors=0;
        console.log("generacion",genCounter);genCounter++;
        for(let index=0;index<pCondicion.length;index++){
            if(pPoblacion[index][1]/totalP>pCondicion[index][1]/totalC){//must kill->un porcentaje de la diferencia morira
                cantProduce+=lessFitness(pPoblacion[index],(pCondicion[index][1]/pPoblacion[index][1]));
            }else if(pPoblacion[index][1]/totalP<pCondicion[index][1]/totalC){//must procreate
                cantProduce-=plusFitness(pPoblacion,(pCondicion[index][1]/pPoblacion[index][1]),
                diccionario,index,cantProduce);
            }else{
                soleSurvivors++//must survive
            }
        }
        //la poblacion ya para aca ha cambiado, lo que se crea aca es un nuevo
        //diccionario basado en la nueva distribucion
    }
    return pPoblacion;
}

function lessFitness(pPoblacion:[formas,number],pPorcentaje:number){//matar poblacion
    let maxRange=pPoblacion[1] *pPorcentaje;
    let answer= randomize( maxRange,1)
    pPoblacion[1]-= answer;//"matar cantidad de formas"
    return answer;
}

function plusFitness(pPoblacion:Array<[formas,number]>,pPorcentaje:number,
    diccionario:dictionary,pChosenForm,pCantProduce){
    let maxRange=pPoblacion[pChosenForm][1]*pPorcentaje,bitCombinable,bit1,bit2,producidos=0;
    if(pCantProduce<maxRange){
        maxRange=pCantProduce;
    }
    for(let gonnaCreate= randomize(maxRange,1);gonnaCreate>0;gonnaCreate--){
        bit1=diccionario[pChosenForm]
        [(randomize(diccionario[pChosenForm][0]+maxRange,diccionario[pChosenForm][0]))];
        //escoger padre
        bit2=diccionario[pChosenForm]
        [(randomize(diccionario[pChosenForm][0]+maxRange,diccionario[pChosenForm][0]))];
        //escoger madre
        bitCombinable=combineBits(bit1,bit2);//crea hijo
        mutar(bitCombinable);//muta hijo
        //ver a que grupo pertenece el nuevo hijo
        let grupoDeHijo=keyIfBelongs(createTable(pPoblacion),bitCombinable);
        if(grupoDeHijo!=-1){
            pPoblacion[grupoDeHijo][1]++;//uno mas a la forma que pertenezca
            producidos++;
        }        
    }
    return producidos;
}

function mutar(pNum1){
    if(randomize(TopCeiling,1)>ValorMutacion){
        let chosenPos=randomize(NotasIgnoradas,1)
        if(getBit(pNum1,chosenPos)==1){
            clearBit(pNum1,chosenPos);
        }else{
            setBit(pNum1,chosenPos);
        }
    }
}

export function randomize(pNum1:number,pNum2:number):number{
    return Math.floor(Math.random()*(pNum1-pNum2+1)-pNum2);
}

function totalForms(pShortSong:Array<[formas,number]>){
    let total=0;
    for(let index=0;index<pShortSong.length;index++){
        total+=pShortSong[index][1];
    }
    return total;
}
