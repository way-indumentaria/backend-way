//Importamos el metodo "createPool" que nos permitira conectarnos a la base de datos desde "promise-mysql"
import { createPool } from "promise-mysql";

//Funcion que se encargara de la conexion a las base de datos
export async function conexion() 
{
    //Constante en la que definiremos las propiedades de "createPool" en la constante "connect", para que poder conectarse a la base de datos
    const connect = await createPool({
        host:'us-cdbr-east-03.cleardb.com',
        user:'b07c014c6f2e6f',
        password:'4535de08',
        database:'heroku_f2a0071bed600d6'
    });

    //Entrega una respuesta
    return connect;
}