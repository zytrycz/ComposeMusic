const fs = require('fs');
const decode = require('node-wav');
const encode = require('wav-encoder');

export function readAudio(pAudioName){
    /**Recibe el nombre del archivo
     * incluyendo el .wav
     * Exm: readAudio("prueba.wav")
     */
    let buffer = fs.readFileSync(pAudioName);
    let audioData = decode.decode(buffer); 
    return audioData;
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
