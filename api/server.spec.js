const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig");
const testUser = { username: "testing", password: "testing", email: "testing" };

describe("server.js", () => {
  describe("GET endpoint", () => {
    it("should return json", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
  });
  describe("Adding user to database", () => {
    it("should return a status of 201 with new user", async () => {
      await db("users").truncate();
      const res = await request(server)
        .post("/auth/register")
        .send(testUser);
      expect(res.status).toBe(201);
    });
    it("should return a status of 500 with invalid user", async () => {
      const res = await request(server)
        .post("/auth/register")
        .send({ user: "newnwq", pass: "newnew" });
      expect(res.status).toBe(500);
    });
  });
  describe("Login", () => {
    it("should return a status of 200 with test user", async () => {
      const res = await request(server).post("/auth/login").send(testUser);
      expect(res.status).toBe(200);
    });
    it("should return a status of 401 when given a non-valid user", async () => {
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "rgreg", password: "eewgrgw" });
      expect(res.status).toBe(401);
    });
  });
});
