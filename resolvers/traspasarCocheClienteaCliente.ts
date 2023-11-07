import {Request,Response} from "npm:express@4.18.2"
import { clientes } from "../db/basedatos.ts";

const traspasarCocheClienteaCliente= async(req:Request,res:Response)=>{

    try {
        const {idCliente1,idCliente2,idCoche}=req.body;                                                              //idCliente1 es el id del cliente que quiere vender el coche, idCliente2 es el id del cliente que quiere comprar el coche y idCoche es el id del coche que se quiere vender
        if (!idCliente1 || !idCliente2||!idCoche ) {                                                                //Si no se pasan los tres valores devuelve un error
            const error={
                "error":"Error de que faltan datos",
                "message":"El idCoche1, el idCliente1 y el idCliente2 son requeridos"
            }
            res.status(400).json(error);
            return;
        }
        if(typeof idCliente1!=="string"||typeof idCoche!=="string"||typeof idCliente2!=="string"){                 //Si no se pasan los tres valores como string devuelve un error
            const error={
                "error":"Error de string",
                "message":"Debes especificar el idCoche1 y el idCoche2 como string y también el idCliente1 como string"
            }
            res.status(400).json(error);
            return;
        }

        const cliente1=await clientes.findOne({_id:idCliente1});                                                  //Busca el cliente con el idCliente1 que se le pasa
        const cliente2=await clientes.findOne({_id:idCliente2});                                                 //Busca el cliente con el idCliente2 que se le pasa

        if(!cliente1){                                                                                          //Si no existe el cliente1 devuelve un error
            const error={
                "error":"No existe el cliente1",
                "message":"El idCliente1 no existe"
            }
            res.status(400).json(error);
            return;
        }
        if(!cliente2){                                                                                         //Si no existe el cliente2 devuelve un error
            const error={
                "error":"No existe el cliente2",
                "message":"El idCliente2 no existe"
            }
            res.status(400).json(error);
            return;
        }
        //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        const encontrar_coche=cliente1.coches.find((coches)=>{                                                  
            return coches.id.toString()===idCoche;                                                             //Devuelve el coche que tenga el idCoche que se le pasa
        })
        
        if(!encontrar_coche){                                                                                  //Si no existe el coche devuelve un error
            const error={
                "error":"No existe el coche",
                "message":"El idCoche no existe"
            }
            res.status(400).json(error);
            return;
        }
        /*console.log(cliente2)
        console.log(encontrar_coche);
        */
        //quiero guardar el coche en el cliente2
        const newCoche={                                                                                     //Crea un nuevo coche con los valores del coche que se va a traspasar
            marca:encontrar_coche.marca,
            anio:encontrar_coche.anio,
            color:encontrar_coche.color,
            motor:encontrar_coche.motor,
            matricula:encontrar_coche.matricula,
            precio:encontrar_coche.precio,
            id:encontrar_coche.id,
        };
        cliente2.coches.push(newCoche);                                                                    //Añade el nuevo coche al cliente2
        await cliente2.save();                                                                            //Guarda el cliente2

            
        
        
        //console.log("aaaaaaaaaaaakflañd,ofmsfkgikmomoaaa");
        const coches_eliminar=cliente1.coches.filter((coches)=>{ 
            return coches.id.toString()!==idCoche;                                                         //Devuelve todos los coches que no sean el que se quiere eliminar y para ello no tienen que coincidir los id
        })
        //console.log("aaaf`,fmslfmlsmkmknaaaaaaa");
        await clientes.updateOne({ _id: idCliente1 },{coches:coches_eliminar});                          //Actualiza el cliente1 con el idCliente1 y le asigna los coches que no van a ser el que se quiere eliminar
        res.status(200).send("Se ha traspasado correctamente el coche del cliente1 al cliente2")        //Devuelve un mensaje de que se ha traspasado correctamente el coche del cliente1 al cliente2
       
    } catch (error) {
        res.status(500).json({
            "error":error.message,
            "message":"Error interno del servidor"
        })
        return;
    }
}
export default traspasarCocheClienteaCliente;                                                          //Exporta la funcion traspasarCocheClienteaCliente