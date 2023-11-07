//Permite eliminar coche de un concesionario

import {Request, Response} from "npm:express@4.18.2"
import { concesionarios } from "../db/basedatos.ts"

const deleteCoche_Concesionario= async(req:Request,res:Response)=>{
    try {
        const {idConcesionario,idCoche } = req.body;                                                    //idConcesionario es el id del concesionario y idCoche es el id del coche
        if (!idConcesionario || !idCoche ) {                                                           //si no existe el idConcesionario o el idCoche nos dara un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idConcesionario y el idCoche son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idConcesionario!=="string"||typeof idCoche!=="string"){                              //si el idConcesionario o el idCoche no son un string nos dara un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idConcesionario y el idCoche como string"
            }
            res.status(400).json(error);
            return;
        }
        
        const concesionario=await concesionarios.findOne({_id:idConcesionario});                      //buscamos el concesionario por el idConcesionario

        if(!concesionario){
            const error={
                "error":"No existe el concesionario",
                "message":"El idConcesionario no existe"
            }
            res.status(400).json(error);
            return;
        }
        const CocheConcesionario_delete=concesionario.coches.filter((coches)=>{
            return coches.id.toString()!==idCoche;                                                    //filtramos los coches del concesionario y nos quedamos con los que no tengan el idCoche
        })
        await concesionarios.updateOne({ _id: idConcesionario },{coches:CocheConcesionario_delete});  //actualizamos el concesionario y le ponemos los coches que no tienen el idCoche
        res.status(200).send("Coche eliminado del concesionario correctamente");                      //enviamos un mensaje de que el coche se ha eliminado correctamente del concesionario
      } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
      }
    };
    
    export default deleteCoche_Concesionario;                                                        //exportamos la funcion deleteCoche_Concesionario