import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import User from "../../src/entities/User";
import Session from "../../src/entities/Sessions";

export async function createUser(email:string, password:string) {
  const passwordHash = bcrypt.hashSync(password,10)
  const user = await getRepository(User).create({
    email: email,
    password: passwordHash,
  });

  await getRepository(User).save(user);

  return user;
}

export async function signinUser(id:number) {
  const token = uuid();
  await getRepository(Session).insert({
    userId: id,
    token 
  });

  

  return token;
}
