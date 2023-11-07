import {Request,Response} from "npm:express@4.18.2"
import { clientes } from "../db/basedatos.ts";

const addDinero=async(req:Request,res:Response)=>{
    try {
        const {idCliente,Dinero}=req.body;                                                                          //Los valores que se utilizaran en el body
        if (!idCliente||!Dinero) {                                                                                 //Si no existe el idCliente o el dinero devuelve un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idCliente y el dineroson requeridos"
            }
            res.status(400).json(error);
            return;
        }
        
        if(typeof idCliente!=="string"||typeof Dinero!=="number"){                                                //Si el idCliente no es un string o el dinero no es un number devuelve un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idCliente como string y el dinero como number"
            }
            res.status(400).json(error);
            return;
        }
        const cliente=await clientes.findOne({_id:idCliente});                                                     //Busca el cliente por el idCliente
        if(!cliente){                                                                                             //Si no existe el cliente devuelve un error
            const error={
                "error":"No existe el cliente",
                "message":"El idCliente no existe"
            }
            res.status(400).json(error);
            return;
        }
        cliente.dinero+=Dinero;                                                                                  //Añade el dinero al cliente
        await cliente.save();                                                                                  //Guarda el cliente
        res.status(200).send("Se ha añadido correctamente el dinero al cliente");                             //Devolvera un mensaje de que se ha añadido correctamente el dinero al cliente


    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default addDinero;                                                                                    //Exporta la funcion addDinero