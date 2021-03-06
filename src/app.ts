import "./setup";
import axios from "axios";
import { getRepository } from "typeorm";
import Pokemon from "./entities/Pokemons";
import express,{Request, Response, NextFunction} from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";
import { AuthMiddleware } from "./middlewares/middlewares";


const app = express();
app.use(cors());
app.use(express.json());
app.use((err: Error, req: Request, res:Response, next:NextFunction) =>{
  console.log(err)
  return res.sendStatus(500)
})

app.get("/populate", async (req, res) => {
  for (let i = 1; i < 894; i++) {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const newPokemon = {
      name: result.data.name,
      number: result.data.id,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: "",
    };
    const speciesResult = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}`
    );
    // ['language']['name']=='fr'
    // newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    for (let j = 0; j < speciesResult.data.flavor_text_entries.length; j++) {
      if (speciesResult.data.flavor_text_entries[j].language.name === "en") {
        newPokemon.description = speciesResult.data.flavor_text_entries[
          j
        ].flavor_text
          .split("\n")
          .join(" ");
      }
    }
    await getRepository(Pokemon).insert(newPokemon);
  }
  res.send("OK");
});

app.post("/sign-up", userController.newUser);
app.post("/sign-in", userController.newSession);
app.get("/pokemons", AuthMiddleware, pokemonController.listPokemons);
app.post("/my-pokemons/:id/add", AuthMiddleware,pokemonController.newPokemon)
app.post("/my-pokemons/:id/remove", AuthMiddleware,pokemonController.deletePokemon)


export async function init() {
  await connectDatabase();
}

export default app;
