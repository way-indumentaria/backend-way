import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { ICategoria } from '../models/categoria';

export class categoriaController {
    
    public async listaCategoria(req:Request,res:Response){
        try {
            const db = await conexion();

            let categoria = await db.query('select * from categoria');
    
            return res.json(categoria);
        } catch (error) {
            res.json(error);
        }
    }


    public async guardarCategoria(req:Request,res:Response){

        try {
            const db = await conexion();

            let categoria:ICategoria = req.body;

            req.body.estado = Number(req.body.estado);

            await db.query('insert into categoria set ?',[categoria]);

            res.json('La categoria fue guardada exitosamente'); 
        } catch (error) {
            res.json(error);
        }
    }

    
    public async eliminarCategoria(req:Request,res:Response)
    {

        

        try {
            const db = await conexion();

            let codigo = req.params.codigo;
            await db.query("delete from categoria where id_categoria = ?",[codigo]);
            return res.json('La categoria se elimino exitosamente');
        }

        catch (error) {
            return res.json("No se puede eliminar una categoria que este siendo utilizada por un producto")
        }

    }

    
    public async actualizarCategoria(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            let categoria_actualizado = req.body;

            await db.query("update categoria set ? where id_categoria = ?",[categoria_actualizado,codigo]);

            res.json("Se actualizo exitosamente");
        } catch (error) {
            res.json(error);
        }
    
    }

    
    public async obtenerUnaCategoria(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;
    
            let unaCategoria = await db.query("select * from categoria where id_categoria = ?",[codigo]);
    
            res.json(unaCategoria[0]); 
        } catch (error) {
            res.json(error);
        }
        

    }


}