import {Entity, Column, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {VentaEntity} from '../Venta/venta.entity';

@Entity('auto') //nombre de la tabla
export class AutoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Index()

    @Column({
        name: 'marca_auto',
        type: 'varchar',
        length: 20,
    })
    marca: string;

    @Column({
        name: 'modelo_auto',
        type: 'varchar',
        length: 20,
    })
    modelo: string;

    @Column({
        name: 'color_auto',
        type: 'varchar',
        length: 20,
    })
    color: string;

    @Column({
        name: 'anio_auto',
        type: 'varchar',
        length: 4,
    })
    anio: string;

    @Column({
        name: 'puertas_auto',
        type: 'int',
    })
    puertas: number;

    @OneToMany(
        type => VentaEntity,
        venta => venta.auto,
    )
    ventas: VentaEntity[];
}