import {Request,Response} from "npm:express@4.18.2"
import { clientes } from "../db/basedatos.ts";

const getCochesCliente=async (req:Request,res:Response)=>{
    try {
        const {idCliente}=req.params;                                                   //el idCliente es el que se pone en la ruta para buscar el cliente
        if (!idCliente) {                                                              //si no existe el idCliente nos dara un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idCliente son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idCliente!=="string"){                                              //si el idCliente no es un string nos dara un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idCliente como string"
            }
            res.status(400).json(error);
            return;
        }
        
       /* const {dni}=req.params;
        if(!dni){
            const error={
                "error":"Error de que faltan datos",
                "message":"El Dni son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof dni!=="string"){
            const error={
                "error":"Error de string",
                "message":"Debes especificar el dni como string"
            }
            res.status(400).json(error);
            return;
        }
        */
        const cliente=await clientes.findOne({_id:idCliente});                                                  //El _id es el id de mongo entonces si se quiere buscar la id de mongo se pone _id
        //console.log("Id:", idCliente);
       // const cliente=await clientes.findById(idCliente);
        if(!cliente){                                                                                          //si no existe el cliente nos dara un error
            const error={
                "error":"No existe el cliente",
                "message":"El idCliente no existe"
            }
            res.status(400).json(error);

            return;
        }
        //console.log("Cliente:", cliente);
        const coches={cliente:cliente.coches}                                                                   //Vamos a hacer que nos imprima todos los coches que tiene el cliente
        //me imrpima todos los coches que tiene el cliente
        res.status(200).send(coches);                                                                           //Nos imprime todos los coches que tiene el cliente
        //console.log(coches);

    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default getCochesCliente;                                                                              //exportamos la funcion getCochesCliente
