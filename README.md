# Practica4_BackEnd

Objetivo

Desarrollar una API con express, deno y Mongo para satisfacer las necesidades.

ENDPOINTS

-Permite crear coches: .post("/api/anadircoche", addCoche). Va a ser la función que servira para poder crear coches donde se le pasara la marca, el año, el color, la matricula y el precio.

-Permite crear concesionarios .post("/api/anadirconcesionario", addConcesionario). Sera la función añadir concesionario donde se le pasara un nombre, la dirección y un array de coches

-Permite crear cliente: .post("/api/anadircliente", addCliente). Se creara un nombre, dni, edad, dinero y un array de coches.

-Permite enviar coches a un concesionario: .post("/api/enviarCocheConcesionario", sendCoche). Se le pasara el idCoche y se le enviara al concesionario que nosotros queramos con la id.

-Permite ver los coches de un concesionario: .get("/api/verCochesConcesionario/:idConcesionario", getCochesConcesionario). Como parametro de la url se pasara el idConcesionario y nos mostrara todos los coches que tiene.

-Permite vender coches a un cliente: .post("/api/enviarCocheCliente",venderCoche). Va a vender el coche utilizando el idCoche y el idCliente y se va a pasar entre colecciones.

-Permite ver los coches de un cliente: .get("/api/verCochescliente/:idCliente", getCochesCliente). Se pasara el idCliente como parametro en la url y devolvera todos los coches que hay en el Cliente.

-Permite eliminar coche de un concesionario: .delete("/api/eliminarCocheConcesionario", deleteCoche_Concesionario). Eliminara el coche que queramos del concesionario pero para ello tenemos que pasarle el idCoche que queramos eliminar y el idConcesionario que se encuentra ya que queremos que se elimine del concesionario.

-Permite eliminar coche de un cliente: .delete("/api/eliminarCocheCliente", deleteCocheCliente): Eliminara el coche que queramos del cliente pero para ello tenemos que pasarle el idCoche que queramos eliminar y el idCliente que se encuentra ya que queremos que se elimine del cliente.

-Permite traspasar un coche de un cliente a otro: .post("/api/traspasarCoche", traspasarCocheClienteaCliente). Va a traspasar el coche de un cliente a otro y utilizaremos el idCliente que queremos coger su coche para traspasarlo y el idCliente2 que sera el que le demos el coche y luego también queremos el idCoche del primero para poder traspasarlo.

-Permite añadir dinero a un cliente para poder comprar un coche: .put("/api/anadirdineroCliente", addDinero). Actualizara el idCliente que nosotros querramos para añadir el Dinero que nosotros querramos para que se pueda comprar un coche.

-Permite bloquear la venta a ciertos concesionarios: .put("/api/bloquearConcesionario/:idConcesionario", bloquearConcesionario). Se le enviara el id de un Concesionario como parametro para actualizarlo y poder bloquear el concesionario que nosotros queramos utilizando el bloqueado:true.

PARAMETROS.

Como parametros vamos a crear 3 esquemas en el cual en el primer esquema crearemos una colección coches,luego una colección cliente y luego una colección concesionarios.

Tipo coche se le pasara una marca, año, color, motor, matricula, precio y la id que te de mongo.

Tipo Cliente: se le pasa un nombre, un dni, la edad, dinero, el array de coches y el id de mongo.

Tipo Concesionario: un nombre,dirección el array de coches y el id de mongo.

En todos los .ts se van a tener que maneja errores y se van a tener que manejar de forma json para que te lo muestre a traves del postman. El postman es lo que utilizaremos para poder introducir información, además de devolverla, cambiarla o actualizarla.

{

"code": "not_enough_money",

"mensage": "The customer does not have enough money to perform the transaction. "

}

De esta forma es como se te mostraran los errores que haya en el programa.

En total crearemos 12 resolvers para resolver cada función. Luego crearemos donde estaran guardado los esquemas de la base de datos. Además tendremos un .env, un deno.json y ya luego donde estaran los tipos que se utilizara para la base de datos y para resolver las funciones. Luego en el main se van a encontrar donde se iniciara la base de datos y los endpoint con sus respectos manejos de errores. 
