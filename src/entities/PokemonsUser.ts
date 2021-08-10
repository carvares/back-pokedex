import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import Pokemon from "./Pokemons";
import User from "./User";
@Entity("pokemonsUsers")
export default class PokemonsUsers{
    @PrimaryGeneratedColumn()
    id: number;
 
    @OneToMany(()=> User, user => user.id)
    users: User;
 
    @OneToMany(()=> Pokemon, pokemon => pokemon.id)
    pokemons: Pokemon;
  }