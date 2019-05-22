import {NotasIgnoradas, Song} from './song'
import {randomize} from './evolucion'
const fs = require('fs');
const decode = require('node-wav');
const encode = require('wav-encoder');


export function readAudio(pAudioName):Array<number>{
    /**Recibe el nombre del archivo
     * incluyendo el .wav
     * Exm: readAudio("prueba.wav")
     */
    let buffer = fs.readFileSync(pAudioName);
    let audioData = decode.decode(buffer); 
    let envolventL=new Array<number>(),index=0;
    while(typeof(audioData.channelData[0][index])=="number"){
        envolventL.push(audioData.channelData[0][index]);
        index+=NotasIgnoradas;
    }
    return envolventL;//solo devuelve el canal L
}

export function saveAudio(pLeftChannelArray,pRightChannelArray){
    /*Recibe 2 parametros, 2 arrays uno por cada canal (L,R)*/
    const newSong = {
        sampleRate: 16000,
        channelData: [pLeftChannelArray,pRightChannelArray]
    }

    encode.encode(newSong).then((buffer)=> {
        fs.writeFileSync('compose.wav', new Buffer(buffer));
    } );
}

export function addNotes(pDataArray, pSong, pCantNotesS1){
    /**La funcion recibira un array de suarrays donde cada uno tendra el codigo de forma y la cantidad respectiva
     * Se iran comparando valores de pSong para poder rellenar los gaps entre valores 
     */
    let final32FloatArray;
    let samplesArray = pSong.samples;
    for (let index = 0; index< samplesArray.length; index++){
        final32FloatArray.push(samplesArray[index].bNote, samplesArray[index].eNote);
        //se analiza el index y su sucesor para ver con cuantas notaas rellenar
        let cantNotesRefill = samplesArray[index+1].inicio - samplesArray[index].final;
        let valueForm = pSong.asignarForma(samplesArray[index+1].inicio - samplesArray[index].final);
        cantNotesRefill /= pCantNotesS1;
        let min = Math.min(samplesArray[index].eNote,samplesArray[index+1].bNote);
        let max = Math.max(samplesArray[index].eNote,samplesArray[index+1].bNote);
        while(cantNotesRefill!=0){
            cantNotesRefill--;
            final32FloatArray.push(randomize(min,max));
            pDataArray[valueForm][1]--;
        }
    }
    return final32FloatArray;
}