import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesoresModel";

export class CursoService {

    async crearCurso(data: any) {

        const profesor = await Profesor.findOneBy({ id: Number(data.profesor) });

        if (!profesor) {
            throw new Error('Profesor no encontrado');
        }

        const curso = new Curso();
        curso.nombre = data.nombre;
        curso.descripcion = data.descripcion;
        curso.profesor = profesor;

        return await curso.save();
    }

    async actualizarCurso(id: any, data: any) {

        const curso = await Curso.findOneBy({ id });

        if (!curso) {
            throw new Error('Curso no encontrado');
        }

        curso.nombre = data.nombre ?? curso.nombre;
        curso.descripcion = data.descripcion ?? curso.descripcion;

        return await curso.save();
    }
    async asociarEstudiante(){

    }
}