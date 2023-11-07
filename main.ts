import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";


import addCoche from "./resolvers/addcoche.ts";
import addConcesionario from "./resolvers/addConcesionario.ts";
import addCliente from "./resolvers/anadirCliente.ts";
import sendCoche from "./resolvers/sendCocheConcesionario.ts";
import getCochesConcesionario from "./resolvers/getCochesConcesionario.ts";
import deleteCoche_Concesionario from "./resolvers/deleteCocheConcesionario.ts";
import deleteCocheCliente from "./resolvers/deleteCocheCliente.ts";
import getCochesCliente from "./resolvers/getCochesCliente.ts";
import addDinero from "./resolvers/addDineroCliente.ts";
import venderCoche from "./resolvers/sendCocheCliente.ts";
import traspasarCocheClienteaCliente from "./resolvers/traspasarCocheClienteaCliente.ts";
import bloquearConcesionario from "./resolvers/bloquearConcesionario.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
console.log("Se ha conectado a la base de datos");
const app = express();
app.use(express.json());
app
  .post("/api/anadircoche", addCoche) // Permite crear coches
  .post("/api/anadirconcesionario", addConcesionario) //Permite crear concesionarios
  .post("/api/anadircliente", addCliente)//Permite crear cliente
  .post("/api/enviarCocheConcesionario", sendCoche) //Permite enviar coches a un concesionario
  .get("/api/verCochesConcesionario/:idConcesionario", getCochesConcesionario)//Permite ver los coches de un concesionario
  .post("/api/enviarCocheCliente",venderCoche)//Permite vender coches a un cliente
  .get("/api/verCochescliente/:idCliente", getCochesCliente)//Permite añadir dinero a un cliente para poder comprar un coche
  .delete("/api/eliminarCocheConcesionario", deleteCoche_Concesionario)//Permite eliminar coche de un concesionario
  .delete("/api/eliminarCocheCliente", deleteCocheCliente)//Permite eliminar coche de un cliente
  .put("/api/anadirdineroCliente", addDinero)//Permite añadir dinero a un cliente para poder comprar un coche
  .post("/api/traspasarCoche", traspasarCocheClienteaCliente)//Permite traspasar coches entre concesionarios
  .put("/api/bloquearConcesionario/:idConcesionario", bloquearConcesionario)//Permite bloquear concesionarios

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});