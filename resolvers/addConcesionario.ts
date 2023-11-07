//Crear concesionario
import { Request, Response} from "npm:express@4.18.2";
import { concesionarios } from "../db/basedatos.ts";

const addConcesionario = async (req: Request, res: Response) => {
    try {
        const {nombre,direccion,coches } = req.body;                                                            //Vamos a recibir un json con los datos del concesionario y seran nombre,direccion y coches
        if (!nombre || !direccion || !coches ) {
            const error={
                "error":"Error de que faltan datos",
                "message":"El nombre, la direccion y el coche son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof nombre!=="string"||typeof direccion!=="string"){                                             //Comprobamos que los datos sean string
            const error={
                "error":"Error de string",
                "message":"Debes especificar el nombre y la direccion como string"
            }
            res.status(400).json(error);
            return;
        }
        if(!Array.isArray(coches)){                                                                            //Comprobamos que el coche sea un array
            const error={
                "error":"Error de array",
                "message":"Debes especificar el coche como un array"
            }
            res.status(400).json(error);
            return;
        }
        if(coches.length>10){                                                                                 //Comprobamos que el array no tenga mas de 10 coches porque no puede tener mas el concesionario
            const error={
                "error":"Limite de coches",
                "message":"El array de coches no puede tener mas de 10 coches"
            }
            res.status(400).json(error);
            return;
        }
        const newConcesionario=new concesionarios({ nombre,direccion,coches});                                //Creamos un nuevo concesionario con los datos introducidos
        //console.log(newConcesionario);
        await newConcesionario.save();                                                                      //Guardamos el nuevo concesionario en la base de datos

        res.status(200).send({                                                                             //Enviamos el nuevo concesionario
            nombre:newConcesionario.nombre,
            direccion:newConcesionario.direccion,
            coche:newConcesionario.coches
          });

    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default addConcesionario;                                                                         //Exportamos la funcion addConcesionario