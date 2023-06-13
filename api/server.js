// server için gerekli olanları burada ayarlayın
const express = require("express");
const server = express();
server.use(express.json());
// posts router'ını buraya require edin ve bağlayın
const postsRouter = require("./posts/posts-router");
server.use("/api/posts", postsRouter);
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

module.exports = server;
