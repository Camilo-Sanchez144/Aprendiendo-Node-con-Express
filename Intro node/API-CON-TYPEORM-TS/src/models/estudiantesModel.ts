import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity('estudiantes')
export class Estudiante extends BaseEntity{

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

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date
}