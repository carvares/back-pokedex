import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Pokemon from "./Pokemons";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.user)
  @JoinTable({ name: "PokemonsUser" })
  pokemon: Pokemon[];
}
