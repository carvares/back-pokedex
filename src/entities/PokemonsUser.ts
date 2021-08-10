import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Pokemon from "./Pokemons";
import User from "./User";
@Entity("pokemonsUsers")
export default class PokemonsUsers{
    @PrimaryGeneratedColumn()
    id: number;
 
    @ManyToOne(()=> User, user => user.id)
    users: User;
 
    @ManyToOne(()=> Pokemon, pokemon => pokemon.id)
    pokemons: Pokemon;
  }