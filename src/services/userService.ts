import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Session from "../entities/Sessions";


export async function getUsers() {
  const users = await getRepository(User).find({
    select: ["id", "email"],
  });

  return users;
}
export async function insertUser(body: User) {
  const verify = await getRepository(User).findOne({
    where: { email: body.email },
  });
  if (verify) return false;
  const newUser: User = body;
  newUser.password = bcrypt.hashSync(body.password, 10);

  await getRepository(User).insert(newUser);
  return true;
}
export async function verifyUser(email: string) {
  const result = await getRepository(User).findOne({ email });
  return result;
}

export async function loginUser(body: User) {
  const existingUser = await verifyUser(body.email);

  if (!bcrypt.compareSync(body.password, existingUser.password)) return false;

  const token = uuid();
  const newSession = { userId: existingUser.id, token };
  await getRepository(Session).insert(newSession);
  return token;
}


