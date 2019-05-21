import {Song} from './song'
import {readAudio} from './audio'

let audioLargo;
let audioCorto="1MG.wav";
/*function main(){
  audioLargo = process.argv[2];  
  audioCorto = process.argv[3];  
}


main();*/

//main the pruebas
let audioArr=readAudio(audioCorto);
let cancion= new Song(audioArr);
const sorted = cancion.contarFormas();
console.log("sorted");
console.log(sorted);

