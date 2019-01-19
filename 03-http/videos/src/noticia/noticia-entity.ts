//BDD Ya existe -> synchronize:false
// BDD No existe -> synchronize:true
import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaginaEntity} from "../pagina/pagina.entity";

@Entity('noticia')//nombre de la tabla
export class NoticiaEntity{

    @PrimaryGeneratedColumn() // Para la llave primarias
    id: number;

    @Index()// Index para que las busquedas sean mas rapido
    @Column({
        name: 'titulo_noticia',
        type: 'varchar',
        length : 50,
    })
    titulo:string;

    @Column({
        name: 'descripcion_noticia',
        type: 'varchar',
        nullable: true // con esto dejamos que se guarde nulo en la descripcion
    })
    descripcion:string;

    @OneToMany(
        type => PaginaEntity,// que tabla vamos a relacionar
        pagina => pagina.noticia //el campo que hace referencia como el foreign key
    )
    paginas: PaginaEntity[];

    // trigger es un evento que se ejecuta en la base y nosotros podemos poner ahi
    // Tipos:

    @BeforeInsert()
    primerConsole(){
        console.log(`Este es el primer console`); //son trigger logicos
    }

    @BeforeInsert()
    segundoConsole(){
        console.log(`El titulo es ${this.titulo}`); //son trigger logicos
    }

}

