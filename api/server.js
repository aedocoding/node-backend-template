const express = require("express");
const helmet = require("helmet");
const CORS = require("cors");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(helmet());
server.use(CORS());
server.use(express.json());
server.use("/auth", authRouter);
const { Pool } = require("pg-promise");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

server
  .get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
  })
  .get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      const results = { results: result ? result.rows : null };
      res.render("pages/db", results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });
module.exports = server;
