import { Estudiante } from '../models/estudiantesModel'
export class EstudianteService{
    async CrearEstudiante(data:any){
        const estudiante = new Estudiante();

        estudiante.dni = data.dni;
        estudiante.nombre = data.nombre;
        estudiante.apellido = data.apellido;
        estudiante.email = data.email;

        await estudiante.save();

        return estudiante;
    }
    async ActualizarEstudiante(id:any, data:any){
        const registro = await Estudiante.findOneBy({id:Number(id)})
        if(!registro){
            throw new Error("Estudiante no encontrado");
        }
        registro.dni= data.dni;
        registro.nombre = data.nombre;
        registro.apellido = data.apellido;
        registro.email = data.email;

        await registro.save();

        return registro;
    }
}