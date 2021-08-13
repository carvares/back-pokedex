import { Request, Response } from "express";
import Session from "../entities/Sessions";

import * as pokemonService from "../services/pokemonService";

export async function listPokemons(req: Request, res: Response) {
  const user: Session = res.locals.user;
  const result = await pokemonService.getPokemon(user.userId);
  res.status(200).send(result);
}

export async function newPokemon(req: Request, res: Response) {
  const user: Session = res.locals.user;
  const pokemonId = parseInt(req.params.id);
  const result = await pokemonService.addPokemon(user.userId, pokemonId);
  res.sendStatus(200);
}
export async function deletePokemon(req: Request, res: Response) {
  const user: Session = res.locals.user;
  const pokemonId = parseInt(req.params.id);
  const result = await pokemonService.removePokemon(user.userId, pokemonId);
  res.sendStatus(200);
}
