import {Song} from './song'
import {readAudio} from './audio'

//crear poblacion
//funcion fitness
//repeat
//-|> se puede salir una vez la distribucion varie un total de %

export function compose(pShortSong:string,pLongSong:string){
    let shortEnvolvement=readAudio(pShortSong),longEvolvement=readAudio(pLongSong);
    let shortSong= new Song(shortEnvolvement),longSong=new Song(longEvolvement);
    shortSong.extendLeng(longSong.final);//la extendemos para que haga match con la larga
    let shortStats= shortSong.contarFormas(),longStats= longSong.contarFormas();
    const bitToBe;
    }

export function generarPoblacion(){

}