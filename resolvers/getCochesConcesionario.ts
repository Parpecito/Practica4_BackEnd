//Permite ver los coches de un concesionario

import { Request, Response} from "npm:express@4.18.2";
import { concesionarios } from "../db/basedatos.ts";

const getCochesConcesionario = async (req: Request, res: Response) => {
    try {
        const {idConcesionario}=req.params;                                                                 //idConcesionario es el id que utilizaremos para ver los coches del concesionario

        if (!idConcesionario) {                                                                           //si no existe el idConcesionario nos dara un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idConcesionario son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idConcesionario!=="string"){                                                           //si el idConcesionario no es un string nos dara un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idConcesionario y el idCoche como string"
            }
            res.status(400).json(error);
            return;
        }
        const concesionario=await concesionarios.findOne({_id: idConcesionario});                        //buscamos el concesionario por el idConcesionario
        if(!concesionario){                                                                              //si no existe el concesionario nos dara un error
            const error={
                "error":"No existe el concesionario",
                "message":"El idConcesionario no existe"
            }
            res.status(400).json(error);
            return;
        }
        const coches={concesionario:concesionario.coches}                                               //Vamos a hacer que nos imprima todos los coches que tiene el concesionario

        res.status(200).send(coches);                                                                   //Nos imprime todos los coches que tiene el concesionario
    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default getCochesConcesionario;                                                                //exportamos la funcion getCochesConcesionario