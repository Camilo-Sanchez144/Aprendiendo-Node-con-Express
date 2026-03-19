import { Request, Response } from 'express';
import { Curso } from '../models/cursoModel'
import { Profesor } from '../models/profesoresModel'
import { Estudiante } from '../models/estudiantesModel';
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
                const { profesor } = req.body;
                const idProfesor=Number(profesor)
                const profesorRegistro = await Profesor.findOneBy({ id: idProfesor });
                if (!profesorRegistro) {
                    return res.send('Profesor no encontrado');
                }
                const registro = await Curso.save(req.body)
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
                const registro = await Curso.findOneBy({id:Number(id)})
                if(!registro){
                    return res.status(404).json({ msg: "Curso no encontrado" });
                }
                await Curso.update({id:Number(id)},req.body)
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