import mongoose from "npm:mongoose@7.6.3";

import { Motor,tipoCoche,Coche,Cliente,Concesionario} from "../types.ts";


const Schema=mongoose.Schema;                                                                   //Declaramos el esquema de mongoose

const CocheSchema= new Schema({                                                                 //Declaramos el esquema de Coche
    marca:{type:String,enum:tipoCoche,required:true},
    anio:{type:String,required:true},
    color:{type:String,required:true},
    motor:{type:String,enum:Motor,required:true},
    matricula:{type:String,required:true},
    precio:{type:Number,required:true}
},{
    timestamps:true,                                                                            //Esto es para que se cree automaticamente la fecha de creacion y la fecha de modificacion
})
const ClienteSchema= new Schema({                                                               //Declaramos el esquema de Cliente
    nombre:{type:String,required:true},
    dni:{type:String,required:true},
    edad:{type:String,required:true},
    dinero:{type:Number,required:true},
    coches:{type:[CocheSchema],required:true}
},{
    timestamps:true,
})
const ConcesionarioSchema= new Schema({                                                         //Declaramos el esquema de Concesionario
    nombre:{type:String,required:true},
    direccion:{type:String,required:true},
    coches:{type:[CocheSchema],required:true},
},{
    timestamps:true,
})


export type CocheModelType=mongoose.Document&Omit<Coche,"id">;                                  //Esto es para que no se muestre el id en el json
export type ClienteModelType=mongoose.Document&Omit<Cliente,"id">;
export type ConcesionarioModelType=mongoose.Document&Omit<Concesionario,"id">;

export const coches=mongoose.model<CocheModelType>("Coche",CocheSchema)                         //Declaramos coches,clientes y concesionarios como modelos de mongoose
export const clientes=mongoose.model<ClienteModelType>("Cliente",ClienteSchema)
export const concesionarios=mongoose.model<ConcesionarioModelType>("Concesionario",ConcesionarioSchema)
