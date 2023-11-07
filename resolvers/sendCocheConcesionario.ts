//Permite enviar coches a un concesionario

import { Request, Response} from "npm:express@4.18.2";
import { coches } from "../db/basedatos.ts";
import { concesionarios } from "../db/basedatos.ts";
const sendCoche = async (req: Request, res: Response) => {
    try {
        const {idConcesionario,idCoche } = req.body;                                                   //idConcesionario es el id del concesionario y idCoche es el id del coche
        if (!idConcesionario || !idCoche ) {                                                          //si no existe el idConcesionario o el idCoche nos dara un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idConcesionario y el idCoche son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idConcesionario!=="string"||typeof idCoche!=="string"){                            //si el idConcesionario o el idCoche no son un string nos dara un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idConcesionario y el idCoche como string"
            }
            res.status(400).json(error);
            return;
        }

        const concesionario=await concesionarios.findOne({_id:idConcesionario});                    //buscamos el concesionario por el idConcesionario
        const coche=await coches.findOne({_id:idCoche});                                            //buscamos el coche por el idCoche
        if(!concesionario){                                                                         //si no existe el concesionario nos dara un error
            const error={
                "error":"No existe el concesionario",
                "message":"El idConcesionario no existe"
            }
            res.status(400).json(error);
            return;
        }
        if(!coche){                                                                                //si no existe el coche nos dara un error
            const error={
                "error":"No existe el coche",
                "message":"El idCoche no existe"
            }
            res.status(400).json(error);
            return;
        }
        const newCoche = {                                                                         //creamos un nuevo coche
            marca:coche.marca,
            anio:coche.anio,
            color:coche.color,
            motor:coche.motor,
            matricula:coche.matricula,
            precio:coche.precio,
            id:coche._id,
        };
        /*marca,anio,color,motor,matricula
        */
        concesionario.coches.push(newCoche);                                                      //añadimos el nuevo coche al concesionario
        await concesionario.save();                                                               //guardamos el concesionario
        await coches.findOneAndDelete({_id:idCoche});                                            //eliminamos el coche de la base de datos

        res.status(200).send({                                                                   //nos devuelve el concesionario con el coche añadido
            nombre:concesionario.nombre,
            direccion:concesionario.direccion,
            coches:concesionario.coches
          });
    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default sendCoche;                                                                        //exportamos la funcion sendCoche