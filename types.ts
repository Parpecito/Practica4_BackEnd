import mongoose from "npm:mongoose@7.6.3";
export enum tipoCoche{//Aqui se declara el enum de tipoCoche
    cuatrox4="4x4",
    suv="suv",
    monovolumen="monovolumen", 
}
export enum Motor{ //Aqui se declara el enum de Motor
    electrico="electrico",
    diesel="diesel",
    gasolina="gasolina",
    hibrido="hibrido",
}
export type Coche={//Aqui se declara el tipo Coche
    marca:tipoCoche,
    anio:string,
    color:string,
    motor:Motor,
    matricula:string,
    precio:number,
    id:mongoose.Types.ObjectId;
}
export type Cliente={//Aqui se declara el tipo Cliente
    nombre:string,
    dni:string,
    edad:number,
    dinero:number,
    coches:Coche[],
    id:mongoose.Types.ObjectId;
}
export type Concesionario={//Aqui se declara el tipo Concesionario
    nombre:string,
    direccion:string,
    coches: Coche[],
    id:mongoose.Types.ObjectId;
}