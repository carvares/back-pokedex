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

describe("POST /sign-up", () => {
  it("should answer with status 201 for correct params", async () => {
    const response = await supertest(app).post("/sign-up").send({
      email: "email@email.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(response.status).toBe(201);
  });

  it("should answer with status 409 if the email is already registred", async () => {
    const user = await createUser("teste@teste.com","123456");
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        email: user.email,
        password: user.password,
        confirmPassword: user.password,
      });

    expect(response.status).toBe(409);
  });

  it("should answer with status 400 if passwords don't match", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        email: "teste@teste.com",
        password: "123456",
        confirmPassword: "12345789",
      });

    expect(response.status).toBe(400);
  });
  it("should answer with status 400 if password don't pass the auth", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        email: "teste@teste.com",
        password: "",
        confirmPassword: "12345789",
      });

    expect(response.status).toBe(400);
  });
  it("should answer with status 400 if confirmPassword don't pass the auth", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        email: "teste@teste.com",
        password: "123456",
        confirmPassword: "",
      });

    expect(response.status).toBe(400);
  });

  it("should answer with status 400 if email don't pass the auth", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({ email: "", password: "123456", confirmPassword: "123456" });

    expect(response.status).toBe(400);
  });
});
