import { Request, Response } from 'express';
import { Estudiante } from '../models/estudiantesModel'

class EstudiantesController{
/*     constructor(){

    } */
    async consultar(req:Request,res:Response){
        try{
            const data = await Estudiante.find();
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async consultarDetalle(req:Request,res:Response){
        const id = req.params.id
        try{
            const registro = await Estudiante.findOneBy({id:Number(id)})
            if(!registro){
                throw new Error('Estudiante no encontrado')
            }
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }     
    async ingresar(req:Request,res:Response){
        try{
            const registro = await Estudiante.save(req.body);
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async actualizar(req:Request,res:Response){
        const id = req.params.id
        try{
            if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "No hay datos para actualizar" });
            }
            const registro = await Estudiante.findOneBy({id:Number(id)})
            if(!registro){
                return res.status(404).json({ msg: "Estudiante no encontrado" });
            }
            await Estudiante.update({id:Number(id)},req.body)
            const registroActualizado = await Estudiante.findOneBy({id:Number(id)})
            res.status(200).json(registroActualizado)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async borrar(req:Request,res:Response){
        const id = req.params.id
        try{
            const registro = await Estudiante.findOneBy({id:Number(id)})
            if(!registro){
                return res.status(404).json({ msg: "Estudiante no encontrado" });
            }
            await Estudiante.delete({id:Number(id)})
            res.status(204).send();
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}
export default new EstudiantesController();