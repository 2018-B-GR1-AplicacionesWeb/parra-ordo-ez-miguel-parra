import {Module} from "@nestjs/common";
import {VentaController} from "./venta.controller";
import {VentaService} from "./venta.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import {VentaEntity} from "./venta.entity";

@Module({
    imports:[TypeOrmModule.forFeature([VentaEntity])],
    controllers:[VentaController],
    providers:[VentaService],
    exports:[VentaService]
    }
)
export class VentaModule {

}