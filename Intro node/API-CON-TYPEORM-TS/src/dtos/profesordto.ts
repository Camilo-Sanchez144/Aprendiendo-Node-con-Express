import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProfesorDto{

    @IsNotEmpty()
    @IsNumber()
    dni:number;

    @IsNotEmpty()
    @IsString()
    nombre:String;

    @IsNotEmpty()
    @IsString()
    apellido:String;

    @IsNotEmpty()
    @IsString()
    email:String

    @IsNotEmpty()
    @IsString()
    profesion:String;

    @IsNotEmpty()
    @IsNumber()
    telefono:number;
}