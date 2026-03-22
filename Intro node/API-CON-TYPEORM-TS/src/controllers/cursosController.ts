import { Request, Response } from 'express';
import { Curso } from '../models/cursoModel'
import { Profesor } from '../models/profesoresModel'
import { Estudiante } from '../models/estudiantesModel';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateCursoDto } from "../dtos/cursodto";

class CursosController{
/*     constructor(){

    } */
        async consultar(req:Request,res:Response){
            try{
                const data = await Curso.find({relations: {profesor:true, estudiantes:true} })
                res.status(200).json(data)
            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }
        async consultarDetalle(req:Request,res:Response){
            const id = req.params.id
            try{
                const registro = await Curso.findOne( {where:{id:Number(id)},relations:{profesor:true, estudiantes:true} });
                if(!registro){
                    throw new Error('Curso no encontrado')
                }
                res.status(200).json(registro)
            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }     
        async ingresar(req:Request,res:Response){
            try{
                const dto = plainToInstance(CreateCursoDto, req.body);
                const errors = await validate(dto);

                if (errors.length > 0) {
                    return res.status(400).json({
                        msg: 'Error de validación',
                        errors
                    });
                }
                const idProfesor = Number(dto.profesor);
                const profesorRegistro = await Profesor.findOneBy({ id: idProfesor });
                if (!profesorRegistro) {
                    return res.status(404).json({ msg: 'Profesor no encontrado' });
                }

                const curso = new Curso();
                curso.nombre = dto.nombre;
                curso.descripcion = dto.descripcion;
                curso.profesor = profesorRegistro;

                const registro = await curso.save;

                res.status(201).json(registro);
            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }
        async actualizar(req:Request,res:Response){
            const id = req.params.id
            try{
                const dto = plainToInstance(CreateCursoDto, req.body);
                const errors = await validate(dto);

                if (errors.length > 0) {
                    return res.status(400).json({
                        msg: 'Error de validación',
                        errors
                    })
                }
                const registro = await Curso.findOneBy({id:Number(id)})

                if(!registro){
                    return res.status(404).json({ msg: "Curso no encontrado" });
                }

                registro.nombre = dto.nombre;
                registro.descripcion = dto.descripcion

                await registro.save()

                const registroActualizado = await Curso.findOne( {where:{id:Number(id)},relations:{profesor:true, estudiantes:true} });
                res.status(200).json(registroActualizado)

            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }
        async borrar(req:Request,res:Response){
            const id = req.params.id
            try{
                const registro = await Curso.findOneBy({id:Number(id)})
                if(!registro){
                    return res.status(404).json({ msg: "Curso no encontrado" });
                }
                await Curso.delete({id:Number(id)})
                res.status(204).send();
            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }
        async asociarEstudiante(req:Request, res:Response){
            const id = req.params.id
            try{
                const {estudiante_id, curso_id} = req.body
                const estudiante = await Estudiante.findOneBy({id:Number(estudiante_id)})
                const curso = await Curso.findOneBy({id:Number(curso_id)})
                if(!curso){
                    return res.status(404).json({ msg: "Curso no encontrado" });
                }
                if(!estudiante){
                    return res.status(404).json({ msg: "Estudiante no encontrado" });
                }
                curso.estudiantes = curso.estudiantes || []
                curso.estudiantes.push(estudiante);
                const registro = await Curso.save(curso)
                res.status(200).json(registro)
            }catch(err){
                if(err instanceof Error)
                res.status(500).send(err.message);
            }
        }
}
export default new CursosController();