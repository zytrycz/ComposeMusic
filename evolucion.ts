import {Song,PatronesBase} from './song'
import {formas} from './patron'
import {readAudio} from './audio'
import {createTable,dictionary} from './genetic'
import {combineBits} from './bits'
//crear poblacion
//funcion fitness
//repeat
//-|> se puede salir una vez la distribucion varie un total de %

export function compose(pShortSong:string,pLongSong:string){
    let shortEnvolvement=readAudio(pShortSong),longEvolvement=readAudio(pLongSong);
    let shortSong= new Song(shortEnvolvement),longSong=new Song(longEvolvement);
    shortSong.extendLeng(longSong.final);//la extendemos para que haga match con la larga
    let shortStats= shortSong.contarFormas(),longStats= longSong.contarFormas();
    const bitsFromShort= createTable(shortStats);
    
    }

export function generarPoblacion(pPastState:Array<[formas,number]>)
{

}

export function fitness(pPoblacion,pCondicion){
    let diferenciasEncontradas=PatronesBase;
    let soleSurvivors=0;
    while(soleSurvivors<diferenciasEncontradas.length){
        
    }
    for(let index=0;index<diferenciasEncontradas.length;index++){
        if(pPoblacion[index][1]>pCondicion[index][1]){//must kill->un porcentaje de la diferencia morira
            lessFitness(pPoblacion[index],(pCondicion[index][1]/pPoblacion[index][1]));
        }else if(pPoblacion[index][1]<pCondicion[index][1]){//must procreate
            plusFitness();
        }//must survive
    }
    return diferenciasEncontradas;

}

function lessFitness(pPoblacion:Array<[formas,number]>,pChosenForm:formas,pPorcentaje:number){//matar poblacion
    let maxRange=pPoblacion.length*pPorcentaje;
    pPoblacion[pChosenForm][1]-=maxRange;//"matar cantidad de formas"
}

function plusFitnessp(pPoblacion:Array<[formas,number]>,pPorcentaje:number,
    diccionario:dictionary,pChosenForm){
    let maxRange=pPoblacion[pChosenForm].length-1,bitCombinable,bit1,bit2;
    for(let gonnaCreate= randomize(maxRange,1);gonnaCreate>0;gonnaCreate--){
        bit1=diccionario[pChosenForm]
        [(randomize(diccionario[pChosenForm][0]+maxRange,diccionario[pChosenForm][0]))];
        bit2=diccionario[pChosenForm]
        [(randomize(diccionario[pChosenForm][0]+maxRange,diccionario[pChosenForm][0]))];
        bitCombinable=combineBits(bit1,bit2);
    }
}

function mutar(pNum1){
    randomize
}

function randomize(pNum1:number,pNum2:number):number{
    return Math.floor(Math.random()*(pNum1-pNum2+1)-pNum2);
}

3