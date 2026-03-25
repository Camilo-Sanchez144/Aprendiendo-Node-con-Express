import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class CreateUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    
    @Column()
    password:string;

    @UpdateDateColumn()
    created_at:Date;
}