export enum formas{
    PrecipicioDown,
    MontanaDown,
    ColinaDown,
    Valle,
    ColinaUp,
    MontanaUp,
    PrecipicioUp
}

export class patron{
    
    public pendiente:number;//valor de la pendiente
    public bNote:number;//begining note
    public eNote:number;//end Note
    private inicio:number;//segundo de inicio de la forma
    private final:number;//segundo de finalizacion de la forma
    private form:formas;//primero sera uno de los que teniamos antes y despues sera uno de 16bits

    constructor(pInicio:number,pFinal:number,pPendiente:number, pBnote:number, pEnote:number){
        this.inicio=pInicio;
        this.final=pFinal;
        this.pendiente=pPendiente;
    }

    setForm(pForma:formas):void {
        this.form=pForma;
    }

    setInicio(pInicio:number):void {
        this.inicio=pInicio;
    }

    setFinal(pFinal:number):void {
        this.final=pFinal;
    }

    setPendiente(pPendiente):void{
        this.pendiente=pPendiente;
    }

    getForm():formas{
        return this.form;
    }

    getFinal():number{
        return this.final;
    }

    getInicio():number{
        return this.inicio;
    }

    getPendiente():number{
        return this.pendiente;
    }
}


