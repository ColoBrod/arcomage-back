module.exports = [
  /**
   * RED
   */
  {
    // 0
    slug: "brick_shortage",
    title: "Brick Shortage",
    res: { id: 0, cost: 0 },
    desc: "All players lose 8 bricks",
    handler: (p, e) => {
      p.apply("bricks", -8);
      e.apply("bricks", -8);
    },
  },
  {
    // 1
    slug: "lucky_cache",
    title: "Lucky Cache",
    res: { id: 0, cost: 0 },
    desc: "+2 Bricks. +2 Gems. Play again",
    handler: (p, e) => {
      p.apply("bricks", 2);
      p.apply("gems", 2);
      p.apply("playagain", 1);
    },
  },
  {
    // 2
    slug: "friendly_terrain",
    title: "Friendly Terrain",
    res: { id: 0, cost: 1 },
    desc: "+1 Wall. Play again",
    handler: (p, e) => {
      p.apply("wall", 1);
      p.apply("playagain", 1);
    },
  },
  {
    // 3
    slug: "miners",
    title: "Miners",
    res: { id: 0, cost: 3 },
    desc: "+1 Quarry",
    handler: (p, e) => {
      p.apply("quarry", 1);
    },
  },
  {
    // 4
    slug: "mother_lode",
    title: "Mother Lode",
    res: { id: 0, cost: 4 },
    desc: "If quarry < enemy quarry, +2 quarry. Else, +1 quarry",
    handler: (p, e) => {
      // TODO
      if (p.res[0].income < e.res[0].income) p.apply("quarry", 2);
      else p.apply("quarry", 1);
    },
  },
  {
    // 5
    slug: "dwarven_miners",
    title: 'Dwarven Miners',
    desc: '+4 Wall, +1 quarry',
    res: { id: 0, cost: 7 },
    handler: (p, e) => {
      p.apply("wall", 4);
      p.apply("quarry", 1);
    },
  },
  {
    // 6
    slug: "work_overtime",
    title: 'Work Overtime',
    desc: '+5 Wall. You lose 6 gems',
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("wall", 5);
      p.apply("gems", -6);
    },
  },
  {
    // 7
    slug: "copping_the_tech",
    title: 'Copping the Tech',
    desc: 'If quarry < enemy quarry, quarry = enemy quarry',
    res: { id: 0, cost: 5 },
    handler: (p, e) => {
      if (p.res[0].income < e.res[0].income)
        p.res[0].income = e.res[0].income;
    },
  },
  {
    // 8
    slug: "basic_wall",
    title: 'Basic Wall',
    desc: '+3 Wall',
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("wall", 3)
    },
  },
  {
    // 9
    slug: "sturdy_wall",
    title: 'Sturdy Wall',
    desc: '+4 Wall',
    res: { id: 0, cost: 3 },
    handler: (p, e) => {
      p.apply("wall", 4)
    },
  },
  {
    // 10
    slug: "innovations",
    title: 'Innovations',
    desc: "+1 To all player's quarrys, you gain 4 gems",
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("quarry", 1);
      e.apply("quarry", 1);
      p.apply("gems", 4);
    },
  },
  {
    // 11
    slug: "foundations",
    title: 'Foundations',
    desc: 'If wall = 0, +6 wall, else +3 wall',
    res: { id: 0, cost: 3 },
    handler: (p, e) => {
      if (p.wall == 0) p.apply("wall", 6);
      else p.apply("wall", 3);
    }
  },
  {
    // 12
    slug: "tremors",
    title: 'Tremors',
    desc: 'All walls take 5 damage. Play again',
    res: { id: 0, cost: 7 },
    handler: (p, e) => {
      p.apply("wall", -5);
      e.apply("wall", -5);
      p.apply("playagain");
    }
  },
  {
    // 13
    slug: "secret_room",
    title: 'Secret Room',
    desc: '+1 Magic. Play again',
    res: { id: 0, cost: 8 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("playagain");
    }
  },
  {
    // 14
    slug: "earthquake",
    title: 'Earthquake',
    desc: "-1 To all player's quarrys",
    res: { id: 0, cost: 0 },
    handler: (p, e) => {
      p.apply("quarry", -1);
      e.apply("quarry", -1);
    }
  },
  {
    // 15
    slug: "big_wall",
    title: 'Big Wall',
    desc: '+6 Wall',
    res: { id: 0, cost: 5 },
    handler: (p, e) => {
      p.apply("wall", 6);
    }
  },
  {
    // 16
    slug: "collapse",
    title: 'Collapse!',
    desc: '-1 Enemy quarry',
    res: { id: 0, cost: 4 },
    handler: (p, e) => {
      e.apply("quarry", -1);
    }
  },
  {
    // 17
    slug: "new_equipment",
    title: 'New Equipment',
    desc: '+2 Quarry',
    res: { id: 0, cost: 6 },
    handler: (p, e) => {
      p.apply("quarry", 2);
    }
  },
  {
    // 18
    slug: "strip_mine",
    title: 'Strip Mine',
    desc: '-1 Quarry. +10 Wall. You gain 5 gems',
    res: { id: 0, cost: 0 },
    handler: (p, e) => {
      p.apply("quarry", -1);
      p.apply("wall", 10);
      p.apply("gems", 5);
    }
  },
  {
    // 19
    slug: "reinforced_wall",
    title: 'Reinforced Wall',
    desc: '+8 Wall',
    res: { id: 0, cost: 8 },
    handler: (p, e) => {
      p.apply("wall", 8);
    }
  },
  {
    // 20
    slug: 'porticulus',
    title: 'Porticulus',
    desc: '+5 Wall, +1 dungeon',
    res: { id: 0, cost: 9 },
    handler: (p, e) => {
      p.apply("wall", 5);
      p.apply("dungeon", 1)
    }
  },
  {
    // 21
    slug: 'crystal_rocks',
    title: 'Crystal Rocks',
    desc: '+7 Wall, gain 7 gems',
    res: { id: 0, cost: 9 },
    handler: (p, e) => {
      p.apply("wall", 7);
      p.apply("gems", 7);
    }
  },
  {
    // 22
    slug: "harmonic_ore",
    title: 'Harmonic Ore',
    desc: '+6 Wall, +3 tower',
    res: { id: 0, cost: 11 },
    handler: (p, e) => {
      p.apply("wall", 6);
      p.apply("tower", 3);
    },
  },
  {
    // 23
    slug: "mondo_wall",
    title: 'Mondo Wall',
    desc: '+12 Wall',
    res: { id: 0, cost: 13 },
    handler: (p, e) => {
      p.apply("wall", 12);
    },
  },
  {
    // 24
    slug: "focused_designs",
    title: 'Focused Designs',
    desc: '+8 Wall, +5 tower',
    res: { id: 0, cost: 15 },
    handler: (p, e) => {
      p.apply('wall', 8);
      p.apply('tower', 5);
    },
  },
  {
    // 25
    slug: "great_wall",
    title: 'Great Wall',
    desc: '+15 Wall',
    res: { id: 0, cost: 16 },
    handler: (p, e) => {
      p.apply("wall", 15);
    },
  },
  // 26!!! Катапульта!!!
  {
    // 27
    slug: "dragons_heart",
    title: "Dragon's Heart",
    desc: '+20 Wall. +8 Tower',
    res: { id: 0, cost: 24 },
    handler: (p, e) => {
      p.apply("wall", 20);
      p.apply("tower", 8);
    },
  },
  {
    // 28
    slug: "forced_labor",
    title: 'Forced Labor',
    desc: '+9 Wall, lose 5 recruits',
    res: { id: 0, cost: 7 },
    handler: (p, e) => {
      p.apply("wall", 9);
      p.apply("recruits", -5);
    },
  },
  {
    // 29
    slug: "rock_garden",
    title: 'Rock Garden',
    desc: '+1 Wall. +1 Tower. +2 Recruits',
    res: { id: 0, cost: 1 },
    handler: (p, e) => {
      p.apply("wall", 1);
      p.apply("tower", 1);
      p.apply("recruits", 2);
    },
  },
  {
    // 30
    slug: "flood_water",
    title: 'Flood Water',
    desc: 'Player(s) w/ lowest wall are -1 Dungeon and 2 damage to tower',
    res: { id: 0, cost: 6 },
    handler: (p, e) => {
      if (p.wall > e.wall) {
        e.apply("dungeon", -1);
        e.apply("tower", -2);
      }
      else if (e.wall > p.wall) {
        p.apply("dungeon", -1);
        p.apply("tower", -2);
      }
      else {
        e.apply("dungeon", -1);
        e.apply("tower", -2);
        p.apply("dungeon", -1);
        p.apply("tower", -2);
      }
    },
  },
  {
    // 31
    slug: "barracks",
    title: 'Barracks',
    desc: '+6 Recruits, +6 wall. If dungeon < enemy dungeon, +1 dungeon',
    res: { id: 0, cost: 10 },
    handler: (p, e) => {
      p.apply("recruits", 6);
      p.apply("wall", 6);
      if (p.res[2].income < e.res[2].income) p.apply("dungeon", 1);
    },
  },
  {
    // 32
    slug: "battlements",
    title: 'Battlements',
    desc: '+7 Wall, 6 damage to enemy',
    res: { id: 0, cost: 14 },
    handler: (p, e) => {
      p.apply("wall", 7);
      e.apply("damage", 6);
    },
  },
  {
    // 33
    slug: "shift",
    title: 'Shift',
    desc: 'Switch your wall with enemy wall',
    res: { id: 0, cost: 17 },
    handler: (p, e) => {
      const original = p.wall;
      p.wall = e.wall;
      e.wall = original;
    },
  },
  /**
   * 
   * =====================================================
   * 
   * blue
   */
  {
    slug: "quartz",
    title: "Quartz",
    res: { id: 1, cost: 1 },
    desc: "+1 Tower. Play again",
    handler: (p, e) => {
      p.apply("tower", 1);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "smoky_quartz",
    title: "Smoky Quartz",
    res: { id: 1, cost: 2 },
    desc: "1 Damage to enemy tower. Play again",
    handler: (p, e) => {
      e.apply("tower", -1);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "amethyst",
    title: "Amethyst",
    res: { id: 1, cost: 2 },
    desc: "+3 Tower",
    handler: (p, e) => {
      p.apply("tower", 3);
    },
  },
  {
    slug: "spell_weavers",
    title: "Spell Weavers",
    res: { id: 1, cost: 3 },
    desc: "+1 Magic",
    handler: (p, e) => {
      p.apply("magic", 1);
    }
  },
  {
    slug: "prism",
    title: "Prism",
    res: { id: 1, cost: 2 },
    desc: "Draw 1 card. Discard 1 card. Play again",
    handler: (p, e) => {
      p.apply("ddpa");
    },
  },
  {
    // 39
    slug: "lodestone",
    title: 'Lodestone',
    desc: "+3 Tower. This card can't be discarded without playing it",
    res: { id: 1, cost: 5 },
    handler: (p, e) => {
      p.apply("tower", 3);
    }
  },
  {
    // 40
    slug: "solar_flare",
    title: 'Solar Flare',
    desc: '+2 Tower. 2 Damage to enemy tower',
    res: { id: 1, cost: 4 },
    handler: (p, e) => {
      p.apply("tower", 2);
      e.apply("tower", -2)
    }
  },
  {
    // 41
    slug: "crystal_matrix",
    title: 'Crystal Matrix',
    desc: '+1 Magic. +3 Tower. +1 Enemy tower',
    res: { id: 1, cost: 6 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("tower", 3);
      e.apply("tower", 1);
    }
  },
  {
    // 42
    slug: "gemstone_flaw",
    title: 'Gemstone Flaw',
    desc: '3 Damage to enemy tower',
    res: { id: 1, cost: 2 },
    handler: (p, e) => {
      e.apply("tower", -3);
    }
  },
  {
    // 43
    slug: "ruby",
    title: 'Ruby',
    desc: '+5 Tower',
    res: { id: 1, cost: 3 },
    handler: (p, e) => {
      p.apply("tower", 5);
    }
  },
  {
    // 44
    slug: "gem_spear",
    title: 'Gem Spear',
    desc: '5 Damage to enemy tower',
    res: { id: 1, cost: 4 },
    handler: (p, e) => {
      e.apply("tower", -5);
    }
  },
  {
    // 45
    slug: "power_burn",
    title: 'Power Burn',
    desc: '5 Damage to your tower. +2 Magic',
    res: { id: 1, cost: 3 },
    handler: (p, e) => {
      p.apply("tower", -5);
      p.apply("magic", 2);
    }
  },
  {
    // 46
    slug: "harmonic_vibe",
    title: 'Harmonic Vibe',
    desc: '+1 Magic. +3 Tower. +3 Wall',
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("tower", 3);
      p.apply("wall", 3);
    }
  },
  {
    // 47
    slug: "parity",
    title: 'Parity',
    desc: "All player's magic equals the highest player's magic",
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      if (p.res[1].income > e.res[1].income) e.res[1].income = p.res[1].income;
      else p.res[1].income = e.res[1].income;
    }
  },
  {
    // 48
    slug: "emerald",
    title: 'Emerald',
    desc: '+8 Tower',
    res: { id: 1, cost: 6 },
    handler: (p, e) => {
      p.apply("tower", 8);
    }
  },
  {
    // 49
    slug: "pearl_of_wisdom",
    title: 'Pearl of Wisdom',
    desc: '+5 Tower. +1 Magic',
    res: { id: 1, cost: 9 },
    handler: (p, e) => {
      p.apply("tower", 5);
      p.apply("magic", 1);
    }   
  },
  {
    // 50
    slug: "shatterer",
    title: 'Shatterer',
    desc: '-1 Magic. 9 Damage to enemy tower',
    res: { id: 1, cost: 8 },
    handler: (p, e) => {
      p.apply("magic", -1);
      e.apply("tower", -9);
    }   
  },
  {
    // 51
    slug: "crumblestone",
    title: 'Crumblestone',
    desc: '+5 Tower. Enemy loses 6 bricks',
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      p.apply("tower", 5);
      e.apply("bricks", -6);
    }
  },
  {
    // 52
    slug: "sapphire",
    title: 'Sapphire',
    desc: '+11 Tower',
    res: { id: 1, cost: 10 },
    handler: (p, e) => {
      p.apply("tower", 11);
    }
  },
  {
    // 53
    slug: "discord",
    title: 'Discord',
    desc: '7 Damage to all towers, all players magic -1',
    res: { id: 1, cost: 5 },
    handler: (p, e) => {
      p.apply("tower", -7);
      e.apply("tower", -7);
      p.apply("magic", -1);
      e.apply("magic", -1);
    }
  },
  {
    // 54
    slug: "fire_ruby",
    title: 'Fire Ruby',
    desc: '+6 Tower. 4 Damage to enemy tower',
    res: { id: 1, cost: 13 },
    handler: (p, e) => {
      p.apply("tower", 6);
      e.apply("tower", -4);
    },
  },
  {
    // 55
    slug: "quarrys_help",
    title: "Quarry's Help",
    desc: '+7 Tower. Lose 10 bricks',
    res: { id: 1, cost: 4 },
    handler: (p, e) => {
      p.apply("tower", 7);
      p.apply("bricks", -10);
    },
  },
  {
    // 56
    slug: "crystal_shield",
    title: 'Crystal Shield',
    desc: '+8 Tower. +3 Wall',
    res: { id: 1, cost: 12 },
    handler: (p, e) => {
      p.apply("tower", 8);
      p.apply("wall", 3);
    },
  },
  {
    // 57
    slug: "empathy_gem",
    title: 'Empathy Gem',
    desc: '+8 Tower. +1 Dungeon',
    res: { id: 1, cost: 14 },
    handler: (p, e) => {
      p.apply("tower", 8);
      p.apply("dungeon", 1);
    },
  },
  {
    // 58
    slug: "diamond",
    title: 'Diamond',
    desc: '+15 Tower',
    res: { id: 1, cost: 16 },
    handler: (p, e) => {
      p.apply("tower", 15);
    },
  },
  {
    // 59
    slug: "sanctuary",
    title: 'Sanctuary',
    desc: '+10 Tower. +5 Wall, gain 5 recruits',
    res: { id: 1, cost: 15 },
    handler: (p, e) => {
      p.apply("tower", 10);
      p.apply("wall", 5);
      p.apply("recruits", 5);
    },
  },
  {
    // 60
    slug: "lava_jewel",
    title: 'Lava Jewel',
    desc: '+12 Tower. 6 Damage to enemy',
    res: { id: 1, cost: 17 },
    handler: (p, e) => {
      p.apply("tower", 12);
      e.apply("damage", 6);
    },
  },
  {
    // 61
    slug: "dragons_eye",
    title: "Dragon's Eye",
    desc: '+20 Tower',
    res: { id: 1, cost: 21 },
    handler: (p, e) => {
      p.apply("tower", 20);
    },
  },
  {
    // 62
    slug: "crystallize",
    title: 'Crystallize',
    desc: '+11 Tower. -6 Wall',
    res: { id: 1, cost: 8 },
    handler: (p, e) => {
      p.apply("tower", 11);
      p.apply("wall", -6);
    },
  },
  {
    // 63
    slug: "bag_of_baubles",
    title: 'Bag of Baubles',
    desc: 'If tower < enemy tower, +2 tower. Else +1 tower',
    res: { id: 1, cost: 0 },
    handler: (p, e) => {
      if (p.tower < e.tower) p.apply("tower", 2);
      else p.apply("tower", 1);
    },
  },
  {
    // 64
    slug: "rainbow",
    title: 'Rainbow',
    desc: '+1 Tower to all players. You gain 3 gems',
    res: { id: 1, cost: 0 },
    handler: (p, e) => {
      p.apply("tower", 1);
      e.apply("tower", 1);
      p.apply("gems", 3);
    },
  },
  {
    // 65
    slug: "apprentice",
    title: 'Apprentice',
    desc: '+4 Tower, you lose 3 recruits, 2 damage to enemy tower',
    res: { id: 1, cost: 5 },
    handler: (p, e) => {
      p.apply("tower", 4);
      p.apply("recruits", -3);
      e.apply("tower", -2);
    },
  },
  {
    // 66
    slug: "lightning_shard",
    title: 'Lightning Shard',
    desc: 'If Tower > enemy wall, 8 damage to enemy tower. Else 8 damage',
    res: { id: 1, cost: 11 },
    handler: (p, e) => {
      if (p.tower > e.wall) e.apply("tower", -8);
      else e.apply("damage", 8);
    },
  },
  {
    // 67
    slug: "phase_jewel",
    title: 'Phase Jewel',
    desc: '+13 Tower. +6 Recruits. +6 Bricks',
    res: { id: 1, cost: 18 },
    handler: (p, e) => {
      p.apply("tower", 13);
      p.apply("recruits", 6);
      p.apply("bricks", 6);
    },
  },
  /**
   * =========================
   * GREEN
   */
  {
    // 68
    slug: "mad_cow_disease",
    title: "Mad Cow Disease",
    res: { id: 2, cost: 0 },
    desc: "All players lose 6 recruits",
    handler: (p, e) => {
      p.apply("recruits", -6);
      e.apply("recruits", -6);
    },
  },
  {
    slug: "faerie",
    title: "Faerie",
    res: { id: 2, cost: 1 },
    desc: "2 Damage. Play again",
    handler: (p, e) => {
      p.apply("playagain")
      e.apply("damage", 2);
    },
  },
  {
    slug: "moody_goblins",
    title: "Moody Goblins",
    res: { id: 2, cost: 1 },
    desc: "4 Damage. You lose 3 gems",
    handler: (p, e) => {
      e.apply("damage", 4);
      p.apply("gems", -3);
    },
  },
  {
    slug: "minotaur",
    title: "Minotaur",
    res: { id: 2, cost: 3 },
    desc: "+1 Dungeon",
    handler: (p, e) => {
      p.apply("dungeon", 1);
    },
  },
  {
    slug: "elven_scout",
    title: "Elven Scout",
    res: { id: 2, cost: 2 },
    desc: "Draw 1 card. Discard 1 card. Play again",
    handler: (p, e) => {
      p.apply("ddpa");
    },
  },
  {
    // 73
    slug: "goblin_mob",
    title: 'Goblin Mob',
    desc: '6 Damage. You take 3 damage',
    res: { id: 2, cost: 3 },
    handler: (p, e) => {
      e.apply("damage", 6);
      p.apply("damage", 3);
    },
  },
  {
    // 74
    slug: "goblin_archers",
    title: 'Goblin Archers',
    desc: '3 Damage to enemy tower. You take 1 damage',
    res: { id: 2, cost: 4 },
    handler: (p, e) => {
      e.apply("tower", -3);
      p.apply("damage", 1);
    },
  },
  {
    // 75
    slug: "shadow_faerie",
    title: 'Shadow Faerie',
    desc: '2 Damage to enemy tower. Play again',
    res: { id: 2, cost: 6 },
    handler: (p, e) => {
      e.apply("tower", -2);
      p.apply("playagain");
    },
  },
  {
    // 76
    slug: "orc",
    title: 'Orc',
    desc: '5 Damage',
    res: { id: 2, cost: 3 },
    handler: (p, e) => {
      e.apply("damage", 5);
    },
  },
  {
    // 77
    slug: "dwarves",
    title: 'Dwarves',
    desc: '4 Damage. +3 Wall',
    res: { id: 2, cost: 5 },
    handler: (p, e) => {
      e.apply("damage", 4);
      p.apply("wall", 3);
    },
  },
  {
    // 78
    slug: 'little_snakes',
    title: 'Little Snakes',
    desc: '4 Damage to enemy tower',
    res: { id: 2, cost: 6 },
    handler: (p, e) => {
      e.apply("tower", -4);
    },
  },
  {
    // 79
    slug: 'troll_trainer',
    title: 'Troll Trainer',
    desc: '+2 Dungeon',
    res: { id: 2, cost: 7 },
    handler: (p, e) => {
      p.apply("dungeon", 2);
    },
  },
  {
    // 80
    slug: 'tower_gremlin',
    title: 'Tower Gremlin',
    desc: '2 Damage. +4 Tower. +2 Wall',
    res: { id: 2, cost: 8 },
    handler: (p, e) => {
      e.apply("damage", 2);
      p.apply("tower", 4);
      p.apply("wall", 2);
    },
  },
  {
    // 81
    slug: 'full_moon',
    title: 'Full Moon',
    desc: "+1 to all player's dungeon. You gain 3 recruits",
    res: { id: 2, cost: 0 },
    handler: (p, e) => {
      p.apply("dungeon", 1);
      e.apply("dungeon", 1);
      p.apply("recruits", 3);
    },
  },
  {
    // 82
    slug: 'slasher',
    title: 'Slasher',
    desc: '6 Damage',
    res: { id: 2, cost: 5 },
    handler: (p, e) => {
      e.apply("damage", 6);
    },
  },
  {
    // 83
    slug: 'Ogre',
    title: 'Ogre',
    desc: '7 Damage',
    res: { id: 2, cost: 6 },
    handler: (p, e) => {
      e.apply("damage", 7);
    },
  },
  {
    // 84
    slug: 'rabid_sheep',
    title: 'Rabid Sheep',
    desc: '6 Damage. Enemy loses 3 recruits',
    res: { id: 2, cost: 6 },
    handler: (p, e) => {
      e.apply("damage", 6);
      e.apply("recruits", -3);
    },
  },
  {
    // 85
    slug: 'imp',
    title: 'Imp',
    desc: '6 Damage. All players lose 5 bricks, gems and recruits',
    res: { id: 2, cost: 5 },
    handler: (p, e) => {
      e.apply("damage", 6);
      p.apply("bricks", -5);
      p.apply("gems", -5);
      p.apply("recruits", -5);
      e.apply("bricks", -5);
      e.apply("gems", -5);
      e.apply("recruits", -5);
    },
  },
  {
    // 86
    slug: 'spizzer',
    title: 'Spizzer',
    desc: 'If enemy wall = 0, 10 damage, else 6 damage',
    res: { id: 2, cost: 8 },
    handler: (p, e) => {
      if (e.wall == 0) e.apply("damage", 10);
      else e.apply("damage", 6);
    },
  },
  {
    // 87
    slug: 'werewolf',
    title: 'Werewolf',
    desc: '9 Damage',
    res: { id: 2, cost: 9 },
    handler: (p, e) => {
      e.apply("damage", 9)
    },
  },
  {
    // 88
    slug: 'corrosion_cloud',
    title: 'Corrosion Cloud',
    desc: 'If enemy wall > 0, 10 damage, else 7 damage',
    res: { id: 2, cost: 11 },
    handler: (p, e) => {
      if (e.wall > 0) e.apply("damage", 10);
      else e.apply("damage", 7)
    },
  },
  {
    // 89
    slug: 'unicorn',
    title: 'Unicorn',
    desc: 'If magic > enemy magic, 12 damage, else 8 damage',
    res: { id: 2, cost: 9 },
    handler: (p, e) => {
      if (p.res[1].income > e.res[1].income) e.apply("damage", 12);
      else e.apply("damage", 8);
    },
  },
  {
    // 90
    slug: 'elven_archers',
    title: 'Elven Archers',
    desc: 'If wall > enemy wall, 6 damage to enemy tower, else 6 damage',
    res: { id: 2, cost: 10 },
    handler: (p, e) => {
      if (p.wall > e.wall) e.apply("tower", -6);
      else e.apply("damage", 6);
    },
  },
  {
    // 91
    slug: "succubus",
    title: 'Succubus',
    desc: '5 Damage to enemy tower, enemy loses 8 recruits',
    res: { id: 2, cost: 14 },
    handler: (p, e) => {
      e.apply("tower", -5);
      e.apply("recruits", -8);
    },
  },
  {
    // 92
    slug: "rock_stompers",
    title: 'Rock Stompers',
    desc: '8 Damage, -1 enemy quarry',
    res: { id: 2, cost: 11 },
    handler: (p, e) => {
      e.apply("damage", 8);
      e.apply("quarry", -1);
    },
  },
  {
    // 93
    slug: "thief",
    title: 'Thief',
    desc: 'Enemy loses 10 gems, 5 bricks, you gain 1/2 amt. round up',
    res: { id: 2, cost: 12 },
    handler: (p, e) => {
      const gems = Math.ceil((e.res[1].amount >= 10 ? 10 : e.res[1].amount) / 2);
      const bricks = Math.ceil((e.res[0].amount >= 5 ? 3 : e.res[0].amount) / 2);
      e.apply("gems", -10);
      e.apply("bricks", -5);
      p.apply("gems", gems);
      p.apply("bricks", bricks);
    },
  },
  {
    // 94
    slug: "stone_giant",
    title: 'Stone Giant',
    desc: '10 Damage. +4 Wall',
    res: { id: 2, cost: 15 },
    handler: (p, e) => {
      e.apply("damage", 10);
      p.apply("wall", 4);
    },
  },
  {
    // 95
    slug: "vampire",
    title: 'Vampire',
    desc: '10 Damage. Enemy loses 5 recruits, -1 enemy dungeon',
    res: { id: 2, cost: 17 },
    handler: (p, e) => {
      e.apply("damage", 10);
      e.apply("recruits", -5);
      e.apply("dungeon", -1);
    },
  },
  {
    // 96
    slug: "dragon",
    title: 'Dragon',
    desc: '20 Damage. Enemy loses 10 gems, -1 enemy dungeon',
    res: { id: 2, cost: 25 },
    handler: (p, e) => {
      e.apply("damage", 20);
      e.apply("gems", -10);
      e.apply("dungeon", -1);
    },
  },
  {
    // 97
    slug: "spearman",
    title: 'Spearman',
    desc: 'If wall > enemy wall do 3 damage else do 2 damage',
    res: { id: 2, cost: 2 },
    handler: (p, e) => {
      if (p.wall > e.wall) e.apply("damage", 3);
      else e.apply("damage", 2);
    },
  },
  {
    // 98
    slug: "gnome",
    title: 'Gnome',
    desc: '3 Damage. +1 Gem',
    res: { id: 2, cost: 2 },
    handler: (p, e) => {
      e.apply("damage", 3);
      p.apply("gems", 1);
    },
  },
  {
    // 99
    slug: "berserker",
    title: 'Berserker',
    desc: '8 Damage. 3 Damage to your tower',
    res: { id: 2, cost: 4 },
    handler: (p, e) => {
      e.apply("damage", 8);
      p.apply("tower", -3);
    },
  },
  {
    // 100
    slug: "warlord",
    title: 'Warlord',
    desc: '13 Damage. You lose 3 gems',
    res: { id: 2, cost: 13 },
    handler: (p, e) => {
      e.apply("damage", 13);
      p.apply("gems", -3);
    },
  },
  {
    // 101
    slug: "pegasus_lancer",
    title: 'Pegasus Lancer',
    desc: '12 Damage to enemy tower',
    res: { id: 2, cost: 18 },
    handler: (p, e) => {
      e.apply("tower", -12);
    },
  },
];
