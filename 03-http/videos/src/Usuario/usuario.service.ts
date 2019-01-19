import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{

    //el constructor inyecta las dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ){

    }

    async autenticar(username: string,
               password: string): Promise<boolean> {
        // si es que la passsword estuviera encriptada
        // deberiamos emcriptar que les llega
        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                username: username,
                password: password //aca mandamos el password encriptado
            }
        };
        const respuesta = await this._usuarioRepository.findOne(consulta);

        if (respuesta) {
            return true;
        } else {
            return false;
        }
    }

    }