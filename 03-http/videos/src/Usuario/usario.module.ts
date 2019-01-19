
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from "@nestjs/common";

@Module(
    {
            imports: [TypeOrmModule.forFeature([UsuarioEntity])],
            providers: [
                UsuarioService
            ],
            exports: [ UsuarioService
            ]
    }
)
export class UsuarioModule{
}
