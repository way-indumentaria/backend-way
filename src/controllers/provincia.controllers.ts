import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { IProvincia } from "../models/provincia";

export class provinciaController{

    public async listaProvincias(req:Request,res:Response){

        try {
            const db = await conexion();

            let provincias = await db.query('select * from provincia');

            res.json(provincias);
        } catch (error) {
            res.json(error);
        }

        
    }

    public async guardarProvincias(req:Request,res:Response){

        const db = await conexion();

        let provincia:IProvincia = req.body;

        await db.query('insert into provincia set ?',[provincia]);

        return res.json('La provincia fue guardada exitosamente'); 

    }

    public async eliminarProvincia(req:Request,res:Response)
    {
        try {
            const conex = await conexion();

            let id_provincia = req.params.codigo;
            await conex.query('delete from provincia where id_provincia = ?',[id_provincia]);
            return res.json("Provincia eliminada");

        }
        catch (error){
            return res.json("No se puede eliminar la provincia que este siendo utilizada por una localidad");
        }

    }

    public async actualizarProvincia(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;
    
            let provincia_actualizada = req.body;
    
            await db.query("update provincia set ? where id_provincia = ?",[provincia_actualizada,codigo]);
    
            res.json("Se actualizo exitosamente");
    
        } catch (error) {
            res.json(error);
        }
       
    }

    public async obtenerUnaProvincia(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            let unaProvincia = await db.query("select * from provincia where id_provincia = ?",[codigo]);

            res.json(unaProvincia[0]);
        } catch (error) {
            res.json(error);
        }
        

    }

}
