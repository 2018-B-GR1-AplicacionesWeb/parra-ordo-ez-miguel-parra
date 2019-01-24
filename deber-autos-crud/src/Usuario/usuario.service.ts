import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm"
import { FindOneOptions, Repository } from 'typeorm';
import {UsuarioEntity} from "./usuario.entity";
import { Usuario } from './usuario.controller';


@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>
    ){}
    crear(usuario: Usuario): Promise<UsuarioEntity> {
        const usuarioEntity: UsuarioEntity = this._usuarioRepository
          .create(usuario);
        return this._usuarioRepository.save(usuarioEntity);
    }
    async autenticar(usuario: string,
                     password: string): Promise<number>{
        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                nombre: usuario,
                password: password,
            },
            };
        const respuesta = await this._usuarioRepository.findOne(consulta);
        if (respuesta) {
            return respuesta.id;
        }else{
            return 0;
    }
    }
    }