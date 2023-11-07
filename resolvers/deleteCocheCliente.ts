import {Request,Response} from "npm:express@4.18.2"

import { clientes } from "../db/basedatos.ts";

const deleteCocheCliente= async(req:Request,res:Response)=>{
    try {
        const {idCliente,idCoche}=req.body;                                                             //Seran los valores que se pasen por el body y utilizaremos el idCliente y el idCoche
        if (!idCliente || !idCoche ) {                                                                 //Si no se pasan los dos valores devuelve un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idCliente y el idCoche son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idCliente!=="string"||typeof idCoche!=="string"){                                   //Si no se pasan los dos valores como string devuelve un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idCliente y el idCoche como string"
            }
            res.status(400).json(error);
            return;
        }
        const cliente= await clientes.findOne({_id:idCliente});                                       //Busca el cliente con el idCliente que se le pasa
        if(!cliente){
            const error={
                "error":"No existe el cliente",
                "message":"El idCliente no existe"
            }
            res.status(400).json(error);
            return;
        }
        
        const CocheCliente_delete=cliente.coches.filter((coches)=>{                                  
            return coches.id.toString()!==idCoche;                                                  //Devuelve todos los coches que no sean el que se quiere eliminar y para ello no tienen que coincidir los id
        })
        await clientes.updateOne({ _id: idCliente },{coches:CocheCliente_delete});                  //Actualiza el cliente con el idCliente y le asigna los coches que no van a ser el que se quiere eliminar
        
        res.status(200).send("Se ha eliminado correctamente el coche del cliente")                 //Devuelve un mensaje de que se ha eliminado correctamente el coche del cliente
    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}

export default deleteCocheCliente;                                                               //Exporta la funcion deleteCocheCliente