import {formas,patron} from "./patron"

const ValorValle=0.05;//valor de las diferencias para determinar las formas
const ValorColina=0.1;
const ValorMontana=0.3;
const NotasIgnoradas=16;//nos quedamos con un 17avo de la cancion
const DistanciaNotas=0.001;//la distancia que queda entre numeros despues de 
//ignorar ese 17avo

export class Song{//representacion del envolvente L de una cancion con sus formas
    private
    inicio:number;
    final:number;
    samples:Array<patron>;//las formas con las que contaba

    constructor(pLeftEnvolvent:Array<number>){//construlle el arreglo [[angulo,forma]]
        this.inicio=0;//inicio de la cancion siempre
        this.final=pLeftEnvolvent.length*NotasIgnoradas;
        let pendienteTemp=0;
        this.samples=new Array();
        for(let index=0;index<pLeftEnvolvent.length;index++){
            pendienteTemp=(pLeftEnvolvent[index+1]-pLeftEnvolvent[index]);//la diferencia 
            //entre los x siempre seria 0.01 por la manera en que lo armamos al principio
            this.samples.push(new patron(index*DistanciaNotas,(index*DistanciaNotas)
            +DistanciaNotas,pendienteTemp));//todavia no sabemos las formas
            //simplemente estamos calculando pendientes, para despues ordenarlas
        }
        
    }

    ordenarFormas():void{
        this.samples=this.samples.sort((n1,n2) => {//ordenamos las pendientes de menor a mayor
            if(n1[0] > n2[0]){
                return 1;
            }
            if(n1[0] < n2[0]){
                return -1;
            }
            return 0;
        })
    }

    contarFormas():Array<[formas,number]>{//asume las pendiente ordenadas de menor a mayor
        let totalCount:Array<[formas,number]>=new Array();// lista que nos dira cuantos
        //de cada forma hay           
        let formaActual=formas.PrecipicioDown,//empezamos desde la forma con el valor de 
        //pendiente mas pequena
        banderaActual=-ValorMontana,//empezamos con el valor minimo a superar para cambiar de forma
        formaActualCounter=0;//un contador que se reiniciara cada vez que 
        //cambiemos de forma
        for(let index=0;index<this.samples.length;index++,formaActualCounter++){
            if(this.samples[index].getPendiente()>banderaActual){//todos los anterior tienen una pendiente que 
                //cabe dentro de la misma categoria, pero el actual varia entonces
                //cambiamos la categoria
                this.changeBandera(banderaActual);
                totalCount.push([formaActual,formaActualCounter])//ya no habran mas de la
                //forma actual entonces insertarmos lo que llevamos antes de hacer el cambio
                formaActual++;formaActualCounter=0;//resetear el contador de formas
            }
            this.samples[index].setForm(formaActual);
        }
        totalCount.push([formaActual,formaActualCounter]);//el ultimo no seria metido debido 
        //a que termina el for. por eso lo pongo al final.
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

    changeBandera(pBanderaActual:number):number{//es llamada cuando se encuentra un 
        //valor mayor a la bandera previamente puesta
        switch (pBanderaActual){
            case -ValorMontana:return -ValorColina;
            case -ValorColina:return -ValorValle;
            case -ValorValle:return ValorValle;
            case ValorValle:return ValorColina;
            case ValorColina:return ValorMontana;
            case ValorMontana:return 1;//no puede haber un valor mas grande que 1
        }
    }
}