//Crear Coche
import { Request, Response} from "npm:express@4.18.2";
import { coches } from "../db/basedatos.ts";
import { Motor } from "../types.ts";
import { tipoCoche } from "../types.ts";

const addCoche = async (req: Request, res: Response) => {
  try {
    const {marca,anio,color,motor,matricula,precio } = req.body;                                                                            //Son los valores que se le pasan por el body para utilizarlols luego en la funcion
    if (!marca || !anio || !color ||!motor||!matricula||!precio) {                                                                //Si no se introducen todos los datos, salta este error
      const error={
          "error":"Error de que faltan datos",
          "message":"La marca, el anio, el color, el motor, la matricula y el precio son requeridos"
      }
      res.status(400).json(error);
      return;
    }
    if(!Object.values(Motor).includes(motor)){                                                                                    //Aqui es donde se comprueba los valores del enum y sino esta en el enum no se puede añadir y te da un error
      const error={
          "error":"Error de enum",
          "message":"El motor especificado no es valido ya que tiene que ser electrico, diesel o gasolina"
      }  
      res.status(400).json(error)
      return;
    }
    if(!Object.values(tipoCoche).includes(marca)){                                                                                //Aqui es donde se comprueba los valores del enum y sino esta en el enum no se puede añadir y te da un error
      const error={
          "error":"Error de enum",
          "message":"La marca especificada no es valida ya que tienes que tiene que ser 4x4, suv o monovolumen"
      }  
      res.status(400).json(error)
      return;
    }
    if(typeof anio!=="string"||typeof color!=="string"||typeof matricula!=="string"){                                           //Si no se introducen los datos en el formato correcto, salta este error
        const error={
            "error":"Error de string",
            "message":"Debes especificar el año, el color y la matricula como string"
        }
        res.status(400).json(error)
        return;
    }
    if(typeof precio!=="number"){                                                                                              //Si no se introducen los datos en el formato correcto, salta este error
        const error={
            "error":"Error de number",
            "message":"Debes especificar el precio como un numero"
        }
        res.status(400).json(error)
        return;
    }


    const newCoche = new coches({ marca,anio,color,motor,matricula,precio});                                                  //Se crea un nuevo coche con los datos introducidos
    
    await newCoche.save();                                                                                                 //Se guarda el nuevo coche en la base de datos

    res.status(200).send({                                                                                                //Se envia el nuevo coche
      marca:newCoche.marca,
      anio:newCoche.anio,
      color: newCoche.color,
      motor:newCoche.motor,
      matricula:newCoche.matricula,
      precio:newCoche.precio,
      id: newCoche._id
    });
  } catch (error) {
    res.status(500).json({
      "error":error.message,
      "message":"Error interno del servidor"
  })
  return;
  }
};

export default addCoche;                                                                                                 //Se exporta la funcion addCoche