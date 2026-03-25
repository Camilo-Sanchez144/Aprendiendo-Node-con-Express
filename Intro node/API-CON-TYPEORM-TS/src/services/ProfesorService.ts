import { Profesor } from '../models/profesoresModel'
export class ProfesorService{
    async crearProfesor(data:any){
        const registro = new Profesor()

        registro.dni = data.dni
        registro.nombre = data.nombre
        registro.apellido = data.apellido
        registro.profesion = data.profesion
        registro.email = data.email
        registro.telefono = data.telefono

        await registro.save()

        return registro;
    }

    async actualizarProfesor(id:any, data:any){
        const registro = await Profesor.findOneBy({id:Number(id)})
            if(!registro){
                throw new Error( "Profesor no encontrado" );
            }
        registro.dni = data.dni
        registro.nombre = data.nombre
        registro.apellido = data.apellido
        registro.profesion = data.profesion
        registro.telefono = data.telefono
        
        await registro.save()
        
        return registro;
    }
}