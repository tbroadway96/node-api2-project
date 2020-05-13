const express = require("express");
const server = express();
const router = require("./router")

server.use(express.json());
server.use("/", router);

module.exports = server;
