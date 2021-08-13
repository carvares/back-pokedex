import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { createUser, signinUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("get /pokemons", () => {
  it("should answer with status 200 for valid token", async () => {
    const user = await createUser("email@email.com", "123456");
    const token = await signinUser(user.id);
    const response = await supertest(app)
      .get("/pokemons")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
