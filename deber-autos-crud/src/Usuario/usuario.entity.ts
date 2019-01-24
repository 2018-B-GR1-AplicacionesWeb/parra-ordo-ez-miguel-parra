import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {VentaEntity} from '../Venta/venta.entity';

@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre_usuario',
        type: 'varchar',
        length: 40,
    })
    nombre: string;
    @Column({
        name: 'password_usuario',
        type: 'varchar',
        length: 40,
    })
    password: string;
    @Column({
        name: 'correo_usuario',
        type: 'varchar',
        length: 40,
    })
    correo: string;
    @Column({
        name: 'edad_usuario',
        type: 'varchar',
        length: 2,
    })
    edad: string;
    @Column({
        name: 'telefono_usuario',
        type: 'varchar',
        length: 10,
    })
    telefono: string;

    @OneToMany(
        type => VentaEntity,
        venta => venta.usuario,
    )
    ventas: [VentaEntity];

}