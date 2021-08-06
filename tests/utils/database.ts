import { getRepository } from "typeorm";
import Session from "../../src/entities/Sessions";
import User from "../../src/entities/User";

export async function clearDatabase () {
  await getRepository(Session).delete({});
  await getRepository(User).delete({});
}
