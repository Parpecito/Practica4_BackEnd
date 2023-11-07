//Crear cliente
import { Request, Response} from "npm:express@4.18.2";
import { clientes } from "../db/basedatos.ts";

const addCliente = async (req: Request, res: Response) => {
  try {
    const {nombre,dni,edad,dinero,coches } = req.body;                                                              //Van a ser lo valores que se van a introducir en la base de datos
    
    if (!nombre || !dni || !edad || !dinero || !coches) {
        const error={
            "error":"Error de que faltan datos",
            "message":"El nombre, el Dni, la edad, el dinero y un array de coches son requeridos"                     //Si no se introducen todos los datos, salta este error
        }
        res.status(400).json(error);
         return;
    }
    if(typeof nombre!=="string"||typeof dni!=="string"||typeof edad!=="number"||typeof dinero!=="number"){          //Si no se introducen los datos en el formato correcto, salta este error
        const error={
            "error":"Error de string",
            "message":"Debes especificar el nombre y el dni como string y la edad y el dinero como numero"
        }
        res.status(400).json(error);
        return;
    }
    if(!Array.isArray(coches)){                                                                                    //Si no se introduce un array de coches, salta este error
      const error={
          "error":"Error de array",
          "message":"Debes especificar el coche como un array"
      }
      res.status(400).json(error);
      return;
  }
    const newCliente = new clientes({ nombre,dni,edad,dinero,coches});                                             //Se crea un nuevo cliente con los datos introducidos
    await newCliente.save();                                                                                      //Se guarda el nuevo cliente en la base de datos

    res.status(200).send({                                                                                       //Se envia el nuevo cliente
        nombre:newCliente.nombre,
        dni:newCliente.dni,
        edad:newCliente.edad,
        dinero:newCliente.dinero,
        coches:newCliente.coches,
        id: newCliente._id
    });
  } catch (error) {
    res.status(500).json({
      "error":error.message,
      "message":"Error interno del servidor"
  })
  return;
  }
};

export default addCliente;                                                                                      //Se exporta la funcion addCliente