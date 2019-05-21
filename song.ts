import {formas,patron} from "./patron"

const ValorValle=0.05;//valor de las diferencias para determinar las formas
const ValorColina=0.1;
const ValorMontana=0.3;
export const NotasIgnoradas=16;//nos quedamos con un 17avo de la cancion
const DistanciaNotas=0.001;//la distancia que queda entre numeros despues de 
//ignorar ese 17avo

export class Song{//representacion del envolvente L de una cancion con sus formas
    private
    inicio:number;
    final:number;
    samples:Array<patron>;//las formas con las que contaba

    constructor(pLeftEnvolvent:Array<number>){//construlle el arreglo [[angulo,forma]]
        this.inicio=0;//inicio de la cancion siempre        
        let pendienteTemp=0,index;
        this.samples=new Array();
        for(index=0;index<pLeftEnvolvent.length-1;index++){
            pendienteTemp=(pLeftEnvolvent[index+1]-pLeftEnvolvent[index]);//la diferencia 
            //entre los x siempre seria 0.01 por la manera en que lo armamos al principio
            this.samples.push(new patron(index*DistanciaNotas,(index*DistanciaNotas)
            +DistanciaNotas,pendienteTemp));//todavia no sabemos las formas
            //simplemente estamos calculando pendientes, para despues ordenarlas
        }     
        this.final=index*NotasIgnoradas;
        console.log(this.final);
    }

    /*ordenarFormas():Array<patron>{
        return this.samples.sort((PatronA:patron,PatronB:patron)=>{
            if(PatronA.pendiente > PatronB.pendiente)return 1;
            if(PatronA.pendiente < PatronB.pendiente)return 0;
            return 0;
        })
    }*/

    contarFormas(){//asume las pendiente ordenadas de menor a mayor
        let totalCount=[[formas.PrecipicioDown,0],
                            [formas.MontanaDown,0],
                            [formas.ColinaDown,0],
                            [formas.Valle,0],
                            [formas.ColinaUp,0],
                            [formas.MontanaUp,0],
                            [formas.PrecipicioUp,0]];// lista que nos dira cuantos
        //de cada forma hay
        let formaTemp=-1;
        for(let index=0;index<this.samples.length;index++){
            formaTemp=this.asignarForma(this.samples[index].pendiente);
            totalCount[formaTemp][1]++;
        }
        return totalCount;
    }

    extendLeng(pNewLeng:number){//permite estirar una cancion
        //asume que las formas ya no estan ordenadas. es necesario que esten en el orden en
        //que vinieron para poder hacer la expansion.
        let relacionLongitudes=pNewLeng/this.samples.length,lastChanged;
        this.samples[0].setFinal(relacionLongitudes);
        lastChanged=relacionLongitudes;
        for(let index=1;index<this.samples.length;index++){
            this.samples[index].setInicio(lastChanged);
            this.samples[index].setFinal(lastChanged+relacionLongitudes);
            lastChanged+=relacionLongitudes;
        }
    }

    private asignarForma(pPendiente):formas{//no tuve mas opcion que usar el if masivo
        if(pPendiente==0){
            return formas.Valle;
        }
        if(pPendiente>0){
            if(pPendiente<ValorValle){
                return formas.Valle;
            }else if(pPendiente<ValorColina){
                return formas.ColinaUp;
            }else if(pPendiente<ValorMontana){
                return formas.MontanaUp;
            }else{
                return formas.PrecipicioUp;
            }
        }else{
            if(pPendiente>-ValorValle){
                return formas.Valle;
            }else if(pPendiente>-ValorColina){
                return formas.ColinaDown;
            }else if(pPendiente>-ValorMontana){
                return formas.MontanaDown;
            }else{
                return formas.PrecipicioDown;
            }
        }        
    }
    /*changeBandera(pBanderaActual:number):number{//es llamada cuando se encuentra un 
        //valor mayor a la bandera previamente puesta
        switch (pBanderaActual){
            case -ValorMontana:return -ValorColina;
            case -ValorColina:return -ValorValle;
            case -ValorValle:return ValorValle;
            case ValorValle:return ValorColina;
            case ValorColina:return ValorMontana;
            case ValorMontana:return 1;//no puede haber un valor mas grande que 1
        }
    }*/
}

function compare( pPendiente1, pPendiente2){
    if(pPendiente1 < pPendiente2){
        return -1;
    }
    if(pPendiente1 > pPendiente2){
        return 1;
    }
    return 0;
}