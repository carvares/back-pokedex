import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
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

describe("POST /sign-in", () => {
  it("should answer with status 200 and a token object for correct user", async () => {
    await createUser("teste@teste.com","123456");
    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: "teste@teste.com", password: "123456" });
      
    expect(response.status).toBe(200);
  });
  it("should answer with status 400 for a invalid email", async () => {
    await createUser("teste@teste.com","123456");
    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: "teste@batata.com", password: "123456" });

    expect(response.status).toBe(400);
  });
  it("should answer with status 401 for wrong email or password", async () => {
    await createUser("teste@teste.com","123456");
    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: "teste@teste.com", password: "654321" });

    expect(response.status).toBe(401);
  });
});
