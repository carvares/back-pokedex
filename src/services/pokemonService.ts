
import Pokemon from "../entities/Pokemons";
import { getRepository } from "typeorm";

export async function getPokemon(token:String) {
    const result = getRepository(Pokemon).find()
    return result
  }