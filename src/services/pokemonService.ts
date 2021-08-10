import Pokemon from "../entities/Pokemons";
import { getRepository } from "typeorm";
import Session from "../entities/Sessions";
import PokemonsUsers from "../entities/PokemonsUser";
import User from "../entities/User";

export async function getPokemon(id: number) {
  const result: any = await getRepository(Pokemon).find();


    const userPokemon = await getRepository(User).findOne(id, {
      relations: ["pokemon"],
    });

    for (let i = 0; i < userPokemon.pokemon.length; i++) {
      for (let j = 0; j < result.length; j++) {
        if(!result[j].inMyPokemons){
          result[j].inMyPokemons = false
        }
        if (result[j].id === userPokemon.pokemon[i].id) {

          result[j].inMyPokemons = true;
      }
    }
  }

  return result;

}

export async function addPokemon(id: number, pokemonId:number) {
  const user = await getRepository(User).findOne(id);
  const pokemon = await getRepository(Pokemon).findOne(pokemonId)
  await getRepository(PokemonsUsers).insert({users:user,pokemons:pokemon});
  return 
}

export async function removePokemon(id: number, pokemonId:number) {
  const user = await getRepository(User).findOne(id);
  const pokemon = await getRepository(Pokemon).findOne(pokemonId)
  await getRepository(PokemonsUsers).delete({users:user,pokemons:pokemon});
  return 
}