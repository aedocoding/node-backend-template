const express = require("express");
const helmet = require("helmet");
const CORS = require("cors");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(helmet());
server.use(CORS());
server.use(express.json());
server.use("/auth", authRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
module.exports = server;
