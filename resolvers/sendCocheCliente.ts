import {Request,Response} from "npm:express@4.18.2"

import { clientes } from "../db/basedatos.ts";
import { coches } from "../db/basedatos.ts";


const venderCoche= async(req:Request,res:Response)=>
{
    try {
        const {idCliente,idCoche}=req.body;                                                               //idCliente es el id del cliente que quiere comprar el coche y idCoche es el id del coche que quiere comprar
        if (!idCliente || !idCoche ) {                                                                    //Si no se pasan los dos valores devuelve un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idCliente y el idCoche son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idCliente!=="string"||typeof idCoche!=="string"){                                     //Si no se pasan los dos valores como string devuelve un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idCliente y el idCoche como string"
            }
            res.status(400).json(error);
            return;
        }

        const cliente=await clientes.findOne({_id:idCliente});                                          //Busca el cliente con el idCliente que se le pasa
        const coche=await coches.findById({_id:idCoche});                                              //Busca el coche con el idCoche que se le pasa

        if(!cliente){                                                                                  //Si no existe el cliente devuelve un error
            const error={
                "error":"No existe el cliente",
                "message":"El idCliente no existe"
            }
            res.status(400).json(error);
            return;
        }
        if(!coche){                                                                                    //Si no existe el coche devuelve un error
            const error={
                "error":"No existe el coche",
                "message":"El idCoche no existe"
            }
            res.status(400).json(error);
            return;
            }
         if(cliente.dinero<coche.precio){                                                              //Si el dinero del cliente es menor que el precio del coche devuelve un error ya que es otro apartado que se nos pide
            const error={
                "error":"not_enough_money",
                "mensage": "The customer does not have enough money to perform the transaction. "
            }
            res.status(400).json(error);
            return;
        }
        const newCoche={                                                                              //Crea un nuevo coche con los valores del coche que se quiere comprar
            marca:coche.marca,
            anio:coche.anio,
            color:coche.color,
            motor:coche.motor,
            matricula:coche.matricula,
            precio:coche.precio,
            id:coche._id,
        }
        
       

        cliente.coches.push(newCoche);                                                               //Añade el nuevo coche al cliente
        cliente.dinero-=coche.precio;                                                              //Le resta el precio del coche al dinero del cliente
        await cliente.save();                                                                     //Guarda el cliente
        await coches.findOneAndDelete({_id:idCoche});                                            //Elimina el coche de la base de datos


        res.status(200).send({                                                                   //Devuelve el cliente con el coche que ha comprado
            nombre:cliente.nombre,   
            dni:cliente.dni,
            edad:cliente.edad,
            dinero:cliente.dinero,
            coche:cliente.coches
        })

    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default venderCoche;                                                                      //Exporta la funcion venderCoche