import { DataSource } from "typeorm"
import { Profesor } from "../models/profesoresModel"
import { Estudiante } from "../models/estudiantesModel"
import { Curso } from "../models/cursoModel"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cursos",
    logging:true,
    entities:[Estudiante, Profesor, Curso],
    synchronize:false
});