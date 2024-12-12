const express = require('express');
const router = express.Router();
const GameServer = require('../GameServer')

router.get("/lobby", (req, res) => {
  res.status(200).send(games);
});
router.get("/lobby/:id", (req, res) => {
  const { id } = req.params;
  console.log("ID:", id);
  if (id && games[id]) res.status(200).send(id);
  else res.status(404);
});
router.post("/lobby", (req, res) => {
  const id = games.length;
  const game = new GameServer(id);
  games.push(game);
  console.log("List of available games:");
  console.log(games);
});

module.exports = router;