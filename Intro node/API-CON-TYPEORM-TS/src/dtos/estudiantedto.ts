import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateEstudianteDto{
    @IsNotEmpty()
    @IsNumber()
    dni:number;

    @IsNotEmpty()
    @IsString()
    nombre: String;

    @IsNotEmpty()
    @IsString()
    apellido:String;

    @IsNotEmpty()
    @IsString()
    email:String;
}