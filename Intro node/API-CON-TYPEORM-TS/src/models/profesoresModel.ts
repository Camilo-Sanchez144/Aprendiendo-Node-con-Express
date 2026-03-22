import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity} from "typeorm"
import { Curso } from "./cursoModel";

@Entity('profesores')
export class Profesor extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    dni:number;
    
    @Column()    
    nombre:String;
    
    @Column()    
    apellido:String;
    
    @Column()    
    email:String;
    
    @Column()
    profesion:String;

    @Column()
    telefono:number;

    @CreateDateColumn()
    creareAt:Date

    @UpdateDateColumn()
    updateAt:Date

    @OneToMany(()=> Curso, (curso)=>curso.profesor)
    cursos:Curso[]
}