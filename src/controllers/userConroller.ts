import { Request, Response } from "express";
import { userValidation } from "../schema/userSchema";

import * as userService from "../services/userService";


export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function newUser(req: Request, res: Response) {
  try {
    const validation = userValidation.validate(req.body);
    if (req.body.password !== req.body.confirmPassword || validation.error)
      return res.sendStatus(400);

    const result = await userService.insertUser(req.body);
    if (!result) return res.sendStatus(409);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function newSession(req: Request, res: Response) {
  try {
    const existingUser = await userService.verifyUser(req.body.email);
    if (!existingUser) return res.sendStatus(400);

    const result = await userService.loginUser(req.body);
    if (!result) return res.sendStatus(401);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
