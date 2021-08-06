import { Request, Response } from "express";
import { userValidation } from "../schema/userSchema";

import * as pokemonService from "../services/pokemonService";

export async function listPokemons(req: Request, res: Response) {
    try{
      const token = req.headers.authorization.split('Bearer ')[1]
      if(!token) return res.sendStatus(401);
  
      const result = await pokemonService.getPokemon(token)
      res.status(200).send(result)
    } catch(err){
      console.log(err)
      res.sendStatus(500)
    }
  }
  