import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("pokemonsUsers")
export default class PokemonsUsers{
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    userId: number;
 
    @Column()
    pokemonId: number;
  }