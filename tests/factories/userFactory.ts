import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export async function createUser(email:string, password:string) {
  const passwordHash = bcrypt.hashSync(password,10)
  const user = await getRepository(User).create({
    email: email,
    password: passwordHash,
  });

  await getRepository(User).save(user);

  return user;
}
