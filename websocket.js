const { Server } = require("socket.io");
const Game = require('./class/Game');
const cfg = require('./config');

global.game;
global.server = new Server(9001, {
  cors: cfg.cors,
});

server.on("connect", async (socket) => {
  const total = countClients();
  await emitIndexes();
  await logClients();
  if (total > 2) {
    socket.emit("info", "В игре уже есть 2 участника. Закрываю соединение.");
    socket.disconnect(true);
  }
  else if (total == 2) {
    game = new Game();
    server.emit("info", "В игре 2 участника. Начинаем игру.");
    server.emit("game-start");
    emitGameState(game);
  }
  else if (total == 1) {
    server.emit("info", "В игре 1 участник. Ждем подключения еще одного игрока.") 
  };
  
  socket.on("action", (data) => handleAction(data, socket));
  socket.on("disconnect", logClients);

});

server.of("/game").on("connect", socket => {
  console.log("Welcome to the game!");
});

async function emitGameState(game) {
  const sockets = await server.fetchSockets();
  sockets.forEach((socket, i) => {
    const gameCopy = Object.assign({}, game);
    const player = [];
    player[0] = Object.assign({}, game.player[0]);
    player[1] = Object.assign({}, game.player[1]);
    const eIndex = i == 0 ? 1 : 0;
    player[eIndex].cards = [];
    gameCopy.player = player;
    socket.emit("game-state", gameCopy);
  })
}

async function emitIndexes() {
  const sockets = await server.fetchSockets();
  sockets.forEach((socket, i) => socket.emit("player-index", i));
}

function countClients() {
  return server.of("/").sockets.size;
}

async function logClients() {
  const sockets = await server.fetchSockets();
  console.log("К серверу подключено", sockets.length, "пользователей.");
  sockets.map((s, i) => console.log(i, s.id));
}

async function handleAction(data, socket) {
  const { turn, cycle } = game;
  const sockets = await server.fetchSockets();
  const playerId = sockets.indexOf(socket);
  const player = game.player[playerId];
  const { action, index: cardIndex } = data;
  if (playerId != turn) { // || game.busy
    socket.emit("info", "Сейчас ходит противник");
    socket.emit("warning", "enemy's turn")
    return;
  }
  if (action == "play" && player.ddpa) {
    socket.emit("info", "Необходимо сбросить карту.");
    socket.emit("warning", "must-discard");
    return;
  }
  else if (action == "play") {
    // Разыгрываем карту (если достаточно ресурсов)
    const playable = game.play(playerId, data.index);
    if (!playable) {
      socket.emit("info", "Недостаточно ресурсов");
      socket.emit("warning", "not-enough-res")
      return;
    }
  }
  else if (action == "discard") {
    game.discard(playerId, data.index);
    if (player.ddpa) {
      console.log("Drow, Discard, PA.");
      player.ddpa = false;
      player.playagain = true;
    }
  }
  
  server.emit("sfx", "deal");
  // Отдаем ход врагу
  if (!player.playagain && !player.ddpa) game.turn = turn == 0 ? 1 : 0;
  // Если передали ход 0-му игроку обновляем цикл, для прироста
  if (turn == 1 && !player.playagain && !player.ddpa) 
    game.newCycle();
  // Отправляем состояние игры
  console.log(`Cycle:\t${game.cycle}\nTurn:\t${game.turn}\nPlay:\t${game.action}`);
  emitGameState(game);
  // Проверяем условия победы и завершаем игру
  const winner = game.checkWinConditions();
  if (winner) endGame(winner);
}

async function endGame(winner) {
  server.emit("game-over", { winner });
  const sockets = await server.fetchSockets();
  sockets.forEach(socket => socket.disconnect(true));
}

function updateBusy() {
  // TODO
}