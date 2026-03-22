import { Request, Response } from 'express';
import { Profesor } from '../models/profesoresModel'
import { validate } from 'class-validator';
import { CreateProfesorDto } from '../dtos/profesordto';
import { plainToInstance } from 'class-transformer';

class ProfesoresController{
/*     constructor(){

    } */
    async consultar(req:Request,res:Response){
        try{
            const data = await Profesor.find();
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async consultarDetalle(req:Request,res:Response){
        const id = req.params.id
        try{
            const registro = await Profesor.findOneBy({id:Number(id)})
            if(!registro){
                throw new Error('Profesor no encontrado')
            }
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }     
    async ingresar(req:Request,res:Response){
        try{
            const dto = plainToInstance(CreateProfesorDto, req.body)
            const errors = await validate(dto);
            if(errors.length > 0){
                res.status(400).json({msg:'Error de validación', errors})
            }
            const profesor = new Profesor()

            profesor.dni = dto.dni
            profesor.nombre = dto.nombre
            profesor.apellido = dto.apellido
            profesor.email = dto.email
            profesor.profesion = dto.profesion
            profesor.telefono= dto.telefono

            await profesor.save()
            res.status(201).json(profesor)
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
            const registro = await Profesor.findOneBy({id:Number(id)})
            if(!registro){
                return res.status(404).json({ msg: "Profesor no encontrado" });
            }
            await Profesor.update({id:Number(id)},req.body)
            const registroActualizado = await Profesor.findOneBy({id:Number(id)})
            res.status(200).json(registroActualizado)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    async borrar(req:Request,res:Response){
        const id = req.params.id
        try{
            const registro = await Profesor.findOneBy({id:Number(id)})
            if(!registro){
                return res.status(404).json({ msg: "Profesor no encontrado" });
            }
            await Profesor.delete({id:Number(id)})
            res.status(204).send();
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}
export default new ProfesoresController();