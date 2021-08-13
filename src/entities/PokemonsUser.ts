import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
@Entity("pokemonsUsers")
export default class PokemonsUsers{
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    users: number;
 
    @Column()
    pokemons: number;
  }