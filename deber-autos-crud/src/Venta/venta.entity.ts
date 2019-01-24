
import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {AutoEntity} from "../Auto/auto.entity";

@Entity('venta')
export class VentaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
      {
          name: 'fecha_venta',
          type: 'varchar',
          length: 20,
      })
    fecha: string;
    @Column({
        name: 'lugar_venta',
        type: 'varchar',
        length: 30,
    })
    lugar: string;
    @Column({
        name: 'precio_venta',
        type: 'varchar',
        length: 30,
    })
    precio: string;
    @ManyToOne(
      type => AutoEntity,
    ) @JoinColumn({
        name: 'auID',
    })
    auto: AutoEntity;
    /* @ManyToOne(
          type => AutoEntity,
          auto => auto.ventas,
        )
        auto: AutoEntity;
*/
        @ManyToOne(
          type => UsuarioEntity,
          usuario => usuario.ventas,
        )
        usuario: UsuarioEntity;
}
