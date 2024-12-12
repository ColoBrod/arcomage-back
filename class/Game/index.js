const deck = require('./deck');

// const Player = require('../Player');
// const Resource = require('../Resource');

/**
 * @property {number} action - Розыгрыш карты
 * @property {number} turn - Ход игрока (может состоять из нескольких ходов)
 * -1 - Ожидаем игрока или его подключения
 *  0 - 1-ый игрок
 *  1 - 2-ой игрок
 * @property {number} cycle - Ход 2-ух игроков (полный цикл)
 * @property {Object} condition - Максимально возможные величины (башни/стены/ресов)
 * @property {Array} deck - Перетасованная колода карт
 */
class Game {
  constructor() {
    this.condition = {
      tower: 100, // Максимальный размер башни
      wall: 50, // Максимальный размер стенки
      resource: 200, // Максимальное количество ресов
    }
    this.deck = Game.shuffle([...deck, ...deck]);
    console.log("Deck length:", this.deck.length);
    this.player = [ 
      new Player("Player 1", this.deck), 
      new Player("Player 2", this.deck),
    ];

    this.lastCard = null;
    this.cycle = 0;
    this.turn = 0;
    this.action = 0;
    this.busy = false;
  }

  play(playerId, cardIndex) {
    const player = this.player[playerId];
    const enemy = this.player.find(p => p != player)
    const card = player.cards[cardIndex];
    const resId = card.res.id;
    const { deck } = this;

    player.playagain = false;

    // Потратить ресурсы
    // Если ресурсов недостаточно, то отказать.
    if (card.res.cost > player.res[resId].amount) return false;
    player.res[resId].amount -= card.res.cost;
    // Сообщает игроку, какую карту он разыграл.
    player.playedCard = cardIndex;
    console.log(`Игрок ${playerId} разыгрывает карту ${cardIndex}`);
    console.log(card);
    // Применить эффект карты
    card.handler(player, enemy);
    // Забрать карту у игрока и поместить в колоду, Получить 1 карту из колоды
    player.cards.splice(cardIndex, 1);
    deck.push(card);
    const newCard = deck.splice(0,1)[0];
    player.cards.push(newCard);
    // Выложить карту на стол, чтобы все видели, что было разыграно
    this.lastCard = card;
    this.lastDiscarded = false;
    this.action++;
    return true; // if playable
  }

  discard(playerId, cardIndex) {
    const player = this.player[playerId];
    const card = player.cards[cardIndex];
    const { deck } = this;
    player.playagain = false;
    console.log(`Игрок ${playerId} сбрасывает карту ${cardIndex}`);
    console.log(card);
    player.cards.splice(cardIndex, 1);
    deck.push(card);
    const newCard = deck.splice(0,1)[0];
    player.cards.push(newCard);
    this.lastCard = card;
    this.lastDiscarded = true;
    this.action++;
  }

  newCycle() {
    this.cycle += 1;
    this.player.forEach(p => {
      p.res.forEach(res => {
        res.amount += res.income;
      });
      // server.emit("battle-log")
      // p[i].res.amount += p[i].res.income;
    });
  }

  #spendRes(playerId, resId, amount) {

  }

  // TODO
  checkWinConditions() {
    let winner, loser;
    winner = this.player.find(p => {
      const towerCondition = p.tower >= this.condition.tower
      const resCondition = p.res.find(r => r.amount >= this.condition.resource);
      if (towerCondition || resCondition) return true;
    });
    loser = this.player.find(p => p.tower <= 0);
    if (loser) {
      winner = this.player.find(p => p != loser);
      this.turn = -1;
    }
    return winner || null;
  }

  static dealCards(deck) {
    console.log("Изначальный размер колоды:", deck.length);
    const cards = deck.splice(0, 6);
    console.log("Новый размер колоды:", deck.length);
    return cards;
  }

  static shuffle(deck) {
    const deck1 = [...deck];
    const deck2 = [];
    for (let i = 0; i < deck.length; i++) {
      const r = Math.floor(Math.random() * deck1.length);
      const card = deck1.splice(r, 1)[0];
      deck2[i] = card;
    }
    console.log("Перемешанная колода:", deck2);
    return deck2;
  }

}

class Player {
  constructor(name, deck) {
    this.name = name;
    this.cards = Game.dealCards(deck);
    this.tower = 20;
    this.wall = 10;
    this.res = [
      { income: 2, amount: 20 },
      { income: 2, amount: 20 },
      { income: 2, amount: 20 },
    ];
    // Effect: Play Again
    this.playagain = false;
    // Effect: Draw, Discard, Play Again
    this.ddpa = false;
    this.playedCard = -1;
  }

  apply(target, value = 1) {
    switch (target) {
      case "quarry":
      case "magic":
      case "dungeon":
      {
        const i = Resource.indexOf(target);
        const { income } = this.res[i];
        this.res[i].income = income + value > 0 
          ? income + value 
          : 1;
        if (target == "quarry" && value > 0) server.emit("sfx", "brick_up");
        if (target == "quarry" && value < 0) server.emit("sfx", "brick_down");
        if (target == "magic" && value > 0) server.emit("sfx", "gem_up");
        if (target == "magic" && value < 0) server.emit("sfx", "gem_down");
        if (target == "dungeon" && value > 0) server.emit("sfx", "recruit_up");
        if (target == "dungeon" && value < 0) server.emit("sfx", "recruit_down");
        break;
      }
      case "bricks":
      case "gems":
      case "recruits":
      {
        const i = Resource.indexOf(target);
        const { amount } = this.res[i];
        this.res[i].amount = amount + value > 0
          ? amount + value
          : 0;
        if (target == "bricks" && value > 0) server.emit("sfx", "brick_up");
        if (target == "bricks" && value < 0) server.emit("sfx", "brick_down");
        if (target == "gems" && value > 0) server.emit("sfx", "gem_up");
        if (target == "gems" && value < 0) server.emit("sfx", "gem_down");
        if (target == "recruits" && value > 0) server.emit("sfx", "recruit_up");
        if (target == "recruits" && value < 0) server.emit("sfx", "recruit_down");
        break;
      }
      case "tower":
      case "wall":
      {
        if (this[target] + value > game.condition[target])
          this[target] = game.condition[target];
        else if (this[target] + value < 0)
          this[target] = 0;
        else 
          this[target] += value;
        if (target == "wall" && value > 0) server.emit("sfx", "wall_up");
        if (target == "wall" && value < 0) server.emit("sfx", "damage");
        if (target == "tower" && value > 0) server.emit("sfx", "tower_up");
        if (target == "tower" && value < 0) server.emit("sfx", "damage");
        break;
      }
      case "damage":
      {
        if (this.wall >= value) 
          this.wall = this.wall - value;
        else if ((this.tower + this.wall - value) < 0) {
          this.tower = 0;
          this.wall = 0;
        }
        else {
          this.tower = this.tower + this.wall - value;
          this.wall = 0;
        }
        server.emit("sfx", "damage");
        break;
      }
      case "playagain":
        this.playagain = true;
        break;
      case "ddpa":
        this.ddpa = true;
        break;
    }
  }

}

class Resource {
  static name = {
    income: ["quarry", "magic", "dungeon"],
    resource: ["bricks", "gems", "recruits"],
  }

  static indexOf(name) {
    const { income, resource } = Resource.name;
    let first = income.indexOf(name);
    let second = resource.indexOf(name);
    if (first != -1) return first;
    return second;
  }
}


module.exports = Game;