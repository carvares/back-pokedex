import Pokemon from "../entities/Pokemons";
import { getRepository } from "typeorm";
import PokemonsUsers from "../entities/PokemonsUser";
import User from "../entities/User";

export async function getPokemon(id: number) {
  const result: any = await getRepository(Pokemon).find();
  const user = await getRepository(User).findOne(id);
  const userPokemon = await getRepository(PokemonsUsers).find({
    where: { users: user.id },
  });

  if (userPokemon.length === 0) {
    for (let j = 0; j < result.length; j++) {
      result[j].inMyPokemons = false;
    }
    return result;
  }
  for (let i = 0; i < userPokemon.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (!result[j].inMyPokemons) {
        result[j].inMyPokemons = false;
      }
      if (result[j].id === userPokemon[i].pokemons) {
        result[j].inMyPokemons = true;
      }
    }
  }

  return result;
}

export async function addPokemon(id: number, pokemonId: number) {
  const user = await getRepository(User).findOne(id);
  const pokemon = await getRepository(Pokemon).findOne(pokemonId);
  await getRepository(PokemonsUsers).insert({
    users: user.id,
    pokemons: pokemon.id,
  });
  return;
}

export async function removePokemon(id: number, pokemonId: number) {
  const user = await getRepository(User).findOne(id);
  const pokemon = await getRepository(Pokemon).findOne(pokemonId);
  await getRepository(PokemonsUsers).delete({
    users: user.id,
    pokemons: pokemon.id,
  });
  return;
}
