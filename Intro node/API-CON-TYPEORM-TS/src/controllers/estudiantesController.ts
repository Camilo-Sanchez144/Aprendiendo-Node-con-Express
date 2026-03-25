import { Request, Response } from 'express';
import { Estudiante } from '../models/estudiantesModel'
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateEstudianteDto } from "../dtos/estudiantedto";
import { EstudianteService } from '../services/EstudianteService';
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
        const service = new EstudianteService
        try{
            const dto = plainToInstance(CreateEstudianteDto, req.body);
            const errors = await validate(dto)
            if(errors.length > 0){
                res.status(400).json({msg:'Error en la validación', errors})
            }
            const registro = await service.CrearEstudiante(dto)
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async actualizar(req:Request,res:Response){
        const id = req.params.id
        const service = new EstudianteService()
        try{
            const dto = plainToInstance(CreateEstudianteDto, req.body);
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({msg:'Error de validación', errors})
            }
            const registro = await service.ActualizarEstudiante(id,dto)
            res.status(200).json(registro)
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