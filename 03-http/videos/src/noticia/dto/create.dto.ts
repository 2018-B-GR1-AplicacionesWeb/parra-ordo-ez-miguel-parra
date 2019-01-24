import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateNoticiaDto{
    @IsNotEmpty()//validar que el titulo sea requerido
    @IsString()
    titulo: string; //propiedad a la quq quiere aplicar

    @IsOptional()
    @IsString()
    descripcion: string;
}