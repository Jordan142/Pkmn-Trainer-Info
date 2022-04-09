/* Useful code additions
    { type: "evolve" }, used to change the name to the next evolution stage
    { type: "rare-candy" }, used to increase the level by one
    { type: "exp-candy", experience: 2300 }, used to add a set amount of exp at the point it is used, in this case 2300
    { type: "ev-gain", atk: 130, spd: 20 }, adds the number of EVs to the current total for that stat
    { type: "item-equip", item: "Miracle Seed" }, used to add a held item to the output
    { type: "change-moves", moves: "Tackle/(No Move)/(No Move)/(No Move)" }, used to change the moveset of a pokemon, it is needed for there to be 4 moves when using this for it to be picked up in wartab's damage calc
    ["7", "8"].indexOf(selectedRoute) !== -1 ? { type: "evolve" } : null, used to apply the action to those specific routes only. i.e. Only initial routes 7 and 8 will evolve at that moment
    { type: "kill", pokemon: "Alolan Wartab", level: 69 }, used to show a Pokemon that has been defeated
    { type: "catch", pokemon: "Alolan Wartab", level: 69 }, used to show a Pokemon that has been caught
    { type: "kill", pokemon: "Flygon", level: 47, expShare: true }, used to gain the correct experience if the Pokemon you're routing for did not appear in battle against this Pokemon but was still in the party alive
    { type: "kill", pokemon: "Flygon", level: 47, skipLevel: true }, used to gain the correct experience if you defeat two Pokemon at the same time
    and the first Pokemon that is classed as fainted causes you to level up, use this on the second double battle Pokemon
*/

let initialRoutes = {
    "5": [{ type: "init", level: 5, curve: "Medium Slow", name: "Stage1Pokemon", nature: "Nature", ability: "Ability", evolution1: 69, evolution1Name: "Stage2Pokemon", evolution2: 420, evolution2Name: "Stage3Pokemon", moves: "Tackle/Growl/Quick Attack/(No Move)", Ivs: "0/0/0/0/0/0" }],
    "6": [{ type: "init", level: 6, curve: "Medium Slow", name: "Stage1Pokemon", evolution1: 69, evolution1Name: "Stage2Pokemon", evolution2: 420, evolution2Name: "Stage3Pokemon" }],
    "7": [{ type: "init", level: 7, curve: "Medium Fast", tradeExp: true, name: "Stage1Pokemon", evolution1: 69, evolution1Name: "Stage2Pokemon", evolution2: 420, evolution2Name: "Stage3Pokemon" }],
    "9": [{ type: "init", level: 9, curve: "Medium Fast", name: "Stage1Pokemon", evolution1: 69, evolution1Name: "Stage2Pokemon", evolution2: 420, evolution2Name: "Stage3Pokemon" }, {type: "exp-candy", experience: 2300}, {type: "rare-candy"}, {type: "rare-candy"}],
};
/* Set the level, experience curve, the level the pokemon evolves at, name at each evolution stage and optionally put
in if it gains trade experience, starting moveset, nature, ability and Ivs that the pokemon will have 
Some variables have preset defaults if they are not entered:-
- nature = (None)
- ability = (other)
- moves = (No Move)/(No Move)/(No Move)/(No Move) (NOTE: it is needed for there to be 4 moves when using this for it to be picked up in wartab's damage calc,
there are also moves that are missing in wartab's damage calc, at which point any moves that aren't there are automatically replaced by (No Move))
- Ivs = 0/0/0/0/0/0
These are also the defaults when setting up the pokemon you fight/catch in the route
*/

let EVsOnly = false; // Sets whether you only want to show the EVs for each level up, useful for if you're making an IV calc
let rangerFormat = false; // Sets whether you want the EVs to show in the format used for the IV calcs on https://ranger.maybreak.com/route

let selectedRoute = "5";

/* Output is now generated so that you can copy the opponent pokemon directly from the output and place it into wartab's damage calc: https://wartab.best/damage-calc/
i.e. copy the Starly (Lv. 5) @(None) (Ability: Keen Eye) (Nature: Jolly) (Moves: Tackle/Growl/Quick Attack/(No Move)) IVs: 0/0/0/0/0/0 EVs: 0/0/0/0/0/0 from
[KILL]: Got 50 Exp for killing Starly (Lv. 5) @(None) (Ability: Keen Eye) (Nature: Jolly) (Moves: Tackle/Growl/Quick Attack/(No Move)) IVs: 0/0/0/0/0/0 EVs: 0/0/0/0/0/0
*/

let route = [
    ...initialRoutes[selectedRoute],
    
    { type: "kill", pokemon: "Starly", level: 2 },

    { type: "change-moves", moves: "Tackle/(No Move)/(No Move)/(No Move)" },

    // Route 202
    { type: "kill", pokemon: "Starly", level: 5, nature: "Jolly", ability: "Keen Eye", moves: "Tackle/Growl/Quick Attack/(No Move)" }, // Tristen
    { type: "kill", pokemon: "Bidoof", level: 3, nature: "Jolly", ability: "Unaware", moves: "Tackle/Growl/(No Move)/(No Move)" }, // Natalie
    { type: "kill", pokemon: "Bidoof", level: 3, nature: "Jolly", ability: "Unaware", moves: "Tackle/Growl/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Shinx", level: 5, nature: "Jolly", ability: "Intimidate", moves: "Tackle/Leer/Thundershock/(No Move)" }, // Logan

    // Jubilife School
    { type: "kill", pokemon: "Abra", level: 6, nature: "Timid", ability: "Synchronize", moves: "Charge Beam/(No Move)/(No Move)/(No Move)" }, // Christine
    { type: "kill", pokemon: "Abra", level: 6, nature: "Hasty", ability: "Synchronize", moves: "Charge Beam/(No Move)/(No Move)/(No Move)" }, // Harrison

    // Barry 1 (Route 203)
    { type: "kill", pokemon: "Starly", level: 7, nature: "Jolly", ability: "Keen Eye", moves: "Tackle/Growl/Quick Attack/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Turtwig", level: 9, nature: "Careful", ability: "Overgrow", moves: "Tackle/Withdraw/(No Move)/(No Move)", Ivs: "11/11/11/11/11/11" }, // Start w/ Piplup
    // { type: "kill", pokemon: "Chimchar", level: 9, nature: "Jolly", ability: "Blaze", moves: "Scratch/Leer/(No Move)/(No Move)", Ivs: "11/11/11/11/11/11" }, // Start w/ Turtwig
    // { type: "kill", pokemon: "Piplup", level: 9, nature: "Timid", ability: "Torrent", moves: "Pound/Growl/(No Move)/(No Move)", Ivs: "11/11/11/11/11/11" }, // Start w/ Chimchar

    // Route 203
    { type: "kill", pokemon: "Bidoof", level: 5, nature: "Docile", ability: "Unaware", moves: "Tackle/Growl/Defense Curl/(No Move)" }, // Michael
    { type: "kill", pokemon: "Zubat", level: 5, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/(No Move)" },
    { type: "kill", pokemon: "Kricketot", level: 7, nature: "Jolly", ability: "Shed Skin", moves: "Growl/Pound/Struggle Bug/(No Move)" }, // Dallas
    { type: "kill", pokemon: "Bidoof", level: 4, nature: "Jolly", ability: "Unaware", moves: "Tackle/Growl/(No Move)/(No Move)" }, // Kaitlin
    { type: "kill", pokemon: "Budew", level: 4, nature: "Timid", ability: "Natural Care", moves: "Absorb/Growth/Stun Spore/Worry Seed" },
    { type: "kill", pokemon: "Starly", level: 4, nature: "Jolly", ability: "Keen Eye", moves: "Tackle/Growl/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Machop", level: 7, nature: "Naive", ability: "Guts", moves: "Low Kick/Leer/Focus Energy/(No Move)" }, // Sebastian
    { type: "kill", pokemon: "Starly", level: 5, nature: "Jolly", ability: "Keen Eye", moves: "Tackle/Growl/Quick Attack/(No Move)" }, // Madeline
    { type: "kill", pokemon: "Bidoof", level: 5, nature: "Jolly", ability: "Unaware", moves: "Tackle/Growl/Defense Curl/(No Move)" },

    // Oreburgh Gate
    { type: "kill", pokemon: "Shinx", level: 7, nature: "Docile", ability: "Intimidate", moves: "Tackle/Leer/Thunder Shock/(No Move)" }, // Curtis
    { type: "kill", pokemon: "Budew", level: 5, nature: "Timid", ability: "Natural Cure", moves: "Absorb/Growth/Stun Spore/Worry Seed" }, // Diana
    { type: "kill", pokemon: "Psyduck", level: 5, nature: "Timid", ability: "Cloud Nine", moves: "Scratch/Tail Whip/Water Gun/(No Move)" },

    // Oreburgh Mine
    { type: "kill", pokemon: "Machop", level: 9, nature: "Naive", ability: "Guts", moves: "Low Kick/Leer/Focus Energy/Revenge" }, // Mason
    { type: "kill", pokemon: "Geodude", level: 7, nature: "Quirky", ability: "Rock Head", moves: "Tackle/Defense Curl/Sandstorm/Rock Polish" }, // Colin
    { type: "kill", pokemon: "Onix", level: 7, nature: "Bold", ability: "Rock Head", moves: "Tackle/Harden/Bind/Rock Throw" },

    // Oreburgh Gym
    { type: "kill", pokemon: "Geodude", level: 10, nature: "Impish", ability: "Rock Head", moves: "Tackle/Defense Curl/Rollout/(No Move)" }, // Jonathon
    { type: "kill", pokemon: "Geodude", level: 8, nature: "Impish", ability: "Rock Head", moves: "Tackle/Defense Curl/(No Move)/(No Move)" }, // Darius
    { type: "kill", pokemon: "Onix", level: 8, nature: "Impish", ability: "Rock Head", moves: "Tackle/Harden/Bind/Smack Down" },
    { type: "kill", pokemon: "Geodude", level: 12, nature: "Impish", ability: "Rock Head", moves: "Stealth Rock/Defense Curl/Rollout/(No Move)" }, // Roark
    { type: "kill", pokemon: "Onix", level: 12, nature: "Adamant", ability: "Sturdy", moves: "Stealth Rock/Rock Throw/Bind/(No Move)" },
    { type: "kill", pokemon: "Cranidos", level: 14, nature: "Jolly", ability: "Mold Breaker", moves: "Headbutt/Bulldoze/Leer/(No Move)" },

    // Jubilife City
    { type: "kill", pokemon: "Zubat", level: 9, nature: "Hardy", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/(No Move)" }, // Grunt Double
    { type: "kill", pokemon: "Wurmple", level: 9, nature: "Docile", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" },

    // Route 204 Lower
    { type: "kill", pokemon: "Bidoof", level: 7, nature: "Jolly", ability: "Unaware", moves: "Tackle/Growl/Defense Curl/(No Move)" }, // Sarah
    { type: "kill", pokemon: "Magikarp", level: 5, nature: "Naive", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" }, // Tyler
    { type: "kill", pokemon: "Starly", level: 5, nature: "Docile", ability: "Keen Eye", moves: "Tackle/Growl/Quick Attack/(No Move)" }, 
    { type: "kill", pokemon: "Budew", level: 7, nature: "Timid", ability: "Poison Point", moves: "Absorb/Growth/Stun Spore/Worry Seed" }, // Samantha

    // Route 204 Upper
    { type: "kill", pokemon: "Budew", level: 7, nature: "Timid", ability: "Poison Point", moves: "Absorb/Growth/Stun Spore/Worry Seed" }, // Teighler
    { type: "kill", pokemon: "Cherubi", level: 7, nature: "Timid", ability: "Chlorophyll", moves: "Morning Sun/Tackle/Leafage/(No Move)" }, 
    { type: "kill", pokemon: "Kricketot", level: 7, nature: "Timid", ability: "Shed Skin", moves: "Growl/Pound/Struggle Bug/(No Move)" }, // Brandon 
    { type: "kill", pokemon: "Wurmple", level: 7, nature: "Timid", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" },
    { type: "kill", pokemon: "Pachirisu", level: 9, nature: "Quirky", ability: "Pickup", moves: "Growl/Baby-Doll Eyes/Quick Attack/Charm" }, // Liv & Liz
    { type: "kill", pokemon: "Pachirisu", level: 9, nature: "Quirky", ability: "Pickup", moves: "Growl/Baby-Doll Eyes/Quick Attack/Charm" },

    // Floaroma Meadow
    { type: "kill", pokemon: "Wurmple", level: 9, nature: "Serious", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // Grunt 1
    { type: "kill", pokemon: "Silcoon", level: 9, nature: "Bashful", ability: "Shed Skin", moves: "Harden/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Zubat", level: 11, nature: "Quirky", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/Mean Look" }, // Grunt 2

    // Valley Windworks
    { type: "kill", pokemon: "Glameow", level: 11, nature: "Bashful", ability: "Limber", moves: "Fake Out/Scratch/Growl/(No Move)" }, // Grunt Outside
    { type: "kill", pokemon: "Cascoon", level: 11, nature: "Hardy", ability: "Shed Skin", moves: "Harden/(No Move)/(No Move)/(No Move)" }, // Grunt 1 Inside
    { type: "kill", pokemon: "Wurmple", level: 10, nature: "Docile", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // Grunt 2 Inside
    { type: "kill", pokemon: "Glameow", level: 10, nature: "Serious", ability: "Limber", moves: "Fake Out/Scratch/Growl/(No Move)" },
    { type: "kill", pokemon: "Zubat", level: 14, nature: "Jolly", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/U-turn", Ivs: "15/0/15/0/15/0" }, // Commander Mars
    { type: "kill", pokemon: "Purugly", level: 16, item: "Oran Berry", nature: "Jolly", ability: "Thick Fat", moves: "Fake Out/Scratch/Growl/(No Move)", Ivs: "15/0/15/0/15/0" },

    // Route 205 South Section
    { type: "kill", pokemon: "Ponyta", level: 14, nature: "Hasty", ability: "Flash Fire", moves: "Tackle/Growl/Tail Whip/Ember" }, // Jacob
    { type: "kill", pokemon: "Shinx", level: 12, nature: "Jolly", ability: "Intimidate", moves: "Tackle/Leer/Thunder Shock/Bite" }, // Siena
    { type: "kill", pokemon: "Pachirisu", level: 12, nature: "Quirky", ability: "Pickup", moves: "Growl/Baby-Doll Eyes/Quick Attack/Charm" },
    { type: "kill", pokemon: "Geodude", level: 11, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Defense Curl/Rock Polish/Rollout" }, // Daniel
    { type: "kill", pokemon: "Machop", level: 11, nature: "Relaxed", ability: "No Guard", moves: "Low Kick/Leer/Focus Energy/Revenge" },
    { type: "kill", pokemon: "Geodude", level: 11, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Defense Curl/Rock Polish/Rollout" },
    { type: "kill", pokemon: "Bidoof", level: 11, nature: "Hardy", ability: "Unaware", moves: "Tackle/Growl/Defense Curl/Rollout" },
    { type: "kill", pokemon: "Onix", level: 14, nature: "Relaxed", ability: "Sturdy", moves: "Tackle/Harden/Bind/Rock Throw" }, // Nicholas
    { type: "kill", pokemon: "Machop", level: 15, nature: "Jolly", ability: "No Guard", moves: "Tackle/Harden/Bind/Rock Throw" }, // Kelsey
    { type: "kill", pokemon: "Budew", level: 14, nature: "Calm", ability: "Poison Point", moves: "Absorb/Growth/Stun Spore/Worry Seed" }, //  Elizabeth
    { type: "kill", pokemon: "Geodude", level: 14, nature: "Impish", ability: "Rock Head", moves: "Tackle/Defense Curl/Sandstorm/Rollout" }, // Zackary
    { type: "kill", pokemon: "Piplup", level: 14, nature: "Hasty", ability: "Torrent", moves: "Pound/Growl/Water Gun/Charm" }, // Karina

    // Eterna Forest
    { type: "kill", pokemon: "Wurmple", level: 9, nature: "Naive", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // Jack
    { type: "kill", pokemon: "Silcoon", level: 11, nature: "Naive", ability: "Shed Skin", moves: "Harden/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Beautifly", level: 13, nature: "Docile", ability: "Swarm", moves: "Gust/Absorb/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Pachirisu", level: 14, nature: "Quirky", ability: "Pickup", moves: "Baby-Doll Eyes/Quick Attack/Charm/Spark" }, // Briana
    { type: "kill", pokemon: "Abra", level: 15, nature: "Calm", ability: "Synchronize", moves: "Energy Ball/(No Move)/(No Move)/(No Move)" }, // Lindsey
    { type: "kill", pokemon: "Abra", level: 15, nature: "Sassy", ability: "Synchronize", moves: "Energy Ball/(No Move)/(No Move)/(No Move)" }, // Elijah
    { type: "kill", pokemon: "Wurmple", level: 9, nature: "Naive", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // Phillip
    { type: "kill", pokemon: "Cascoon", level: 11, nature: "Naive", ability: "Shed Skin", moves: "Harden/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Dustox", level: 13, nature: "Hasty", ability: "Shield Dust", moves: "Gust/Confusion/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Burmy", level: 12, nature: "Docile", ability: "Shed Skin", moves: "Protect/Tackle/(No Move)/(No Move)" }, // Donald
    { type: "kill", pokemon: "Kricketune", level: 12, nature: "Docile", ability: "Swarm", moves: "Fury Cutter/Growl/Pound/(No Move)" },
    { type: "kill", pokemon: "Meditite", level: 15, nature: "Hardy", ability: "Pure Power", moves: "Low Kick/Confusion/Detect/Feint" }, // Kody
    { type: "kill", pokemon: "Psyduck", level: 15, nature: "Calm", ability: "Damp", moves: "Tail Whip/Confusion/Fury Swipes/Water Pulse" }, // Rachael

    // Route 205 North Section
    { type: "kill", pokemon: "Goldeen", level: 14, nature: "Jolly", ability: "Water Veil", moves: "Peck/Tail Whip/Supersonic/Water Pulse" }, // Joseph
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" }, // Andrew
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" }, // Zachary
    { type: "kill", pokemon: "Goldeen", level: 13, nature: "Jolly", ability: "Water Veil", moves: "Peck/Tail Whip/Supersonic/Water Pulse" },
    { type: "kill", pokemon: "Magikarp", level: 10, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/(No Move)/(No Move)/(No Move)" },

    // Eterna Gym
    { type: "kill", pokemon: "Cherubi", level: 15, nature: "Impish", ability: "Chlorophyll", moves: "Sunny Day/Morning Sun/Growth/Leafage" }, // Caroline
    { type: "kill", pokemon: "Roselia", level: 15, nature: "Timid", ability: "Leaf Guard", moves: "Stun Spore/Mega Drain/Leech Seed/(No Move)" },
    { type: "kill", pokemon: "Budew", level: 14, nature: "Bold", ability: "Poison Point", moves: "Absorb/Stun Spore/Rest/Sleep Talk" }, // Jenna
    { type: "kill", pokemon: "Budew", level: 13, nature: "Bold", ability: "Poison Point", moves: "Absorb/Stun Spore/Rest/Sleep Talk" },
    { type: "kill", pokemon: "Budew", level: 15, nature: "Bold", ability: "Poison Point", moves: "Absorb/Stun Spore/Rest/Sleep Talk" },
    { type: "kill", pokemon: "Turtwig", level: 17, nature: "Adamant", ability: "Overgrow", moves: "Tackle/Iron Tail/Bullet Seed/(No Move)" }, // Angela
    { type: "kill", pokemon: "Roselia", level: 17, nature: "Timid", ability: "Poison Point", moves: "Toxic/Leech Seed/Mega Drain/(No Move)" }, // Lindsay
    { type: "kill", pokemon: "Cherubi", level: 19, nature: "Timid", ability: "Chlorophyll", moves: "Grass Knot/Growth/Dazzling Gleam/Safeguard" }, // Gardenia
    { type: "kill", pokemon: "Turtwig", level: 19, item: "Miracle Seed", nature: "Relaxed", ability: "Shell Armor", moves: "Grass Knot/Razor Leaf/Reflect/Work Up" },
    { type: "kill", pokemon: "Roserade", level: 22, item: "Sitrus Berry", nature: "Timid", ability: "Technician", moves: "Grass Knot/Petal Blizzard/Poison Sting/Stun Spore", Ivs: "0/15/0/15/0/15", Evs: "0/36/0/36/0/36" },

    // Eterna City Team Galactic Building
    { type: "kill", pokemon: "Wurmple", level: 13, nature: "Quirky", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // F1 Grunt 1
    { type: "kill", pokemon: "Cascoon", level: 13, nature: "Hardy", ability: "Shed Skin", moves: "Tackle/String Shot/Poison Sting/Harden" },
    { type: "kill", pokemon: "Zubat", level: 14, nature: "Bashful", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/Mean Look" }, // F1 Grunt 2
    { type: "kill", pokemon: "Glameow", level: 14, nature: "Quirky", ability: "Own Tempo", moves: "Fake Out/Scratch/Growl/Hypnosis" },
    { type: "kill", pokemon: "Wurmple", level: 13, nature: "Docile", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // F2 Grunt 1
    { type: "kill", pokemon: "Zubat", level: 13, nature: "Serious", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/Mean Look" },
    { type: "kill", pokemon: "Silcoon", level: 15, nature: "Hardy", ability: "Shed Skin", moves: "Tackle/String Shot/Poison Sting/Harden" }, // F2 Grunt 2
    { type: "kill", pokemon: "Wurmple", level: 12, nature: "Docile", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/(No Move)" }, // F3 Grunt
    { type: "kill", pokemon: "Silcoon", level: 12, nature: "Serious", ability: "Shed Skin", moves: "Tackle/String Shot/Poison Sting/Harden" },
    { type: "kill", pokemon: "Zubat", level: 12, nature: "Bashful", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/Mean Look" },
    { type: "kill", pokemon: "Kadabra", level: 15, nature: "Sassy", ability: "Synchronize", moves: "Kinesis/Disable/Psybeam/Reflect" }, // Travon
    { type: "kill", pokemon: "Zubat", level: 18, nature: "Modest", ability: "Inner Focus", moves: "Absorb/Supersonic/Mean Look/Poison Fang", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Jupiter
    { type: "kill", pokemon: "Skuntank", level: 20, item: "Sitrus Berry", nature: "Modest", ability: "Aftermath", moves: "Flamethrower/Poison Gas/Acid Spray/Snarl", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },

    // Cycling Road / Route 206
    { type: "kill", pokemon: "Staravia", level: 17, nature: "Naive", ability: "Intimidate", moves: "Growl/Quick Attack/Wing Attack/Double Team" }, // Axel
    { type: "kill", pokemon: "Shinx", level: 17, nature: "Jolly", ability: "Intimidate", moves: "Tackle/Leer/Bite/Spark" }, // Megan
    { type: "kill", pokemon: "Ponyta", level: 17, nature: "Hasty", ability: "Run Away", moves: "Tackle/Growl/Tail Whip/Flame Charge" }, // James
    { type: "kill", pokemon: "Starly", level: 15, nature: "Quirky", ability: "Keen Eye", moves: "Tackle / Growl / Quick Attack / Wing Attack" }, // Nicole
    { type: "kill", pokemon: "Ponyta", level: 15, nature: "Jolly", ability: "Run Away", moves: "Tackle/Growl/Tail Whip/Flame Charge" },
    { type: "kill", pokemon: "Starly", level: 15, nature: "Jolly", ability: "Keen Eye", moves: "Growl/Quick Attack/Wing Attack/Double Team" }, // John
    { type: "kill", pokemon: "Staravia", level: 15, nature: "Jolly", ability: "Intimidate", moves: "Growl/Quick Attack/Wing Attack/Double Team" },
    { type: "kill", pokemon: "Zubat", level: 17, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Astonish/Mean Look/Poison Fang" }, // Ryan
    { type: "kill", pokemon: "Shinx", level: 15, nature: "Jolly", ability: "Intimidate", moves: "Tackle/Leer/Thunder Shock/Bite" }, // Rachel
    { type: "kill", pokemon: "Shinx", level: 15, nature: "Jolly", ability: "Intimidate", moves: "Tackle/Leer/Thunder Shock/Bite" },
    { type: "kill", pokemon: "Pikachu", level: 17, nature: "Jolly", ability: "Static", moves: "Quick Attack/Tail Whip/Nuzzle/Electro Ball" }, // Kayla
    { type: "kill", pokemon: "Onix", level: 15, nature: "Impish", ability: "Sturdy", moves: "Tackle/Harden/Bind/Smack Down" }, // Theodore (Requires Cut)
    { type: "kill", pokemon: "Onix", level: 15, nature: "Jolly", ability: "Rock Head", moves: "Tackle/Harden/Bind/Smack Down" },

    // Route 207
    { type: "kill", pokemon: "Ponyta", level: 19, nature: "Hasty", ability: "Run Away", moves: "Tackle/Growl/Tail Whip/Flame Charge" }, // Anthony
    { type: "kill", pokemon: "Pachirisu", level: 19, nature: "Quirky", ability: "Pickup", moves: "Baby-Doll Eyes/Quick Attack/Spark/Nuzzle" }, // Lauren
    { type: "kill", pokemon: "Geodude", level: 16, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Sandstorm/Harden/Rock Throw" }, // Justin
    { type: "kill", pokemon: "Bronzor", level: 18, nature: "Hardy", ability: "Levitate", moves: "Confusion/Confuse Ray/Payback/Gyro Ball" },
    { type: "kill", pokemon: "Starly", level: 15, nature: "Docile", ability: "Keen Eye", moves: "Growl/Quick Attack/Wing Attack/Double Team" }, // Austin
    { type: "kill", pokemon: "Geodude", level: 15, nature: "Naive", ability: "Rock Head", moves: "Defense Curl/Sandstorm/Rock Polish/Rollout" },
    { type: "kill", pokemon: "Chimchar", level: 18, nature: "Docile", ability: "Blaze", moves: "Leer/Taunt/Fury Swipes/Flame Wheel" },
    { type: "kill", pokemon: "Geodude", level: 15, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Defense Curl/Rock Polish/Rollout" }, // Kevyn
    { type: "kill", pokemon: "Geodude", level: 16, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Rock Polish/Harden/Rock Throw" },
    { type: "kill", pokemon: "Zubat", level: 17, nature: "Sassy", ability: "Inner Focus", moves: "Absorb/Supersonic/Astonish/Poison Fang" },
    { type: "kill", pokemon: "Geodude", level: 16, nature: "Relaxed", ability: "Rock Head", moves: "Tackle/Rock Polish/Harden/Rock Throw" },
    { type: "kill", pokemon: "Meditite", level: 18, nature: "Jolly", ability: "Pure Power", moves: "Pound/Low Kick/Confusion/Force Palm" }, // Helen
    { type: "kill", pokemon: "Machop", level: 18, nature: "Jolly", ability: "No Guard", moves: "Low Kick/Leer/Low Sweep/Knock Off" },

    // Route 208
    { type: "kill", pokemon: "Geodude", level: 17, nature: "Relaxed", ability: "Rock Head", moves: "Sandstorm/Rock Polish/Harden/Rock Throw" }, // Robert
    { type: "kill", pokemon: "Geodude", level: 17, nature: "Relaxed", ability: "Rock Head", moves: "Sandstorm/Rock Polish/Harden/Rock Throw" }, 
    { type: "kill", pokemon: "Machop", level: 19, nature: "Relaxed", ability: "No Guard", moves: "Leer/Revenge/Low Sweep/Knock Off" }, // Kyle
    { type: "kill", pokemon: "Onix", level: 19, nature: "Relaxed", ability: "Sturdy", moves: "Harden/Bind/Smack Down/Curse" }, // Jonathan
    { type: "kill", pokemon: "Combee", level: 16, nature: "Bashful", ability: "Honey Gather", moves: "Sweet Scent/Gust/Struggle Bug/Bug Bite" }, // Hannah
    { type: "kill", pokemon: "Roselia", level: 18, nature: "Calm", ability: "Poison Point", moves: "Poison Sting/Mega Drain/Leech Seed/Magical Leaf" },
    { type: "kill", pokemon: "Mime Jr.", level: 17, nature: "Bold", ability: "Filter", moves: "Copycat/Encore/Confusion/Role Play" }, // William
    { type: "kill", pokemon: "Bonsly", level: 17, nature: "Jolly", ability: "Rock Head", moves: "Fake Tears/Copycat/Flail/Mimic" },

    // Barry 2 Start w/ Piplup (Hearthome City)
    { type: "kill", pokemon: "Starly", level: 19, nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "12/28/4/0/4/12" },
    { type: "kill", pokemon: "Buizel", level: 20, nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Quick Attack/Water Gun/Bite", Ivs: "6/6/6/6/6/6", Evs: "0/28/4/0/4/12" }, 
    { type: "kill", pokemon: "Ponyta", level: 20, nature: "Jolly", ability: "Flash Fire", moves: "Tackle/Tail Whip/Flame Charge/Agility", Ivs: "7/7/7/7/7/7", Evs: "0/28/4/0/4/12" },
    { type: "kill", pokemon: "Grotle", level: 21, nature: "Careful", ability: "Overgrow", moves: "Absorb/Razor Leaf/Curse/Stealth Rock", Ivs: "11/11/11/11/11/11", Evs: "36/4/12/4/36/0" },

    /*
    // Barry 2 Start w/ Turtwig (Hearthome City)
    { type: "kill", pokemon: "Starly", level: 19, nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "12/28/4/0/4/12" },
    { type: "kill", pokemon: "Buizel", level: 20, nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Quick Attack/Water Gun/Bite", Ivs: "6/6/6/6/6/6", Evs: "0/28/4/0/4/12" }, 
    { type: "kill", pokemon: "Roselia", level: 20, nature: "Timid", ability: "Poison Point", moves: "Poison Sting/Mega Drain/Leech Seed/Grass Knot", Ivs: "7/7/7/7/7/7", Evs: "0/0/4/28/4/12" },
    { type: "kill", pokemon: "Monferno", level: 21, nature: "Jolly", ability: "Blaze", moves: "Mach Punch/Leer/Flame Wheel/Stealth Rock", Ivs: "11/11/11/11/11/11", Evs: "12/36/4/0/4/36" },

    // Barry 2 Start w/ Chimchar (Hearthome City)
    { type: "kill", pokemon: "Starly", level: 19, nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "12/28/4/0/4/12" },
    { type: "kill", pokemon: "Roselia", level: 20, nature: "Timid", ability: "Nature Cure", moves: "Growth/Stun Spore/Leech Seed/Magical Leaf", Ivs: "6/6/6/6/6/6", Evs: "0/0/4/28/4/12" }, 
    { type: "kill", pokemon: "Ponyta", level: 20, nature: "Jolly", ability: "Flash Fire", moves: "Tackle/Tail Whip/Flame Charge/Agility", Ivs: "7/7/7/7/7/7", Evs: "0/28/4/0/4/12" },
    { type: "kill", pokemon: "Prinplup", level: 21, nature: "Timid", ability: "Torrent", moves: "Metal Claw/Bubble Beam/Stealth Rock/Grass Knot", Ivs: "11/11/11/11/11/11", Evs: "12/0/4/36/4/36" },
    */

    // Route 209
    { type: "kill", pokemon: "Bonsly", level: 16, nature: "Impish", ability: "Sturdy", moves: "Copycat/Flail/Rock Throw/Mimic" }, // Albert
    { type: "kill", pokemon: "Budew", level: 15, nature: "Bold", ability: "Poison Point", moves: "Absorb/Growth/Stun Spore/Worry Seed" },
    { type: "kill", pokemon: "Pichu", level: 17, nature: "Bold", ability: "Static", moves: "Thunder Shock/Tail Whip/Play Nice/Nuzzle" },
    { type: "kill", pokemon: "Luxio", level: 19, nature: "Hardy", ability: "Intimidate", moves: "Leer/Charge/Bite/Spark" }, // Richard
    { type: "kill", pokemon: "Bonsly", level: 19, nature: "Jolly", ability: "Rock Head", moves: "Fake Tears/Copycat/Flail/Rock Throw" }, // Emma
    { type: "kill", pokemon: "Mime Jr.", level: 19, nature: "Timid", ability: "Filter", moves: "Pound/Copycat/Encore/Confusion" }, // Lil
    { type: "kill", pokemon: "Pikachu", level: 19, nature: "Hasty", ability: "Static", moves: "Sweet Kiss/Charm/Quick Attack/Electro Ball" }, // Danielle
    { type: "kill", pokemon: "Staravia", level: 19, nature: "Relaxed", ability: "Intimidate", moves: "Quick Attack/Wing Attack/Double Team/Endeavor" }, // Raul
    { type: "kill", pokemon: "Mime Jr.", level: 16, nature: "Timid", ability: "Filter", moves: "Pound/Copycat/Encore/Confusion" }, // Jennifer
    { type: "kill", pokemon: "Budew", level: 15, nature: "Hasty", ability: "Poison Point", moves: "Absorb/Growth/Stun Spore/Worry Seed" },
    { type: "kill", pokemon: "Cleffa", level: 17, nature: "Hasty", ability: "Cute Charm", moves: "Pound/Sing/Sweet Kiss/Disarming Voice" },
    { type: "kill", pokemon: "Bidoof", level: 14, nature: "Jolly", ability: "Unaware", moves: "Growl/Defense Curl/Rollout/Headbutt" }, // Shelley
    { type: "kill", pokemon: "Bidoof", level: 15, nature: "Jolly", ability: "Unaware", moves: "Growl/Defense Curl/Rollout/Headbutt" },
    { type: "kill", pokemon: "Bidoof", level: 16, nature: "Jolly", ability: "Unaware", moves: "Growl/Defense Curl/Rollout/Headbutt" },
    { type: "kill", pokemon: "Bidoof", level: 15, nature: "Jolly", ability: "Unaware", moves: "Growl/Defense Curl/Rollout/Headbutt" },
    { type: "kill", pokemon: "Bidoof", level: 15, nature: "Jolly", ability: "Unaware", moves: "Growl/Defense Curl/Rollout/Headbutt" },
    { type: "kill", pokemon: "Machop", level: 19, nature: "Impish", ability: "No Guard", moves: "Leer/Focus Energy/Low Sweep/Knock Off" }, // Ty
    { type: "kill", pokemon: "Meditite", level: 19, nature: "Bashful", ability: "Pure Power", moves: "Low Kick/Detect/Force Palm/Psybeam" }, // Sue

    // Lost Tower
    { type: "kill", pokemon: "Stunky", level: 16, nature: "Naive", ability: "Stench", moves: "Poison Gas/Acid Spray/Fury Swipes/Focus Energy" }, // Oliver
    { type: "kill", pokemon: "Kricketune", level: 16, nature: "Docile", ability: "Swarm", moves: "Fury Cutter/Growl/Pound/Absorb" },
    { type: "kill", pokemon: "Shellos", level: 16, nature: "Hasty", ability: "Storm Drain", moves: "Mud-Slap/Harden/Recover/Water Pulse" },
    { type: "kill", pokemon: "Cleffa", level: 19, nature: "Sassy", ability: "Cute Charm", moves: "Sing/Sweet Kiss/Disarming Voice/Encore" }, // Kirby
    { type: "kill", pokemon: "Pichu", level: 15, nature: "Sassy", ability: "Static", moves: "Thunder Shock/Tail Whip/Play Nice/Nuzzle" }, // Leonard
    { type: "kill", pokemon: "Pichu", level: 15, nature: "Sassy", ability: "Static", moves: "Thunder Shock/Tail Whip/Play Nice/Nuzzle" },
    { type: "kill", pokemon: "Pikachu", level: 18, nature: "Sassy", ability: "Static", moves: "Nuzzle/Thunder Shock/Quick Attack/Electro Ball" },
    { type: "kill", pokemon: "Bonsly", level: 19, nature: "Impish", ability: "Sturdy", moves: "Fake Tears/Copycat/Flail/Rock Throw" }, // Rebekah
    { type: "kill", pokemon: "Ponyta", level: 19, nature: "Sassy", ability: "Run Away", moves: "Tackle/Growl/Tail Whip/Flame Charge" }, // Beth
    { type: "kill", pokemon: "Buizel", level: 19, nature: "Relaxed", ability: "Swift Swim", moves: "Growl/Quick Attack/Water Gun/Bite" }, // Bob
    { type: "kill", pokemon: "Murkrow", level: 19, nature: "Bashful", ability: "Insomnia", moves: "Peck/Astonish/Gust/Wing Attack" }, // Mike
    { type: "kill", pokemon: "Misdreavus", level: 19, nature: "Calm", ability: "Levitate", moves: "Growl/Confusion/Astonish/Confuse Ray" }, // Nat

    // Route 210 Before Psyduck
    { type: "kill", pokemon: "Ponyta", level: 21, nature: "Sassy", ability: "Run Away", moves: "Tackle/Tail Whip/Flame Charge/Agility" }, // Wyatt
    { type: "kill", pokemon: "Aipom", level: 18, nature: "Jolly", ability: "Pickup", moves: "Sand Attack/Astonish/Tickle/Fury Swipes" }, // Marco
    { type: "kill", pokemon: "Psyduck", level: 19, nature: "Hasty", ability: "Cloud Nine", moves: "Scratch/Tail Whip/Confusion/Water Pulse" },
    { type: "kill", pokemon: "Girafarig", level: 17, nature: "Naive", ability: "Inner Focus", moves: "Growl/Confusion/Assurance/Stomp" },
    { type: "kill", pokemon: "Stunky", level: 21, nature: "Relaxed", ability: "Stench", moves: "Poison Gas/Smokescreen/Acid Spray/Bite" }, // Ava
    { type: "kill", pokemon: "Glameow", level: 21, nature: "Relaxed", ability: "Limber", moves: "Fake Out/Growl/Aerial Ace/Fury Swipes" }, // Matt
    { type: "kill", pokemon: "Pikachu", level: 21, nature: "Timid", ability: "Static", moves: "Nuzzle/Growl/Quick Attack/Spark" }, // Teri
    { type: "kill", pokemon: "Clefairy", level: 21, nature: "Timid", ability: "Magic Guard", moves: "Disarming Voice/Encore/Defense Curl/Life Dew" }, // Tia
    { type: "kill", pokemon: "Pichu", level: 18, nature: "Sassy", ability: "Static", moves: "Thunder Shock/Tail Whip/Play Nice/Nuzzle" }, // Kahlil
    { type: "kill", pokemon: "Pikachu", level: 19, nature: "Sassy", ability: "Static", moves: "Nuzzle/Quick Attack/Double Team/Electro Ball" },
    { type: "kill", pokemon: "Happiny", level: 17, nature: "Sassy", ability: "Serene Grace", moves: "Minimize/Sweet Kiss/Disarming Voice/Covet" },
    { type: "kill", pokemon: "Cleffa", level: 19, nature: "Calm", ability: "Cute Charm", moves: "Copycat/Sing/Sweet Kiss/Disarming Voice" }, // Amber
    { type: "kill", pokemon: "Clefairy", level: 17, nature: "Calm", ability: "Cute Charm", moves: "Sweet Kiss/Disarming Voice/Encore/Copycat" },
    { type: "kill", pokemon: "Happiny", level: 18, nature: "Calm", ability: "Serene Grace", moves: "Copycat/Sweet Kiss/Disarming Voice/Covet" },

    // Route 215
    { type: "kill", pokemon: "Bronzor", level: 21, nature: "Hardy", ability: "Levitate", moves: "Confusion/Confuse Ray/Payback/Gyro Ball" }, // Calvin
    { type: "kill", pokemon: "Shieldon", level: 23, nature: "Relaxed", ability: "Sturdy", moves: "Taunt/Metal Sound/Take Down/Iron Defense" },
    { type: "kill", pokemon: "Luxio", level: 19, nature: "Jolly", ability: "Intimidate", moves: "Leer/Charge/Bite/Spark" }, // Craig
    { type: "kill", pokemon: "Staravia", level: 21, nature: "Jolly", ability: "Intimidate", moves: "Quick Attack/Wing Attack/Double Team/Endeavor" },
    { type: "kill", pokemon: "Ponyta", level: 20, nature: "Jolly", ability: "Flash Fire", moves: "Tackle/Growl/Tail Whip/Flame Charge" },
    { type: "kill", pokemon: "Croagunk", level: 25, nature: "Hardy", ability: "Anticipation", moves: "Mud-Slap/Taunt/Revenge/Sucker Punch" }, // Derek
    { type: "kill", pokemon: "Meditite", level: 23, nature: "Hardy", ability: "Pure Power", moves: "Detect/Feint/Force Palm/Psybeam" }, // Gregory
    { type: "kill", pokemon: "Machop", level: 22, nature: "Relaxed", ability: "No Guard", moves: "Leer/Low Sweep/Knock Off/Scary Face" },
    { type: "kill", pokemon: "Meditite", level: 21, nature: "Hardy", ability: "Pure Power", moves: "Detect/Feint/Force Palm/Psybeam" },
    { type: "kill", pokemon: "Croagunk", level: 21, nature: "Hardy", ability: "Anticipation", moves: "Poison Sting/Mud-Slap/Flatter/Revenge" }, // Nathaniel
    { type: "kill", pokemon: "Meditite", level: 23, nature: "Hardy", ability: "Pure Power", moves: "Feint/Force Palm/Psybeam/Calm Mind" },
    { type: "kill", pokemon: "Machop", level: 22, nature: "Relaxed", ability: "No Guard", moves: "Leer/Low Sweep/Knock Off/Scary Face" },
    { type: "kill", pokemon: "Staravia", level: 23, nature: "Sassy", ability: "Intimidate", moves: "Quick Attack/Wing Attack/Endeavor/Whirlwind" }, // Scott
    { type: "kill", pokemon: "Monferno", level: 23, nature: "Jolly", ability: "Blaze", moves: "Leer/Taunt/Fury Swipes/Flame Wheel" }, // Dennis
    { type: "kill", pokemon: "Gyarados", level: 23, nature: "Hasty", ability: "Intimidate", moves: "Bite/Leer/Ice Fang/Waterfall" },
    { type: "kill", pokemon: "Glameow", level: 23, nature: "Jolly", ability: "Own Tempo", moves: "Fake Out/Growl/Aerial Ace/Fury Swipes" }, // Maya
    { type: "kill", pokemon: "Kadabra", level: 23, nature: "Timid", ability: "Synchronize", moves: "Kinesis/Psybeam/Reflect/Ally Switch" },

    // Veilstone Gym
    { type: "kill", pokemon: "Machoke", level: 25, nature: "Jolly", ability: "Guts", moves: "Leer/Scary Face/Vital Throw/Poison Jab" }, // Darren
    { type: "kill", pokemon: "Machop", level: 25, nature: "Adamant", ability: "Guts", moves: "Low Kick/Vital Throw/Thief/Fling" },
    { type: "kill", pokemon: "Machoke", level: 25, nature: "Adamant", ability: "Guts", moves: "Low Kick/Leer/Vital Throw/Poison Jab" },
    { type: "kill", pokemon: "Machoke", level: 26, nature: "Jolly", ability: "Guts", moves: "Leer/Low Sweep/Knock Off/Rock Tomb" }, // Jeffery
    { type: "kill", pokemon: "Meditite", level: 26, nature: "Adamant", ability: "Pure Power", moves: "Detect/Feint/Force Palm/Rock Slide" },
    { type: "kill", pokemon: "Meditite", level: 28, nature: "Jolly", ability: "Pure Power", moves: "Low Kick/Force Palm/Mind Reader/High Jump Kick" }, // Rafael
    { type: "kill", pokemon: "Machoke", level: 25, nature: "Jolly", ability: "Guts", moves: "Leer/Scary Face/Vital Throw/Poison Jab" }, // Colby
    { type: "kill", pokemon: "Machoke", level: 25, nature: "Impish", ability: "Guts", moves: "Low Kick/Vital Throw/Thief/Fling" },
    { type: "kill", pokemon: "Machoke", level: 25, nature: "Impish", ability: "Guts", moves: "Low Kick/Leer/Vital Throw/Poison Jab" },
    { type: "kill", pokemon: "Meditite", level: 27, item: "Light Clay", nature: "Naive", ability: "Pure Power", moves: "Drain Punch/Light Screen/Flash/Bulk Up", Ivs: "15/15/0/0/0/15", Evs: "36/52/0/0/0/36" }, // Maylene
    { type: "kill", pokemon: "Machoke", level: 27, item: "Expert Belt", nature: "Adamant", ability: "Guts", moves: "Low Sweep/Knock Off/Rock Tomb/Bulldoze", Ivs: "15/15/0/0/0/15", Evs: "36/52/0/0/0/36" },
    { type: "kill", pokemon: "Lucario", level: 30, item: "Big Root", nature: "Adamant", ability: "Steadfast", moves: "Drain Punch/Screech/Metal Claw/Bulk Up", Ivs: "0/15/15/0/0/15", Evs: "0/68/68/0/0/68" },

    // Veilstone City
    { type: "kill", pokemon: "Beautifly", level: 25, nature: "Hardy", ability: "Swarm", moves: "Gust/Air Cutter/Mega Drain/Leech Life" }, // Double Grunt 1
    { type: "kill", pokemon: "Stunky", level: 25, nature: "Docile", ability: "Stench", moves: "Poison Gas/Fury Swipes/Focus Energy/Bite" },
    { type: "kill", pokemon: "Dustox", level: 25, nature: "Serious", ability: "Shield Dust", moves: "Gust/Poison Powder/Venoshock/Leech Life" }, // Double Grunt 2
    { type: "kill", pokemon: "Croagunk", level: 25, nature: "Bashful", ability: "Anticipation", moves: "Poison Sting/Mud-Slap/Astonish/Venoshock" },

    // Route 214
    { type: "kill", pokemon: "Roselia", level: 20, nature: "Calm", ability: "Poison Point", moves: "Mega Drain/Leech Seed/Magical Leaf/Toxic Spikes" }, // Douglas
    { type: "kill", pokemon: "Roselia", level: 22, nature: "Calm", ability: "Poison Point", moves: "Poison Sting/Mega Drain/Leech Seed/Magical Leaf" },
    { type: "kill", pokemon: "Roselia", level: 24, nature: "Calm", ability: "Poison Point", moves: "Poison Sting/Mega Drain/Leech Seed/Magical Leaf" },
    { type: "kill", pokemon: "Shieldon", level: 26, nature: "Relaxed", ability: "Sturdy", moves: "Tackle/Taunt/Take Down/Iron Defense" }, // Hunter
    { type: "kill", pokemon: "Buizel", level: 21, nature: "Relaxed", ability: "Swift Swim", moves: "Growl/Tail Whip/Water Gun/Bite" }, // Jamal
    { type: "kill", pokemon: "Buizel", level: 21, nature: "Relaxed", ability: "Swift Swim", moves: "Tail Whip/Water Gun/Bite/Swift" },
    { type: "kill", pokemon: "Buizel", level: 24, nature: "Relaxed", ability: "Swift Swim", moves: "Tail Whip/Bite/Swift/Aqua Jet" },
    { type: "kill", pokemon: "Cranidos", level: 24, nature: "Relaxed", ability: "Mold Breaker", moves: "Headbutt/Leer/Scary Face/Assurance" }, // Bryan
    { type: "kill", pokemon: "Geodude", level: 22, nature: "Relaxed", ability: "Sturdy", moves: "Sandstorm/Harden/Smack Down/Bulldoze" },
    { type: "kill", pokemon: "Bronzor", level: 23, nature: "Hardy", ability: "Levitate", moves: "Confusion/Confuse Ray/Payback/Gyro Ball" },
    { type: "kill", pokemon: "Haunter", level: 23, nature: "Timid", ability: "Levitate", moves: "Shadow Punch/Confuse Ray/Mean Look/Curse" }, // Mitchell
    { type: "kill", pokemon: "Kadabra", level: 23, nature: "Timid", ability: "Synchronize", moves: "Kinesis/Disable/Psybeam/Psycho Cut" },
    { type: "kill", pokemon: "Wormadam", level: 25, nature: "Calm", ability: "Anticipation", moves: "Quiver Dance/Sucker Punch/Bug Bite/Confusion" }, // Devon
    { type: "kill", pokemon: "Ponyta", level: 22, nature: "Sassy", ability: "Run Away", moves: "Growl/Tail Whip/Flame Charge/Agility" }, // Brady
    { type: "kill", pokemon: "Ponyta", level: 20, nature: "Sassy", ability: "Run Away", moves: "Tackle/Growl/Flame Charge/Agility" },
    { type: "kill", pokemon: "Ponyta", level: 24, nature: "Sassy", ability: "Run Away", moves: "Tackle/Growl/Ember/Flame Charge" },
    { type: "kill", pokemon: "Goldeen", level: 23, nature: "Timid", ability: "Water Veil", moves: "Peck/Tail Whip/Supersonic/Water Pulse" }, // Carlos
    { type: "kill", pokemon: "Goldeen", level: 23, nature: "Jolly", ability: "Water Veil", moves: "Peck/Supersonic/Water Pulse/Horn Attack" },
    { type: "kill", pokemon: "Goldeen", level: 23, nature: "Jolly", ability: "Water Veil", moves: "Peck/Water Pulse/Horn Attack/Agility" },
    { type: "kill", pokemon: "Gastly", level: 22, nature: "Timid", ability: "Levitate", moves: "Lick/Confuse Ray/Payback/Curse" }, // Abigail
    { type: "kill", pokemon: "Misdreavus", level: 23, nature: "Timid", ability: "Levitate", moves: "Confusion/Astonish/Confuse Ray/Hex" },
    { type: "kill", pokemon: "Kadabra", level: 24, nature: "Timid", ability: "Synchronize", moves: "Kinesis/Disable/Psybeam/Psycho Cut" },

    // Route 213 Land Trainers
    { type: "kill", pokemon: "Glameow", level: 23, nature: "Jolly", ability: "Own Tempo", moves: "Scratch/Growl/Aerial Ace/Fury Swipes" }, // Cyndy
    { type: "kill", pokemon: "Magikarp", level: 19, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/(No Move)/(No Move)" }, // Kenneth
    { type: "kill", pokemon: "Remoraid", level: 19, nature: "Hardy", ability: "Hustle", moves: "Water Pulse/Focus Energy/Psybeam/Aurora Beam" },
    { type: "kill", pokemon: "Gyarados", level: 22, nature: "Sassy", ability: "Intimidate", moves: "Leer/Twister/Ice Fang/Waterfall" },
    { type: "kill", pokemon: "Bibarel", level: 23, nature: "Jolly", ability: "Unaware", moves: "Water Gun/Aqua Jet/Tackle/Headbutt" }, // Chelsea
    { type: "kill", pokemon: "Shellos", level: 19, nature: "Calm", ability: "Storm Drain", moves: "Mud-Slap/Harden/Recover/Water Pulse" }, // Jared
    { type: "kill", pokemon: "Shellos", level: 21, nature: "Calm", ability: "Storm Drain", moves: "Harden/Recover/Water Pulse/Ancient Power" },
    { type: "kill", pokemon: "Shellos", level: 20, nature: "Calm", ability: "Storm Drain", moves: "Harden/Recover/Water Pulse/Ancient Power" },

    // Pastoria Gym
    { type: "kill", pokemon: "Buizel", level: 26, nature: "Jolly", ability: "Water Veil", moves: "Tail Whip/Bite/Aqua Jet/Iron Tail" }, // Jacky
    { type: "kill", pokemon: "Barboach", level: 26, nature: "Jolly", ability: "Oblivious", moves: "Mud-Slap/Water Pulse/Aqua Tail/Bulldoze" }, // Walter
    { type: "kill", pokemon: "Wingull", level: 24, nature: "Jolly", ability: "Keen Eye", moves: "Growl/Water Pulse/Roost/Pluck" }, // Damian
    { type: "kill", pokemon: "Wingull", level: 24, nature: "Adamant", ability: "Keen Eye", moves: "Quick Attack/Water Pulse/Steel Wing/Aerial Ace" },
    { type: "kill", pokemon: "Azurill", level: 24, nature: "Timid", ability: "Sap Sipper", moves: "Tail Whip/Charm/Bubble Beam/Light Screen" }, // Caitlyn
    { type: "kill", pokemon: "Marill", level: 24, nature: "Adamant", ability: "Huge Power", moves: "Aqua Tail/Play Rough/Aqua Ring/Brick Break" },
    { type: "kill", pokemon: "Goldeen", level: 22, nature: "Jolly", ability: "Water Veil", moves: "Peck/Water Pulse/Rain Dance/Poison Jab" }, // Erick
    { type: "kill", pokemon: "Barboach", level: 23, nature: "Adamant", ability: "Hydration", moves: "Mud-Slap/Water Pulse/Rock Tomb/Bulldoze" },
    { type: "kill", pokemon: "Gyarados", level: 24, nature: "Timid", ability: "Intimidate", moves: "Whirlpool/Scary Face/Substitute/Scald" },
    { type: "kill", pokemon: "Shellos", level: 24, nature: "Timid", ability: "Storm Drain", moves: "Mud-Slap/Recover/Water Pulse/Rain Dance" }, // Samson
    { type: "kill", pokemon: "Wingull", level: 24, nature: "Adamant", ability: "Hydration", moves: "Water Pulse/Rain Dance/U-turn/Roost" },
    { type: "kill", pokemon: "Shellos", level: 24, nature: "Modest", ability: "Storm Drain", moves: "Mud-Slap/Harden/Recover/Water Pulse" },
    { type: "kill", pokemon: "Gyarados", level: 27, item: "Wide Lens", nature: "Jolly", ability: "Intimidate", moves: "Brine/Ice Fang/Crunch/Flail", Ivs: "16/16/0/0/0/16", Evs: "40/56/0/0/0/40" }, // Wake
    { type: "kill", pokemon: "Quagsire", level: 27, item: "Damp Rock", nature: "Quiet", ability: "Damp", moves: "Rain Dance/Haze/Mud Shot/Scald", Ivs: "0/16/16/5/16/5", Evs: "40/40/4/56/4/0" },
    { type: "kill", pokemon: "Floatzel", level: 30, item: "Sitrus Berry", nature: "Adamant", ability: "Swift Swim", moves: "Brine/Ice Fang/Bite/Aqua Jet", Ivs: "0/17/0/17/0/17", Evs: "0/84/0/20/0/84" },

    // Barry 3 Start w/ Piplup (Pastoria City)
    { type: "kill", pokemon: "Starly", level: 26, item: "Quick Claw", nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "28/52/12/0/12/52" },
    { type: "kill", pokemon: "Buizel", level: 26, item: "Sea Incense", nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Bite/Swift/Aqua Jet", Ivs: "6/6/6/6/6/6", Evs: "0/44/12/0/12/36" }, 
    { type: "kill", pokemon: "Ponyta", level: 27, item: "Shell Bell", nature: "Jolly", ability: "Flash Fire", moves: "Tackle/Tail Whip/Agility/Flame Wheel", Ivs: "7/7/7/7/7/7", Evs: "4/44/12/0/12/12" },
    { type: "kill", pokemon: "Grotle", level: 31, item: "Miracle Seed", nature: "Careful", ability: "Overgrow", moves: "Razor Leaf/Bite/Mega Drain/Stealth Rock", Ivs: "11/11/11/11/11/11", Evs: "52/4/12/4/52/0" },

    /*
    // Barry 3 Start w/ Turtwig (Pastoria City)
    { type: "kill", pokemon: "Starly", level: 26, item: "Quick Claw", nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "28/52/12/0/12/52" },
    { type: "kill", pokemon: "Buizel", level: 26, item: "Sea Incense", nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Bite/Swift/Aqua Jet", Ivs: "6/6/6/6/6/6", Evs: "0/44/12/0/12/36" },  
    { type: "kill", pokemon: "Roselia", level: 27, item: "Miracle Seed", nature: "Timid", ability: "Poison Point", moves: "Poison Sting/Mega Drain/Sweet Scent/Grass Knot", Ivs: "7/7/7/7/7/7", Evs: "0/0/12/44/12/12" },
    { type: "kill", pokemon: "Monferno", level: 31, item: "Shell Bell", nature: "Jolly", ability: "Blaze", moves: "Mach Punch/Leer/Power-Up Punch/Flame Wheel", Ivs: "11/11/11/11/11/11", Evs: "36/52/12/0/12/52" },

    // Barry 3 Start w/ Chimchar (Pastoria City)
    { type: "kill", pokemon: "Starly", level: 26, item: "Quick Claw", nature: "Jolly", ability: "Keen Eye", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "28/52/12/0/12/52" },
    { type: "kill", pokemon: "Roselia", level: 26, item: "Miracle Seed", nature: "Timid", ability: "Nature Cure", moves: "Growth/Stun Spore/Leech Seed/Magical Leaf", Ivs: "6/6/6/6/6/6", Evs: "4/0/12/44/12/12" }, 
    { type: "kill", pokemon: "Ponyta", level: 27, item: "Shell Bell", nature: "Jolly", ability: "Flash Fire", moves: "Tackle/Tail Whip/Agility/Flame Wheel", Ivs: "7/7/7/7/7/7", Evs: "4/44/12/0/12/12" },
    { type: "kill", pokemon: "Prinplup", level: 31, item: "Sea Incense", nature: "Timid", ability: "Torrent", moves: "Metal Claw/Charm/Bubble Beam/Grass Knot", Ivs: "11/11/11/11/11/11", Evs: "36/0/12/52/12/52" },
    */

    // Valor Lakefront
    { type: "kill", pokemon: "Glameow", level: 25, nature: "Quirky", ability: "Limber", moves: "Hypnosis/Aerial Ace/Fury Swipes/Charm" }, // Grunt

    // Route 210 After Psyduck and Before Fog
    { type: "kill", pokemon: "Geodude", level: 23, nature: "Naive", ability: "Rock Head", moves: "Sandstorm/Rock Throw/Smack Down/Bulldoze" }, // Fabian
    { type: "kill", pokemon: "Geodude", level: 23, nature: "Naive", ability: "Rock Head", moves: "Harden/Rock Throw/Smack Down/Bulldoze" },
    { type: "kill", pokemon: "Geodude", level: 26, nature: "Naive", ability: "Rock Head", moves: "Rock Throw/Smack Down/Bulldoze/Self-Destruct" },
    { type: "kill", pokemon: "Zubat", level: 25, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Astonish/Poison Fang/Air Cutter" }, // Brennan
    { type: "kill", pokemon: "Skorupi", level: 25, nature: "Naive", ability: "Battle Armor", moves: "Hone Claws/Fell Stinger/Toxic Spikes/Knock Off" },
    { type: "kill", pokemon: "Stunky", level: 27, nature: "Naive", ability: "Stench", moves: "Fury Swipes/Bite/Venoshock/Toxic" }, // Bruce

    // Route 210 Fog Section
    { type: "kill", pokemon: "Zubat", level: 23, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Astonish/Mean Look/Poison Fang" }, // Joel
    { type: "kill", pokemon: "Skorupi", level: 25, nature: "Naive", ability: "Battle Armor", moves: "Hone Claws/Poison Fang/Venoshock/Knock Off" },
    { type: "kill", pokemon: "Zubat", level: 23, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Astonish/Mean Look/Poison Fang" },
    { type: "kill", pokemon: "Golbat", level: 25, nature: "Hasty", ability: "Inner Focus", moves: "Screech/Absorb/Astonish/Poison Fang" },
    { type: "kill", pokemon: "Ponyta", level: 27, nature: "Careful", ability: "Run Away", moves: "Growl/Tail Whip/Ember/Flame Wheel" }, // Alyssa
    { type: "kill", pokemon: "Grotle", level: 27, nature: "Impish", ability: "Overgrow", moves: "Razor Leaf/Curse/Bite/Mega Drain" },
    { type: "kill", pokemon: "Gyarados", level: 27, nature: "Sassy", ability: "Intimidate", moves: "Leer/Twister/Waterfall/Crunch" }, // Zac
    { type: "kill", pokemon: "Raichu", level: 27, nature: "Sassy", ability: "Static", moves: "Thunder Punch/Nuzzle/Thunderbolt/Light Screen" }, // Jen
    { type: "kill", pokemon: "Mothim", level: 25, nature: "Hardy", ability: "Swarm", moves: "Quiver Dance/Bug Bite/String Shot/Confusion" }, // Ernest
    { type: "kill", pokemon: "Onix", level: 26, nature: "Relaxed", ability: "Rock Head", moves: "Harden/Smack Down/Curse/Rock Slide" },
    { type: "kill", pokemon: "Luxio", level: 27, nature: "Hardy", ability: "Intimidate", moves: "Leer/Bite/Spark/Roar" },
    { type: "kill", pokemon: "Dustox", level: 27, nature: "Hasty", ability: "Shield Dust", moves: "Poison Powder/Venoshock/Leech Life/Light Screen" }, // Davey (Formally Davido)
    { type: "kill", pokemon: "Machoke", level: 29, nature: "Relaxed", ability: "No Guard", moves: "Leer/Focus Energy/Low Sweep/Knock Off" }, // Adam
    { type: "kill", pokemon: "Croagunk", level: 25, nature: "Docile", ability: "Anticipation", moves: "Poison Sting/Mud-Slap/Astonish/Venoshock" }, // Nathan
    { type: "kill", pokemon: "Golbat", level: 25, nature: "Hasty", ability: "Inner Focus", moves: "Absorb/Astonish/Mean Look/Poison Fang" },
    { type: "kill", pokemon: "Hoothoot", level: 27, nature: "Timid", ability: "Keen Eye", moves: "Growl/Reflect/Air Slash/Extrasensory" }, // Brianna
    { type: "kill", pokemon: "Noctowl", level: 27, nature: "Jolly", ability: "Keen Eye", moves: "Sky Attack/Peck/Echoed Voice/Extrasensory" },
    { type: "kill", pokemon: "Buizel", level: 26, nature: "Jolly", ability: "Swift Swim", moves: "Growl/Tail Whip/Bite/Aqua Jet" }, // Brian
    { type: "kill", pokemon: "Girafarig", level: 26, nature: "Timid", ability: "Inner Focus", moves: "Astonish/Assurance/Stomp/Psybeam" },
    { type: "kill", pokemon: "Machoke", level: 26, nature: "Jolly", ability: "Guts", moves: "Focus Energy/Revenge/Low Sweep/Knock Off" },
    { type: "kill", pokemon: "Gible", level: 39, nature: "Jolly", ability: "Sand Veil", moves: "Sand Tomb/Bulldoze/Bite/Dragon Claw" }, // Patrick (Requires Rock Climb)

    // Celestic Town
    { type: "kill", pokemon: "Beautifly", level: 25, nature: "Hardy", ability: "Swarm", moves: "Gust/Stun Spore/Air Cutter/Leech Life" }, // Grunt
    { type: "kill", pokemon: "Croagunk", level: 27, nature: "Docile", ability: "Anticipation", moves: "Mud-Slap/Taunt/Revenge/Sucker Punch" },

    // Hearthome Gym
    { type: "kill", pokemon: "Gastly", level: 27, nature: "Timid", ability: "Levitate", moves: "Lick/Mean Look/Payback/Hex" }, // Donny
    { type: "kill", pokemon: "Haunter", level: 29, nature: "Modest", ability: "Levitate", moves: "Shadow Punch/Lick/Mean Look/Hex" },
    { type: "kill", pokemon: "Misdreavus", level: 30, nature: "Timid", ability: "Levitate", moves: "Confuse Ray/Mean Look/Shadow Ball/Nasty Plot" }, // Molly
    { type: "kill", pokemon: "Gastly", level: 27, nature: "Timid", ability: "Levitate", moves: "Hypnosis/Mean Look/Curse/Dream Eater" }, // Drew
    { type: "kill", pokemon: "Gastly", level: 27, nature: "Timid", ability: "Levitate", moves: "Hypnosis/Mean Look/Curse/Dream Eater" },
    { type: "kill", pokemon: "Gastly", level: 27, nature: "Timid", ability: "Levitate", moves: "Hypnosis/Mean Look/Curse/Dream Eater" },
    { type: "kill", pokemon: "Drifloon", level: 28, nature: "Calm", ability: "Aftermath", moves: "Gust/Stockpile/Swallow/Spit Up" }, // Cheyenne
    { type: "kill", pokemon: "Misdreavus", level: 28, nature: "Modest", ability: "Levitate", moves: "Confuse Ray/Mean Look/Hex/Psybeam" },
    { type: "kill", pokemon: "Haunter", level: 30, nature: "Modest", ability: "Levitate", moves: "Confuse Ray/Sucker Punch/Shadow Ball/Dark Pulse" }, // Chance
    { type: "kill", pokemon: "Drifloon", level: 28, nature: "Calm", ability: "Aftermath", moves: "Gust/Stockpile/Swallow/Spit Up" }, // Mackenzie
    { type: "kill", pokemon: "Drifloon", level: 28, nature: "Calm", ability: "Flare Boost", moves: "Minimize/Focus Energy/Payback/Shadow Ball" },
    { type: "kill", pokemon: "Gastly", level: 26, nature: "Timid", ability: "Levitate", moves: "Mean Look/Payback/Hex/Toxic" }, // Allen 
    { type: "kill", pokemon: "Haunter", level: 28, nature: "Timid", ability: "Levitate", moves: "Mean Look/Shadow Punch/Hex/Toxic" },
    { type: "kill", pokemon: "Gengar", level: 30, nature: "Timid", ability: "Cursed Body", moves: "Mean Look/Night Shade/Hex/Toxic" },
    { type: "kill", pokemon: "Misdreavus", level: 30, nature: "Timid", ability: "Levitate", moves: "Growl/Confuse Ray/Hex/Trick Room" }, // Catherine
    { type: "kill", pokemon: "Drifblim", level: 30, nature: "Jolly", ability: "Flare Boost", moves: "Phantom Force/Strength Sap/Minimize/Fly" },
    { type: "kill", pokemon: "Drifblim", level: 32, item: "Zoom Lens", nature: "Timid", ability: "Aftermath", moves: "Strength Sap/Hex/Fly/Will-O-Wisp", Ivs: "19/0/5/19/5/19", Evs: "52/0/4/68/4/52" }, // Fantina
    { type: "kill", pokemon: "Gengar", level: 34, item: "Colbur Berry", nature: "Timid", ability: "Cursed Body", moves: "Shadow Claw/Confuse Ray/Sludge Bomb/Dazzling Gleam", Ivs: "19/0/5/19/5/19", Evs: "52/0/4/76/4/68" },
    { type: "kill", pokemon: "Mismagius", level: 36, item: "Expert Belt", nature: "Timid", ability: "Levitate", moves: "Confuse Ray/Phantom Force/Magical Leaf/Dazzling Gleam", Ivs: "19/0/5/19/5/19", Evs: "44/0/4/92/4/68" },

    // Route 218
    { type: "kill", pokemon: "Gyarados", level: 29, nature: "Timid", ability: "Intimidate", moves: "Leer/Twister/Brine/Rain Dance" }, // Miguel (Requires Surf)
    { type: "kill", pokemon: "Gyarados", level: 29, nature: "Adamant", ability: "Intimidate", moves: "Flail/Ice Fang/Waterfall/Crunch" },
    { type: "kill", pokemon: "Magikarp", level: 26, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" }, // Luc (Requires Surf)
    { type: "kill", pokemon: "Magikarp", level: 26, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" },
    { type: "kill", pokemon: "Magikarp", level: 26, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" },
    { type: "kill", pokemon: "Gyarados", level: 31, nature: "Sassy", ability: "Intimidate", moves: "Leer/Ice Fang/Waterfall/Crunch" },
    { type: "kill", pokemon: "Magikarp", level: 26, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" },
    { type: "kill", pokemon: "Mantyke", level: 27, nature: "Sassy", ability: "Water Absorb", moves: "Whirlpool/Scary Face/Substitute/Scald" }, // Skyler
    { type: "kill", pokemon: "Gyarados", level: 31, nature: "Sassy", ability: "Intimidate", moves: "Leer/Ice Fang/Waterfall/Crunch" },
    { type: "kill", pokemon: "Luxio", level: 31, nature: "Jolly", ability: "Intimidate", moves: "Leer/Bite/Spark/Roar" }, // Tony

    // Barry 4 Start w/ Piplup (Canalave City)
    { type: "kill", pokemon: "Staravia", level: 32, item: "Quick Claw", nature: "Jolly", ability: "Intimidate", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "40/72/16/0/16/56" },
    { type: "kill", pokemon: "Buizel", level: 33, item: "Sea Incense", nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Bite/Swift/Brine", Ivs: "6/6/6/6/6/6", Evs: "16/48/24/0/24/56" },
    { type: "kill", pokemon: "Heracross", level: 32, nature: "Jolly", ability: "Swarm", moves: "Leer/Aerial Ace/Brick Break/Thief", Ivs: "9/9/9/9/9/9", Evs: "16/64/24/0/24/32" },
    { type: "kill", pokemon: "Ponyta", level: 34, item: "Shell Bell", nature: "Jolly", ability: "Flash Fire", moves: "Tail Whip/Agility/Flame Wheel/Stomp", Ivs: "7/7/7/7/7/7", Evs: "40/64/16/0/16/64" },
    { type: "kill", pokemon: "Grotle", level: 37, item: "Big Root", nature: "Careful", ability: "Overgrow", moves: "Razor Leaf/Bite/Leech Seed/Stealth Rock", Ivs: "11/11/11/11/11/11", Evs: "80/24/48/24/80/0" },

    /*
    // Barry 4 Start w/ Turtwig (Canalave City)
    { type: "kill", pokemon: "Staravia", level: 32, item: "Quick Claw", nature: "Jolly", ability: "Intimidate", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "40/72/16/0/16/56" },
    { type: "kill", pokemon: "Buizel", level: 33, item: "Sea Incense", nature: "Jolly", ability: "Swift Swim", moves: "Tail Whip/Bite/Swift/Brine", Ivs: "6/6/6/6/6/6", Evs: "16/48/24/0/24/56" },
    { type: "kill", pokemon: "Heracross", level: 32, nature: "Jolly", ability: "Swarm", moves: "Leer/Aerial Ace/Brick Break/Thief", Ivs: "9/9/9/9/9/9", Evs: "16/64/24/0/24/32" },
    { type: "kill", pokemon: "Roselia", level: 34, item: "Big Root", nature: "Timid", ability: "Poison Point", moves: "Poison Sting/Sweet Scent/Giga Drain/Grass Knot", Ivs: "7/7/7/7/7/7", Evs: "40/0/16/64/16/64" },
    { type: "kill", pokemon: "Monferno", level: 37, item: "Shell Bell", nature: "Jolly", ability: "Blaze", moves: "Mach Punch/Power-Up Punch/Flame Wheel/Shadow Claw", Ivs: "11/11/11/11/11/11", Evs: "48/80/24/0/24/80" },

    // Barry 4 Start w/ Chimchar (Canalave City)
    { type: "kill", pokemon: "Staravia", level: 32, item: "Quick Claw", nature: "Jolly", ability: "Intimidate", moves: "Quick Attack/Double Team/Endeavor/Pluck", Ivs: "5/5/5/5/5/5", Evs: "40/72/16/0/16/56" },
    { type: "kill", pokemon: "Roselia", level: 33, item: "Big Root", nature: "Timid", ability: "Nature Cure", moves: "Growth/Stun Spore/Leech Seed/Giga Drain", Ivs: "6/6/6/6/6/6", Evs: "16/0/24/48/24/56" },
    { type: "kill", pokemon: "Heracross", level: 32, nature: "Jolly", ability: "Swarm", moves: "Leer/Aerial Ace/Brick Break/Thief", Ivs: "9/9/9/9/9/9", Evs: "16/64/24/0/24/32" },
    { type: "kill", pokemon: "Ponyta", level: 34, item: "Shell Bell", nature: "Jolly", ability: "Flash Fire", moves: "Tail Whip/Agility/Flame Wheel/Stomp", Ivs: "7/7/7/7/7/7", Evs: "40/64/16/0/16/64" },
    { type: "kill", pokemon: "Prinplup", level: 37, item: "Sea Incense", nature: "Timid", ability: "Torrent", moves: "Metal Claw/Charm/Grass Knot/Brine", Ivs: "11/11/11/11/11/11", Evs: "48/0/24/80/24/80" },
    */

    // Canalave Gym
    { type: "kill", pokemon: "Steelix", level: 33, nature: "Relaxed", ability: "Sturdy", moves: "Thunder Fang/Ice Fang/Iron Tail/Bulldoze" }, // Ricky
    { type: "kill", pokemon: "Onix", level: 31, nature: "Relaxed", ability: "Rock Head", moves: "Smack Down/Iron Tail/Payback/Bulldoze" }, // Gary
    { type: "kill", pokemon: "Onix", level: 28, nature: "Relaxed", ability: "Rock Head", moves: "Smack Down/Sand Tomb/Iron Tail/Sandstorm" }, // Jackson
    { type: "kill", pokemon: "Onix", level: 28, nature: "Relaxed", ability: "Rock Head", moves: "Screech/Iron Tail/Rock Tomb/Bulldoze" },
    { type: "kill", pokemon: "Onix", level: 28, nature: "Relaxed", ability: "Rock Head", moves: "Screech/Iron Tail/Rock Tomb/Bulldoze" },
    { type: "kill", pokemon: "Skorupi", level: 30, nature: "Relaxed", ability: "Battle Armor", moves: "Bite/Pin Missile/Toxic/Iron Tail" }, // Cesar
    { type: "kill", pokemon: "Steelix", level: 33, nature: "Relaxed", ability: "Rock Head", moves: "Thunder Fang/Ice Fang/Curse/Iron Tail" },
    { type: "kill", pokemon: "Onix", level: 29, nature: "Relaxed", ability: "Rock Head", moves: "Smack Down/Iron Tail/Sandstorm/Bulldoze" }, // Gerardo
    { type: "kill", pokemon: "Onix", level: 29, nature: "Relaxed", ability: "Rock Head", moves: "Rock Tomb/Rest/Sleep Talk/Iron Tail" },
    { type: "kill", pokemon: "Onix", level: 30, nature: "Relaxed", ability: "Rock Head", moves: "Screech/Sandstorm/Rock Tomb/Bulldoze" }, // David
    { type: "kill", pokemon: "Steelix", level: 32, nature: "Relaxed", ability: "Rock Head", moves: "Thunder Fang/Ice Fang/Autotomize/Dig" },
    { type: "kill", pokemon: "Azumarill", level: 33, nature: "Jolly", ability: "Huge Power", moves: "Play Rough/Iron Tail/Bulldoze/Waterfall" }, // Breanna
    { type: "kill", pokemon: "Bronzor", level: 36, nature: "Relaxed", ability: "Levitate", moves: "Confuse Ray/Sandstorm/Trick Room/Flash Cannon", Ivs: "0/17/0/17/17/17/0", Evs: "68/0/68/44/68/0" }, // Byron
    { type: "kill", pokemon: "Steelix", level: 36, item: "Soft Sand", nature: "Brave", ability: "Sturdy", moves: "Thunder Fang/Earthquake/Sandstorm/Gyro Ball", Ivs: "0/0/23/17/0/17", Evs: "0/100/68/0/68/0" },
    { type: "kill", pokemon: "Bastiodon", level: 39, item: "Sitrus Berry", nature: "Relaxed", ability: "Sturdy", moves: "Iron Defense/Thunderbolt/Stone Edge/Flash Cannon", Ivs: "0/0/0/17/23/17", Evs: "0/0/0/17/23/17" },

    // Lake Valor
    { type: "kill", pokemon: "Glameow", level: 33, nature: "Bashful", ability: "Own Tempo", moves: "Aerial Ace/Fury Swipes/Charm/Taunt" }, // Grunt 1
    { type: "kill", pokemon: "Croagunk", level: 33, nature: "Quirky", ability: "Anticipation", moves: "Taunt/Revenge/Sucker Punch/Poison Jab" },
    { type: "kill", pokemon: "Golbat", level: 32, nature: "Bashful", ability: "Inner Focus", moves: "Screech/Astonish/Poison Fang/Air Cutter" }, // Grunt 2
    { type: "kill", pokemon: "Croagunk", level: 36, nature: "Quirky", ability: "Anticipation", moves: "Revenge/Venoshock/Sucker Punch/Toxic" },
    { type: "kill", pokemon: "Croagunk", level: 34, nature: "Hardy", ability: "Anticipation", moves: "Taunt/Revenge/Sucker Punch/Poison Jab" }, // Grunt 3
    { type: "kill", pokemon: "Dustox", level: 31, nature: "Docile", ability: "Shield Dust", moves: "Poison Powder/Venoshock/Leech Life/Light Screen" },
    { type: "kill", pokemon: "Beautifly", level: 31, nature: "Serious", ability: "Swarm", moves: "Air Cutter/Mega Drain/Leech Life/Attract" },
    { type: "kill", pokemon: "Kadabra", level: 35, item: "Damp Rock", nature: "Timid", ability: "Inner Focus", moves: "Kinesis/Reflect/Psychic/Rain Dance", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Saturn
    { type: "kill", pokemon: "Bronzor", level: 35, nature: "Relaxed", ability: "Levitate", moves: "Confuse Ray/Payback/Gyro Ball/Extrasensory", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Toxicroak", level: 37, nature: "Jolly", ability: "Dry Skin", moves: "Mud-Slap/Revenge/Toxic/Thief", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },

    // Lake Verity
    { type: "kill", pokemon: "Glameow", level: 33, nature: "Hardy", ability: "Limber", moves: "Growl/Aerial Ace/Fury Swipes/Retaliate" }, // Grunt 1 (Could be combined with Grunt 3)
    { type: "kill", pokemon: "Silcoon", level: 32, nature: "Bashful", ability: "Shed Skin", moves: "Tackle/Poison Sting/Harden/(No Move)" }, // Grunt 2
    { type: "kill", pokemon: "Golbat", level: 32, nature: "Quirky", ability: "Inner Focus", moves: "Screech/Poison Fang/Quick Guard/Air Cutter" },
    { type: "kill", pokemon: "Glameow", level: 32, nature: "Hardy", ability: "Own Tempo", moves: "Growl/Aerial Ace/Fury Swipes/Retaliate" },
    { type: "kill", pokemon: "Stunky", level: 32, nature: "Docile", ability: "Aftermath", moves: "Poison Gas/Bite/Venoshock/Sucker Punch" }, // Grunt 3 (Could be combined with Grunt 1)
    { type: "kill", pokemon: "Glameow", level: 32, nature: "Serious", ability: "Limber", moves: "Growl/Aerial Ace/Fury Swipes/Retaliate" },
    { type: "kill", pokemon: "Beautifly", level: 31, nature: "Docile", ability: "Swarm", moves: "Stun Spore/Air Cutter/Leech Life/Attract" }, // Grunt 4
    { type: "kill", pokemon: "Glameow", level: 33, nature: "Serious", ability: "Own Tempo", moves: "Aerial Ace/Charm/Taunt/Retaliate" },
    { type: "kill", pokemon: "Golbat", level: 37, nature: "Jolly", ability: "Inner Focus", moves: "Astonish/Poison Fang/Bite/U-turn", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Mars
    { type: "kill", pokemon: "Bronzor", level: 37, nature: "Sassy", ability: "Levitate", moves: "Confuse Ray/Payback/Gyro Ball/Iron Defense", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Purugly", level: 39, item: "Sitrus Berry", nature: "Jolly", ability: "Thick Fat", moves: "Growl/Aerial Ace/Slash/U-turn", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },

    // Route 216 Ground
    { type: "kill", pokemon: "Ambipom", level: 35, nature: "Hardy", ability: "Pickup", moves: "Dual Chop/Baton Pass/Tickle/Double Hit" }, // Blake
    { type: "kill", pokemon: "Kadabra", level: 35, nature: "Sassy", ability: "Inner Focus", moves: "Kinesis/Recover/Psyshock/Psychic" },
    { type: "kill", pokemon: "Golduck", level: 34, nature: "Calm", ability: "Damp", moves: "Aqua Jet/Fury Swipes/Zen Headbutt/Screech" }, // Maria
    { type: "kill", pokemon: "Ponyta", level: 35, nature: "Careful", ability: "Run Away", moves: "Tail Whip/Flame Wheel/Stomp/Fire Spin" },
    { type: "kill", pokemon: "Sudowoodo", level: 33, nature: "Impish", ability: "Rock Head", moves: "Hammer Arm/Wood Hammer/Rock Tomb/Sucker Punch" },
    { type: "kill", pokemon: "Lopunny", level: 37, nature: "Careful", ability: "Cute Charm", moves: "Mirror Coat/Baby-Doll Eyes/Double Kick/Headbutt" }, // Laura
    { type: "kill", pokemon: "Sneasel", level: 35, nature: "Jolly", ability: "Inner Focus", moves: "Leer/Taunt/Icy Wind/Fury Swipes" }, // Edward
    { type: "kill", pokemon: "Mr. Mime", level: 33, nature: "Sassy", ability: "Own Tempo", moves: "Copycat/Baton Pass/Encore/Psybeam" }, // Garrett
    { type: "kill", pokemon: "Machoke", level: 34, nature: "Relaxed", ability: "Own Tempo", moves: "Leer/Low Sweep/Knock Off/Strength" },
    { type: "kill", pokemon: "Sneasel", level: 35, nature: "Sassy", ability: "Own Tempo", moves: "Leer/Metal Claw/Icy Wind/Fury Swipes" },

    // Route 217
    { type: "kill", pokemon: "Raichu", level: 34, nature: "Timid", ability: "Static", moves: "Nuzzle/Electro Ball/Agility/Light Screen" }, // Dalton
    { type: "kill", pokemon: "Pelipper", level: 36, nature: "Timid", ability: "Keen Eye", moves: "Air Slash/Tailwind/Water Pulse/Stockpile" },
    { type: "kill", pokemon: "Hippopotas", level: 38, nature: "Relaxed", ability: "Sand Stream", moves: "Yawn/Sand Tomb/Crunch/Rest" },
    { type: "kill", pokemon: "Snover", level: 34, nature: "Hasty", ability: "Snow Warning", moves: "Leer/Ice Shard/Razor Leaf/Icy Wind" }, // Shawn
    { type: "kill", pokemon: "Snover", level: 33, nature: "Hasty", ability: "Snow Warning", moves: "Mist/Ice Shard/Razor Leaf/Icy Wind" },
    { type: "kill", pokemon: "Golduck", level: 34, nature: "Hasty", ability: "Damp", moves: "Aqua Jet/Water Pulse/Zen Headbutt/Soak" },
    { type: "kill", pokemon: "Snover", level: 35, nature: "Hasty", ability: "Snow Warning", moves: "Ice Shard/Razor Leaf/Icy Wind/Ingrain" },
    { type: "kill", pokemon: "Zubat", level: 33, nature: "Hasty", ability: "Inner Focus", moves: "Supersonic/Poison Fang/Air Cutter/Bite" }, // Antonio
    { type: "kill", pokemon: "Golbat", level: 33, nature: "Hasty", ability: "Inner Focus", moves: "Supersonic/Astonish/Poison Fang/Air Cutter" },
    { type: "kill", pokemon: "Zubat", level: 34, nature: "Hasty", ability: "Inner Focus", moves: "Supersonic/Poison Fang/Air Cutter/Bite" },
    { type: "kill", pokemon: "Croagunk", level: 36, nature: "Docile", ability: "Anticipation", moves: "Revenge/Venoshock/Sucker Punch/Toxic" },
    { type: "kill", pokemon: "Snover", level: 37, nature: "Sassy", ability: "Snow Warning", moves: "Ice Shard/Razor Leaf/Icy Wind/Ingrain" }, // Madison
    { type: "kill", pokemon: "Skorupi", level: 35, nature: "Naive", ability: "Battle Armor", moves: "Hone Claws/Knock Off/Pin Missile/Toxic" }, // Ethan
    { type: "kill", pokemon: "Golbat", level: 35, nature: "Hasty", ability: "Inner Focus", moves: "Screech/Poison Fang/Air Cutter/Bite" },
    { type: "kill", pokemon: "Mantyke", level: 36, nature: "Timid", ability: "Water Absorb", moves: "Supersonic/Bubble Beam/Headbutt/Air Slash" }, // Bjorn
    { type: "kill", pokemon: "Sneasel", level: 38, nature: "Jolly", ability: "Inner Focus", moves: "Quick Attack/Metal Claw/Icy Wind/Hone Claws" },
    { type: "kill", pokemon: "Marill", level: 35, nature: "Quirky", ability: "Snow Warning", moves: "Bubble Beam/Charm/Bounce/Play Rough" }, // Lexie
    { type: "kill", pokemon: "Clefairy", level: 35, nature: "Timid", ability: "Snow Warning", moves: "Charm/Moonlight/Gravity/Meteor Mash" },
    { type: "kill", pokemon: "Croagunk", level: 36, nature: "Hardy", ability: "Anticipation", moves: "Revenge/Venoshock/Sucker Punch/Toxic" }, // Luke
    { type: "kill", pokemon: "Onix", level: 35, nature: "Relaxed", ability: "Snow Sturdy", moves: "Smack Down/Curse/Sand Tomb/Stealth Rock" },
    { type: "kill", pokemon: "Machoke", level: 37, nature: "Relaxed", ability: "No Guard", moves: "Low Sweep/Knock Off/Strength/Dual Chop" },
    { type: "kill", pokemon: "Roselia", level: 37, nature: "Calm", ability: "Poison Point", moves: "Poison Sting/Leech Seed/Giga Drain/Synthesis" }, // Olivia
    { type: "kill", pokemon: "Seaking", level: 37, nature: "Jolly", ability: "Water Veil", moves: "Peck/Supersonic/Flail/Waterfall" },

    // Snowpoint Gym
    { type: "kill", pokemon: "Snover", level: 39, nature: "Relaxed", ability: "Snow Warning", moves: "Ice Shard/Razor Leaf/Water Pulse/Blizzard" }, // Anton
    { type: "kill", pokemon: "Sneasel", level: 37, nature: "Jolly", ability: "Inner Focus", moves: "Metal Claw/Icy Wind/Hone Claws/Attract" }, // Alicia
    { type: "kill", pokemon: "Tentacruel", level: 37, nature: "Modest", ability: "Clear Body", moves: "Bubble Beam/Acid Armor/Ice Beam/Sludge Bomb" },
    { type: "kill", pokemon: "Pelipper", level: 35, nature: "Jolly", ability: "Drizzle", moves: "Tailwind/Wing Attack/Water Pulse/Ice Beam" }, // Savannah
    { type: "kill", pokemon: "Golduck", level: 36, nature: "Jolly", ability: "Damp", moves: "Aqua Jet/Zen Headbutt/Ice Beam/Dig" },
    { type: "kill", pokemon: "Steelix", level: 37, nature: "Relaxed", ability: "Sturdy", moves: "Ice Fang/Screech/Iron Tail/Bulldoze" },
    { type: "kill", pokemon: "Floatzel", level: 37, nature: "Jolly", ability: "Swift Swim", moves: "Ice Fang/Crunch/Tail Whip/Aqua Jet" }, // Sergio
    { type: "kill", pokemon: "Sneasel", level: 37, nature: "Jolly", ability: "Inner Focus", moves: "Metal Claw/Icy Wind/Hone Claws/Aerial Ace" },
    { type: "kill", pokemon: "Snover", level: 39, nature: "Relaxed", ability: "Snow Warning", moves: "Ice Shard/Razor Leaf/Icy Wind/Ingrain" }, // Brenna
    { type: "kill", pokemon: "Quagsire", level: 39, nature: "Jolly", ability: "Damp", moves: "Yawn/Muddy Water/Ice Beam/Bulldoze" }, // Isaiah
    { type: "kill", pokemon: "Snover", level: 38, item: "Icy Rock", nature: "Relaxed", ability: "Snow Warning", moves: "Mist/Razor Leaf/Water Pulse/Avalanche", Ivs: "19/25/0/25/0/0", Evs: "60/124/0/124/0/0" }, // Candice
    { type: "kill", pokemon: "Sneasel", level: 38, item: "Chople Berry", nature: "Jolly", ability: "Pickpocket", moves: "Metal Claw/Hone Claws/Dig/Avalanche", Ivs: "10/25/10/0/0/25", Evs: "64/124/0/0/0/124" },
    { type: "kill", pokemon: "Medicham", level: 40, item: "Expert Belt", nature: "Jolly", ability: "Pure Power", moves: "Ice Punch/Bulk Up/Brick Break/Rock Slide", Ivs: "10/25/0/0/0/25", Evs: "64/124/0/0/0/124" },
    { type: "kill", pokemon: "Abomasnow", level: 42, item: "Sitrus Berry", nature: "Quiet", ability: "Snow Warning", moves: "Aurora Veil/Giga Drain/Earthquake/Blizzard", Ivs: "13/25/10/27/10/0", Evs: "124/60/0/164/0/0" },

    // Veilstone Galactic Warehouse
    { type: "kill", pokemon: "Golbat", level: 37, nature: "Bashful", ability: "Inner Focus", moves: "Screech/Poison Fang/Air Cutter/Bite" }, // Grunt 1
    { type: "kill", pokemon: "Dustox", level: 35, nature: "Quirky", ability: "Shield Dust", moves: "Venoshock/Leech Life/Toxic/Bug Buzz" }, // Grunt 2
    { type: "kill", pokemon: "Bronzor", level: 35, nature: "Hardy", ability: "Heatproof", moves: "Confuse Ray/Payback/Extrasensory/Heavy Slam" },
    { type: "kill", pokemon: "Glameow", level: 37, nature: "Docile", ability: "Own Tempo", moves: "Aerial Ace/Charm/Taunt/Slash" }, // Grunt 3
    { type: "kill", pokemon: "Wurmple", level: 32, nature: "Serious", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/Bug Bite" }, // Grunt 4
    { type: "kill", pokemon: "Cascoon", level: 34, nature: "Bashful", ability: "Shed Skin", moves: "String Shot/Poison Sting/Bug Bite/Harden" },
    { type: "kill", pokemon: "Dustox", level: 36, nature: "Quirky", ability: "Shield Dust", moves: "Psybeam/Leech Life/Toxic/Bug Buzz" },
    { type: "kill", pokemon: "Kadabra", level: 35, nature: "Sassy", ability: "Inner Focus", moves: "Kinesis/Reflect/Psyshock/Psychic" }, // Fredrick
    { type: "kill", pokemon: "Kadabra", level: 35, nature: "Sassy", ability: "Synchronize", moves: "Reflect/Recover/Psyshock/Psychic" },
    { type: "kill", pokemon: "Stunky", level: 37, nature: "Docile", ability: "Aftermath", moves: "Smokescreen/Venoshock/Toxic/Night Slash" }, // Grunt 5
    { type: "kill", pokemon: "Bronzor", level: 36, nature: "Hardy", ability: "Heatproof", moves: "Confuse Ray/Gyro Ball/Extrasensory/Iron Defense" }, // Grunt 6
    { type: "kill", pokemon: "Stunky", level: 36, nature: "Docile", ability: "Aftermath", moves: "Bite/Venoshock/Toxic/Night Slash" },

    // Veilstone Galactic HQ
    { type: "kill", pokemon: "Golbat", level: 36, nature: "Serious", ability: "Inner Focus", moves: "Screech/Poison Fang/Air Cutter/Bite" }, // Grunt 1
    { type: "kill", pokemon: "Golbat", level: 36, nature: "Bashful", ability: "Inner Focus", moves: "Screech/Poison Fang/Air Cutter/Bite" },
    { type: "kill", pokemon: "Golbat", level: 36, nature: "Serious", ability: "Inner Focus", moves: "Poison Fang/Quick Guard/Air Cutter/Bite" }, // Grunt 2
    { type: "kill", pokemon: "Silcoon", level: 34, nature: "Bashful", ability: "Shed Skin", moves: "Tackle/Poison Sting/Harden/(No Move)" },
    { type: "kill", pokemon: "Kadabra", level: 37, nature: "Sassy", ability: "Synchronize", moves: "Kinesis/Reflect/Psyshock/Psychic" }, // Darrius
    { type: "kill", pokemon: "Stunky", level: 36, nature: "Quirky", ability: "Aftermath", moves: "Venoshock/Toxic/Memento/Night Slash" }, // Grunt 3
    { type: "kill", pokemon: "Croagunk", level: 36, nature: "Hardy", ability: "Anticipation", moves: "Mud-Slap/Revenge/Sucker Punch/Toxic" },
    { type: "kill", pokemon: "Croagunk", level: 35, nature: "Quirky", ability: "Anticipation", moves: "Taunt/Revenge/Sucker Punch/Poison Jab" }, // Grunt 4
    { type: "kill", pokemon: "Stunky", level: 35, nature: "Hardy", ability: "Aftermath", moves: "Poison Gas/Smokescreen/Acid Spray/Bite" },
    { type: "kill", pokemon: "Glameow", level: 35, nature: "Docile", ability: "Own Tempo", moves: "Growl/Hypnosis/Aerial Ace/Retaliate" },
    { type: "kill", pokemon: "Murkrow", level: 40, nature: "Jolly", ability: "Insomnia", moves: "Wing Attack/Night Shade/Assurance/Taunt", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Cyrus
    { type: "kill", pokemon: "Golbat", level: 40, nature: "Jolly", ability: "Inner Focus", moves: "Screech/Poison Fang/Air Cutter/Bite", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Sneasel", level: 43, item: "Sitrus Berry", nature: "Jolly", ability: "Keen Eye", moves: "Metal Claw/Icy Wind/Hone Claws/Beat Up", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Kadabra", level: 38, item: "Damp Rock", nature: "Timid", ability: "Inner Focus", moves: "Kinesis/Reflect/Psychic/Rain Dance", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Saturn
    { type: "kill", pokemon: "Bronzor", level: 38, nature: "Relaxed", ability: "Levitate", moves: "Confuse Ray/Payback/Gyro Ball/Extrasensory", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Toxicroak", level: 40, nature: "Jolly", ability: "Dry Skin", moves: "Mud-Slap/Toxic/Thief/Brick Break", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },

    // Mt Coronet
    { type: "kill", pokemon: "Beautifly", level: 40, nature: "Docile", ability: "Swarm", moves: "Stun Spore/Leech Life/Giga Drain/Quiver Dance" }, // Grunt 1 3F
    { type: "kill", pokemon: "Bronzor", level: 39, nature: "Serious", ability: "Heatproof", moves: "Confuse Ray/Extrasensory/Heavy Slam/Iron Defense" }, // Grunt 2 3F
    { type: "kill", pokemon: "Dustox", level: 35, nature: "Bashful", ability: "Shield Dust", moves: "Psybeam/Light Screen/Toxic/Bug Buzz" }, // Grunt 1 4F
    { type: "kill", pokemon: "Golbat", level: 38, nature: "Hardy", ability: "Inner Focus", moves: "Supersonic/Poison Fang/Air Cutter/Bite" },
    { type: "kill", pokemon: "Dustox", level: 35, nature: "Quirky", ability: "Shield Dust", moves: "Psybeam/Leach Life/Toxic/Bug Buzz" },
    { type: "kill", pokemon: "Stunky", level: 38, nature: "Docile", ability: "Aftermath", moves: "Venoshock/Toxic/Memento/Night Slash" }, // Grunt 2 4F
    { type: "kill", pokemon: "Golbat", level: 38, nature: "Hardy", ability: "Inner Focus", moves: "Supersonic/Poison Fang/Air Cutter/Bite" },
    { type: "kill", pokemon: "Golbat", level: 40, nature: "Docile", ability: "Inner Focus", moves: "Absorb/Poison Fang/Air Cutter/Bite" }, // Grunt 1 1F (Tunnel from Summit)
    { type: "kill", pokemon: "Wurmple", level: 34, nature: "Serious", ability: "Shield Dust", moves: "Tackle/String Shot/Poison Sting/Bug Bite" }, // Grunt 2 1F (Tunnel from Summit)
    { type: "kill", pokemon: "Silcoon", level: 36, nature: "Bashful", ability: "Shed Skin", moves: "Tackle/Poison Sting/Harden/(No Move)" },
    { type: "kill", pokemon: "Beautifly", level: 38, nature: "Quirky", ability: "Swarm", moves: "Air Cutter/Leech Life/Attract/Bug Buzz" },
    { type: "kill", pokemon: "Croagunk", level: 35, nature: "Bashful", ability: "Anticipation", moves: "Taunt/Revenge/Sucker Punch/Poison Jab" }, // Grunt 3 1F (Tunnel from Summit)
    { type: "kill", pokemon: "Stunky", level: 38, nature: "Hardy", ability: "Aftermath", moves: "Venoshock/Screech/Toxic/Night Slash" },
    { type: "kill", pokemon: "Croagunk", level: 38, nature: "Quirky", ability: "Anticipation", moves: "Revenge/Venoshock/Sucker Punch/Toxic" },
    { type: "kill", pokemon: "Bronzor", level: 38, nature: "Hardy", ability: "Levitate", moves: "Hypnosis/Safeguard/Extrasensory/Heavy Slam" }, // Grunt 1 5F
    { type: "kill", pokemon: "Glameow", level: 36, nature: "Docile", ability: "Own Tempo", moves: "Aerial Ace/Charm/Taunt/Slash" },
    { type: "kill", pokemon: "Bronzor", level: 37, nature: "Serious", ability: "Heatproof", moves: "Confuse Ray/Payback/Extrasensory/Iron Defense" }, // Grunt 2 5F
    { type: "kill", pokemon: "Golbat", level: 37, nature: "Bashful", ability: "Inner Focus", moves: "Screech/Astonish/Poison Fang/Bite" },
    { type: "kill", pokemon: "Golbat", level: 37, nature: "Serious", ability: "Inner Focus", moves: "Screech/Astonish/Poison Fang/Bite" }, // Grunt 1 6F
    { type: "kill", pokemon: "Glameow", level: 37, nature: "Bashful", ability: "Own Tempo", moves: "Fake Out/Hypnosis/Aerial Ace/Retaliate" },
    { type: "kill", pokemon: "Bronzor", level: 37, nature: "Quirky", ability: "Levitate", moves: "Confuse Ray/Extrasensory/Heavy Slam/Iron Defense" },

    // Spear Pillar
    { type: "kill", pokemon: "Dustox", level: 38, nature: "Quirky", ability: "Shield Dust", moves: "Light Screen/Toxic/Bug Buzz/Protect" }, // Grunt 1
    { type: "kill", pokemon: "Croagunk", level: 38, nature: "Hardy", ability: "Anticipation", moves: "Revenge/Venoshock/Sucker Punch/Toxic" },
    { type: "kill", pokemon: "Stunky", level: 38, nature: "Hardy", ability: "Aftermath", moves: "Venoshock/Toxic/Memento/Night Slash" }, // Grunt 2
    { type: "kill", pokemon: "Glameow", level: 38, nature: "Docile", ability: "Own Tempo", moves: "Aerial Ace/Charm/Taunt/Retaliate" },
    { type: "kill", pokemon: "Bronzor", level: 41, nature: "Sassy", ability: "Levitate", moves: "Confuse Ray/Payback/Gyro Ball/Reflect", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Mars
    { type: "kill", pokemon: "Golbat", level: 42, nature: "Jolly", ability: "Inner Focus", moves: "Poison Fang/Bite/Haze/U-turn", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Purugly", level: 45, item: "Sitrus Berry", nature: "Jolly", ability: "Thick Fat", moves: "Aerial Ace/Body Slam/Dig/U-turn", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Bronzor", level: 41, nature: "Relaxed", ability: "Levitate", moves: "Confuse Ray/Payback/Extrasensory/Light Screen", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Jupiter
    { type: "kill", pokemon: "Golbat", level: 41, nature: "Modest", ability: "Inner Focus", moves: "Air Cutter/Haze/Giga Drain/Sludge Bomb", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Skuntank", level: 46, item: "Sitrus Berry", nature: "Modest", ability: "Aftermath", moves: "Flamethrower/Poison Gas/Belch/Snarl", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Honchkrow", level: 45, item: "Scope Lens", nature: "Jolly", ability: "Super Luck", moves: "Air Cutter/Night Slash/Steel Wing/Defog", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" }, // Cyrus
    { type: "kill", pokemon: "Crobat", level: 46, item: "Quick Claw", nature: "Jolly", ability: "Infiltrator", moves: "Cross Poison/Tailwind/Air Cutter/U-turn", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Gyarados", level: 45, item: "Wacan Berry", nature: "Jolly", ability: "Intimidate", moves: "Ice Fang/Waterfall/Crunch/Earthquake", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },
    { type: "kill", pokemon: "Weavile", level: 48, item: "Chople Berry", nature: "Jolly", ability: "Pickpocket", moves: "Metal Claw/Fling/Dig/Aerial Ace", Ivs: "15/0/15/0/15/0", Evs: "68/0/68/0/68/0" },

    // Route 222 Lower Path
    { type: "kill", pokemon: "Magikarp", level: 40, nature: "Modest", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" }, // Alec
    { type: "kill", pokemon: "Gyarados", level: 42, nature: "Adamant", ability: "Intimidate", moves: "Ice Fang/Waterfall/Crunch/Dragon Dance" },
    { type: "kill", pokemon: "Magikarp", level: 38, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" }, // George
    { type: "kill", pokemon: "Finneon", level: 40, nature: "Sassy", ability: "Storm Drain", moves: "Rain Dance/Water Pulse/Aqua Ring/Whirlpool" },
    { type: "kill", pokemon: "Remoraid", level: 40, nature: "Hardy", ability: "Sniper", moves: "Water Pulse/Focus Energy/Psybeam/Ice Beam" },
    { type: "kill", pokemon: "Gyarados", level: 42, nature: "Sassy", ability: "Intimidate", moves: "Whirlpool/Brine/Waterfall/Rain Dance" },
    { type: "kill", pokemon: "Magikarp", level: 39, nature: "Relaxed", ability: "Swift Swim", moves: "Splash/Tackle/Flail/(No Move)" }, // Brett
    { type: "kill", pokemon: "Finneon", level: 42, nature: "Sassy", ability: "Storm Drain", moves: "Rain Dance/Aqua Ring/Whirlpool/U-turn" },
    { type: "kill", pokemon: "Feebas", level: 39, nature: "Sassy", ability: "Oblivious", moves: "Splash/Tackle/Flail/(No Move)" },
    { type: "kill", pokemon: "Gyarados", level: 41, nature: "Sassy", ability: "Intimidate", moves: "Whirlpool/Brine/Waterfall/Rain Dance" }, // Cole
    { type: "kill", pokemon: "Remoraid", level: 38, nature: "Hardy", ability: "Sniper", moves: "Focus Energy/Psybeam/Aurora Beam/Bubble Beam" },
    { type: "kill", pokemon: "Gyarados", level: 41, nature: "Sassy", ability: "Intimidate", moves: "Ice Fang/Waterfall/Crunch/Dragon Dance" },
    { type: "kill", pokemon: "Remoraid", level: 43, nature: "Quirky", ability: "Hustle", moves: "Lock-On/Bullet Seed/Ice Beam/Hydro Pump" }, // Holly

    // Route 222 Upper Path
    { type: "kill", pokemon: "Feebas", level: 37, nature: "Sassy", ability: "Oblivious", moves: "Splash/Tackle/Flail/(None)" }, // Luther
    { type: "kill", pokemon: "Machoke", level: 40, nature: "Relaxed", ability: "No Guard", moves: "Leer/Low Sweep/Knock Off/Dual Chop" },
    { type: "kill", pokemon: "Gastrodon", level: 43, nature: "Sassy", ability: "Storm Drain", moves: "Recover/Water Pulse/Ancient Power/Earth Power" },

    // Sunyshore Gym
    { type: "kill", pokemon: "Pachirisu", level: 44, nature: "Jolly", ability: "Pickup", moves: "Charm/Spark/Nuzzle/Dig" }, // Tiera
    { type: "kill", pokemon: "Luxio", level: 44, nature: "Jolly", ability: "Intimidate", moves: "Leer/Bite/Spark/Iron Tail" }, // Jerry
    { type: "kill", pokemon: "Mr. Mime", level: 44, nature: "Timid", ability: "Filter", moves: "Reflect/Dazzling Gleam/Thunderbolt/Energy Ball" }, // Forrest
    { type: "kill", pokemon: "Pikachu", level: 41, nature: "Jolly", ability: "Static", moves: "Nuzzle/Charm/Spark/Light Screen" }, // Meghan
    { type: "kill", pokemon: "Pikachu", level: 41, nature: "Jolly", ability: "Static", moves: "Charm/Double Team/Spark/Light Screen" },
    { type: "kill", pokemon: "Pikachu", level: 41, nature: "Jolly", ability: "Static", moves: "Charm/Electro Ball/Agility/Light Screen" },
    { type: "kill", pokemon: "Pikachu", level: 41, nature: "Jolly", ability: "Static", moves: "Charm/Nasty Plot/Thunderbolt/Light Screen" },
    { type: "kill", pokemon: "Raichu", level: 44, nature: "Jolly", ability: "Static", moves: "Thunder Punch/Thunder Wave/Thunderbolt/Quick Attack" }, // Lonnie
    { type: "kill", pokemon: "Kadabra", level: 44, nature: "Timid", ability: "Inner Focus", moves: "Reflect/Psychic/Shock Wave/Energy Ball" }, // Destiny
    { type: "kill", pokemon: "Raichu", level: 44, nature: "Jolly", ability: "Static", moves: "Thunder Punch/Thunderbolt/Light Screen/Quick Attack" },
    { type: "kill", pokemon: "Luxio", level: 42, nature: "Jolly", ability: "Intimidate", moves: "Bite/Volt Switch/Thunder Wave/Iron Tail" }, // Preston
    { type: "kill", pokemon: "Bibarel", level: 42, nature: "Jolly", ability: "Simple", moves: "Yawn/Thunderbolt/Bulldoze/Waterfall" },
    { type: "kill", pokemon: "Steelix", level: 44, nature: "Relaxed", ability: "Sturdy", moves: "Thunder Fang/Screech/Iron Tail/Bulldoze" }, // Zachery
    { type: "kill", pokemon: "Medicham", level: 44, nature: "Jolly", ability: "Pure Power", moves: "Zen Headbutt/Thunder Punch/Reversal/Rock Tomb" },
    { type: "kill", pokemon: "Raichu", level: 46, item: "Shuca Berry", nature: "Timid", ability: "Static", moves: "Nuzzle/Volt Switch/Surf/Charge Beam", Ivs: "11/0/11/28/11/28", Evs: "12/0/12/160/12/160" }, // Volkner
    { type: "kill", pokemon: "Ambipom", level: 47, item: "Chople Berry", nature: "Naive", ability: "Technician", moves: "Fake Out/Thunderbolt/Double Hit/Last Resort", Ivs: "11/20/11/20/11/28", Evs: "12/80/12/80/12/160" },
    { type: "kill", pokemon: "Octillery", level: 47, item: "Expert Belt", nature: "Modest", ability: "Sniper", moves: "Octazooka/Focus Energy/Aurora Beam/Charge Beam", Ivs: "11/0/11/28/11/28", Evs: "12/0/12/160/12/160" },
    { type: "kill", pokemon: "Luxray", level: 49, item: "Sitrus Berry", nature: "Jolly", ability: "Intimidate", moves: "Thunder Fang/Ice Fang/Crunch/Iron Tail", Ivs: "15/28/15/0/0/30", Evs: "28/160/28/0/0/200" },

    // Route 223
    { type: "kill", pokemon: "Lumineon", level: 43, nature: "Timid", ability: "Swift Swim", moves: "Attract/Rain Dance/Aqua Ring/Whirlpool" }, // Miranda
    { type: "kill", pokemon: "Azurill", level: 41, nature: "Bashful", ability: "Tick Fat", moves: "Bubble Beam/Charm/Slam/Bounce" }, // Aubree
    { type: "kill", pokemon: "Azumarill", level: 41, nature: "Bashful", ability: "Thick Fat", moves: "Bounce/Aqua Tail/Play Rough/Aqua Ring" },
    { type: "kill", pokemon: "Mantyke", level: 38, nature: "Sassy", ability: "Water Absorb", moves: "Supersonic/Bubble Beam/Air Slash/Aqua Ring" }, //Oscar
    { type: "kill", pokemon: "Remoraid", level: 40, nature: "Hardy", ability: "Hustle", moves: "Lock-On/Bullet Seed/Ice Beam/Hydro Pump" },
    { type: "kill", pokemon: "Mantine", level: 42, nature: "Sassy", ability: "Water Absorb", moves: "Bullet Seed/Bubble Beam/Aqua Ring/Bounce" },
    { type: "kill", pokemon: "Wingull", level: 37, nature: "Hardy", ability: "Hydration", moves: "Quick Attack/Water Pulse/Air Slash/Mist" }, // Colton
    { type: "kill", pokemon: "Quagsire", level: 42, nature: "Relaxed", ability: "Water Absorb", moves: "Rain Dance/Mud Shot/Yawn/Muddy Water" },
    { type: "kill", pokemon: "Pelipper", level: 41, nature: "Relaxed", ability: "Drizzle", moves: "Tailwind/Wing Attack/Water Pulse/Stockpile" },
    { type: "kill", pokemon: "Marill", level: 39, nature: "Bashful", ability: "Thick Fat", moves: "Bubble Beam/Charm/Play Rough/Rain Dance" }, // Paige
    { type: "kill", pokemon: "Wingull", level: 40, nature: "Bashful", ability: "Hydration", moves: "Quick Attack/Water Pulse/Air Slash/Mist" },
    { type: "kill", pokemon: "Golduck", level: 41, nature: "Calm", ability: "Damp", moves: "Aqua Jet/Zen Headbutt/Screech/Aqua Tail" },
    { type: "kill", pokemon: "Tentacruel", level: 43, nature: "Sassy", ability: "Clear Body", moves: "Acid/Water Pulse/Acid Armor/Poison Jab" }, // Ricardo
    { type: "kill", pokemon: "Wingull", level: 41, nature: "Timid", ability: "Hydration", moves: "Growl/Water Pulse/Agility/Air Slash" }, // Crystal
    { type: "kill", pokemon: "Seaking", level: 41, nature: "Adamant", ability: "Swift Swim", moves: "Peck/Horn Attack/Flail/Waterfall" },
    { type: "kill", pokemon: "Buizel", level: 41, nature: "Jolly", ability: "Swift Swim", moves: "Bite/Swift/Aqua Jet/Waterfall" }, // Wesley
    { type: "kill", pokemon: "Tentacruel", level: 41, nature: "Timid", ability: "Liquid Ooze", moves: "Supersonic/Bubble Beam/Acid Armor/Poison Jab" },
    { type: "kill", pokemon: "Pelipper", level: 38, nature: "Bold", ability: "Drizzle", moves: "Air Slash/Tailwind/Water Pulse/Stockpile" }, // Zachariah
    { type: "kill", pokemon: "Machoke", level: 38, nature: "Adamant", ability: "No Guard", moves: "Leer/Low Sweep/Knock Off/Dual Chop" },
    { type: "kill", pokemon: "Gastrodon", level: 44, nature: "Modest", ability: "Storm Drain", moves: "Recover/Ancient Power/Muddy Water/Earth Power" },
    { type: "kill", pokemon: "Golduck", level: 43, nature: "Calm", ability: "Cloud Nine", moves: "Aqua Jet/Zen Headbutt/Screech/Aqua Tail" }, // Gabrielle
    { type: "kill", pokemon: "Finneon", level: 41, nature: "Bashful", ability: "Storm Drain", moves: "Attract/Rain Dance/Gust/Water Pulse" }, // Cassandra
    { type: "kill", pokemon: "Pelipper", level: 41, nature: "Bold", ability: "Drizzle", moves: "Wing Attack/Water Pulse/Stockpile/Swallow" },
    { type: "kill", pokemon: "Tentacool", level: 40, nature: "Timid", ability: "Clear Body", moves: "Water Pulse/Hex/Acid Armor/Poison Jab" }, // Francisco
    { type: "kill", pokemon: "Golduck", level: 42, nature: "Jolly", ability: "Damp", moves: "Fury Swipes/Zen Headbutt/Aqua Tail/Psych Up" },
    { type: "kill", pokemon: "Gyarados", level: 43, nature: "Sassy", ability: "Intimidate", moves: "Scary Face/Rain Dance/Aqua Tail/Hydro Pump" }, // Troy

    // Victory Road
    { type: "kill", pokemon: "Haunter", level: 43, nature: "Sassy", ability: "Levitate", moves: "Confuse Ray/Curse/Hex/Dark Pulse" }, // Bryce
    { type: "kill", pokemon: "Alakazam", level: 46, nature: "Sassy", ability: "Inner Focus", moves: "Recover/Psyshock/Role Play/Future Sight" },
    { type: "kill", pokemon: "Gengar", level: 46, nature: "Sassy", ability: "Cursed Body", moves: "Shadow Punch/Confuse Ray/Hex/Dark Pulse" },
    { type: "kill", pokemon: "Noctowl", level: 44, nature: "Calm", ability: "Keen Eye", moves: "Sky Attack/Take Down/Roost/Moonblast" }, // Hana
    { type: "kill", pokemon: "Staraptor", level: 48, nature: "Impish", ability: "Intimidate", moves: "Close Combat/Quick Attack/Endeavor/Aerial Ace" },
    { type: "kill", pokemon: "Golduck", level: 46, nature: "Calm", ability: "Cloud Nine", moves: "Zen Headbutt/Aqua Jet/Tail Whip/Aqua Tail" }, // Mariah
    { type: "kill", pokemon: "Blissey", level: 48, nature: "Calm", ability: "Serene Grace", moves: "Disarming Voice/Double-Edge/Soft-Boiled/Last Resort" },
    { type: "kill", pokemon: "Rapidash", level: 45, nature: "Sassy", ability: "Run Away", moves: "Smart Strike/Poison Jab/Tail Whip/Flame Wheel" }, // Omar
    { type: "kill", pokemon: "Carnivine", level: 45, nature: "Hardy", ability: "Levitate", moves: "Bind/Growth/Leaf Tornado/Crunch" },
    { type: "kill", pokemon: "Rampardos", level: 48, nature: "Relaxed", ability: "Mold Breaker", moves: "Headbutt/Zen Headbutt/Assurance/Swords Dance" },
    { type: "kill", pokemon: "Clefable", level: 46, nature: "Calm", ability: "Cute Charm", moves: "Moonlight/Meteor Mash/Cosmic Power/Moonblast" }, // Sydney
    { type: "kill", pokemon: "Torterra", level: 48, nature: "Impish", ability: "Overgrow", moves: "Earthquake/Wood Hammer/Crunch/Synthesis" },
    { type: "kill", pokemon: "Staraptor", level: 47, nature: "Relaxed", ability: "Intimidate", moves: "Quick Attack/Endeavor/Aerial Ace/Take Down" }, // Clayton
    { type: "kill", pokemon: "Hippowdon", level: 47, nature: "Relaxed", ability: "Sand Stream", moves: "Earthquake/Crunch/Ice Fang/Yawn" },
    { type: "kill", pokemon: "Staraptor", level: 47, nature: "Relaxed", ability: "Intimidate", moves: "Close Combat/Quick Attack/Double Team/Aerial Ace" }, // Al
    { type: "kill", pokemon: "Whiscash", level: 47, nature: "Impish", ability: "Oblivious", moves: "Zen Headbutt/Tickle/Muddy Water/Earthquake" }, // Kay
    { type: "kill", pokemon: "Machamp", level: 49, nature: "Relaxed", ability: "No Guard", moves: "Low Sweep/Knock Off/Dual Chop/Bulk Up" }, // Miles
    { type: "kill", pokemon: "Chingling", level: 44, nature: "Bashful", ability: "Levitate", moves: "Wrap/Astonish/Confusion/Yawn" }, // Valencia
    { type: "kill", pokemon: "Chimecho", level: 48, nature: "Calm", ability: "Levitate", moves: "Wrap/Yawn/Extrasensory/Heal Pulse" },
    { type: "kill", pokemon: "Gyarados", level: 47, nature: "Sassy", ability: "Intimidate", moves: "Ice Fang/Waterfall/Crunch/Dragon Dance" }, // Jo
    { type: "kill", pokemon: "Medicham", level: 47, nature: "Bashful", ability: "Pure Power", moves: "Zen Headbutt/Fire Punch/Force Palm/Recover" }, // Pat
    { type: "kill", pokemon: "Honchkrow", level: 49, nature: "Hardy", ability: "Insomnia", moves: "Astonish/Wing Attack/Swagger/Foul Play" }, // Henry
    { type: "kill", pokemon: "Gabite", level: 49, nature: "Relaxed", ability: "Sand Veil", moves: "Sand Tomb/Sand Attack/Bite/Dragon Claw" }, // Andre (Formerly Ondrej)
    { type: "kill", pokemon: "Tentacruel", level: 45, nature: "Sassy", ability: "Clear Body", moves: "Reflect Type/Bubble Beam/Acid Armor/Poison Jab" }, // Edgar
    { type: "kill", pokemon: "Golem", level: 45, nature: "Relaxed", ability: "Sturdy", moves: "Earthquake/Sandstorm/Smack Down/Heavy Slam" },
    { type: "kill", pokemon: "Empoleon", level: 48, nature: "Sassy", ability: "Torrent", moves: "Brine/Aqua Jet/Metal Claw/Swords Dance" },
    { type: "kill", pokemon: "Gible", level: 46, nature: "Hardy", ability: "Sand Veil", moves: "Sand Tomb/Sand Attack/Bulldoze/Dragon Claw" }, // Clinton
    { type: "kill", pokemon: "Gyarados", level: 49, nature: "Sassy", ability: "Intimidate", moves: "Ice Fang/Waterfall/Crunch/Dragon Dance" },
    { type: "kill", pokemon: "Gible", level: 46, nature: "Hardy", ability: "Sand Veil", moves: "Bite/Slash/Dragon Claw/Dig" },

    // Barry 5 Start w/ Piplup (Pokemon League)
    { type: "kill", pokemon: "Staraptor", level: 49, item: "Focus Sash", nature: "Jolly", ability: "Intimidate", moves: "Close Combat/Pluck/Sunny Day/U-turn", Ivs: "5/5/5/5/5/5", Evs: "56/148/36/0/36/148" },
    { type: "kill", pokemon: "Floatzel", level: 49, item: "Quick Claw", nature: "Jolly", ability: "Swift Swim", moves: "Ice Fang/Crunch/Swift/Brine", Ivs: "6/6/6/6/6/6", Evs: "40/104/40/0/40/160" },
    { type: "kill", pokemon: "Heracross", level: 51, nature: "Jolly", ability: "Swarm", moves: "Pin Missile/Swords Dance/Rock Slide/Thief", Ivs: "9/9/9/9/9/9", Evs: "44/104/44/0/44/156" },
    { type: "kill", pokemon: "Rapidash", level: 49, item: "Expert Belt", nature: "Jolly", ability: "Flash Fire", moves: "Smart Strike/Megahorn/Poison Jab/Flame Wheel", Ivs: "7/7/7/7/7/7", Evs: "48/116/48/0/48/172" },
    { type: "kill", pokemon: "Snorlax", level: 52, nature: "Adamant", ability: "Thick Fat", moves: "Covet/Yawn/Crunch/High Horsepower", Ivs: "9/9/9/9/9/9", Evs: "96/120/96/0/88/0" },
    { type: "kill", pokemon: "Torterra", level: 55, item: "Leftovers", nature: "Careful", ability: "Overgrow", moves: "Earthquake/Wood Hammer/Roar/Stealth Rock", Ivs: "11/11/11/11/11/11", Evs: "164/92/52/52/124/0" },

    // // Barry 5 Start w/ Turtwig (Pokemon League)
    // { type: "kill", pokemon: "Staraptor", level: 49, item: "Focus Sash", nature: "Jolly", ability: "Intimidate", moves: "Close Combat/Pluck/Sunny Day/U-turn", Ivs: "5/5/5/5/5/5", Evs: "56/148/36/0/36/148" },
    // { type: "kill", pokemon: "Floatzel", level: 49, item: "Quick Claw", nature: "Jolly", ability: "Swift Swim", moves: "Ice Fang/Crunch/Swift/Brine", Ivs: "6/6/6/6/6/6", Evs: "40/104/40/0/40/160" },
    // { type: "kill", pokemon: "Heracross", level: 51, nature: "Jolly", ability: "Swarm", moves: "Pin Missile/Swords Dance/Rock Slide/Thief", Ivs: "9/9/9/9/9/9", Evs: "44/104/44/0/44/156" },
    // { type: "kill", pokemon: "Roserade", level: 49, item: "Big Root", nature: "Timid", ability: "Poison Point", moves: "Grassy Terrain/Giga Drain/Toxic/Grass Knot", Ivs: "7/7/7/7/7/7", Evs: "48/0/48/116/48/172" },
    // { type: "kill", pokemon: "Snorlax", level: 52, nature: "Adamant", ability: "Thick Fat", moves: "Covet/Yawn/Crunch/High Horsepower", Ivs: "9/9/9/9/9/9", Evs: "96/120/96/0/88/0" },
    // { type: "kill", pokemon: "Infernape", level: 55, item: "Expert Belt", nature: "Jolly", ability: "Blaze", moves: "Close Combat/Flame Wheel/U-turn/Shadow Claw", Ivs: "11/11/11/11/11/11", Evs: "52/156/52/0/52/164" },

    // // Barry 5 Start w/ Chimchar (Pokemon League)
    // { type: "kill", pokemon: "Staraptor", level: 49, item: "Focus Sash", nature: "Jolly", ability: "Intimidate", moves: "Close Combat/Pluck/Sunny Day/U-turn", Ivs: "5/5/5/5/5/5", Evs: "56/148/36/0/36/148" },
    // { type: "kill", pokemon: "Roserade", level: 49, item: "Black Sludge", nature: "Timid", ability: "Nature Cure", moves: "Grassy Terrain/Petal Blizzard/Stun Spore/Shadow Ball", Ivs: "6/6/6/6/6/6", Evs: "40/0/40/104/40/160" },
    // { type: "kill", pokemon: "Heracross", level: 51, nature: "Jolly", ability: "Swarm", moves: "Pin Missile/Swords Dance/Rock Slide/Thief", Ivs: "9/9/9/9/9/9", Evs: "44/104/44/0/44/156" },
    // { type: "kill", pokemon: "Rapidash", level: 49, item: "Expert Belt", nature: "Jolly", ability: "Flash Fire", moves: "Smart Strike/Megahorn/Poison Jab/Flame Wheel", Ivs: "7/7/7/7/7/7", Evs: "48/116/48/0/48/172" },
    // { type: "kill", pokemon: "Snorlax", level: 52, nature: "Adamant", ability: "Thick Fat", moves: "Covet/Yawn/Crunch/High Horsepower", Ivs: "9/9/9/9/9/9", Evs: "96/120/96/0/88/0" },
    // { type: "kill", pokemon: "Empoleon", level: 55, item: "Quick Claw", nature: "Timid", ability: "Torrent", moves: "Charm/Grass Knot/Brine/Flash Cannon", Ivs: "11/11/11/11/11/11", Evs: "52/0/52/156/52/164" },

    // Aaron R1
    { type: "kill", pokemon: "Dustox", level: 53, item: "Black Sludge", nature: "Bold", ability: "Shield Dust", moves: "Toxic/Bug Buzz/Moonlight/Light Screen", Ivs: "31/0/21/21/21/21", Evs: "252/0/12/12/12/12" },
    { type: "kill", pokemon: "Beautifly", level: 53, item: "Black Glasses", nature: "Modest", ability: "Swarm", moves: "Bug Buzz/Shadow Ball/Psychic/Quiver Dance", Ivs: "21/0/21/31/21/31", Evs: "12/0/12/60/12/204" },
    { type: "kill", pokemon: "Vespiquen", level: 54, item: "Sitrus Berry", nature: "Adamant", ability: "Unnerve", moves: "Acrobatics/Attack Order/Aerial Ace/Defend Order", Ivs: "31/31/31/0/31/31", Evs: "252/0/0/0/0/0" },
    { type: "kill", pokemon: "Heracross", level: 54, item: "Flame Orb", nature: "Jolly", ability: "Guts", moves: "Earthquake/Rock Slide/Facade/Brick Break", Ivs: "21/31/21/0/21/31", Evs: "12/60/12/0/12/204" },
    { type: "kill", pokemon: "Drapion", level: 57, item: "Scope Lens", nature: "Jolly", ability: "Sniper", moves: "Cross Poison/Night Slash/Earthquake/X-Scissor", Ivs: "31/31/31/0/31/31", Evs: "12/60/0/0/0/204" },

    // Bertha R1
    { type: "kill", pokemon: "Quagsire", level: 55, item: "Leftovers", nature: "Impish", ability: "Water Absorb", moves: "Recover/Toxic/Earthquake/Surf", Ivs: "23/31/31/0/13/31", Evs: "12/0/252/12/12/12" },
    { type: "kill", pokemon: "Sudowoodo", level: 56, item: "Sitrus Berry", nature: "Adamant", ability: "Rock Head", moves: "Double-Edge/Head Smash/Sucker Punch/Low Kick", Ivs: "21/31/31/0/11/31", Evs: "0/252/12/0/12/12" },
    { type: "kill", pokemon: "Golem", level: 56, item: "Soft Sand", nature: "Jolly", ability: "Sturdy", moves: "Rock Polish/Heavy Slam/Earthquake/Stone Edge", Ivs: "21/31/31/0/21/31", Evs: "12/60/12/0/12/204" },
    { type: "kill", pokemon: "Whiscash", level: 55, item: "Rindo Berry", nature: "Modest", ability: "Hydration", moves: "Bulldoze/Ice Beam/Belch/Hydro Pump", Ivs: "21/31/21/31/21/0", Evs: "12/12/12/252/12/0" },
    { type: "kill", pokemon: "Hippowdon", level: 59, item: "Chesto Berry", nature: "Adamant", ability: "Sand Stream", moves: "Ice Fang/Earthquake/Crunch/Rest", Ivs: "31/31/31/0/31/31", Evs: "12/252/0/0/0/0" },

    // Flint R1
    { type: "kill", pokemon: "Rapidash", level: 58, item: "Wide Lens", nature: "Jolly", ability: "Flame Body", moves: "Flame Charge/Iron Tail/Poison Jab/Hypnosis", Ivs: "25/31/25/0/25/31", Evs: "12/60/12/0/12/204" },
    { type: "kill", pokemon: "Steelix", level: 57, item: "Life Orb", nature: "Adamant", ability: "Sheer Force", moves: "Thunder Fang/Fire Fang/Iron Tail/Crunch", Ivs: "31/31/31/0/31/31", Evs: "12/252/0/12/12/0" },
    { type: "kill", pokemon: "Drifblim", level: 58, item: "Sitrus Berry", nature: "Timid", ability: "Unburden", moves: "Strength Sap/Minimize/Baton Pass/Will-O-Wisp", Ivs: "31/0/31/0/31/31", Evs: "12/60/12/0/12/204" },
    { type: "kill", pokemon: "Lopunny", level: 57, item: "Leftovers", nature: "Jolly", ability: "Cute Charm", moves: "Mirror Coat/High Jump Kick/Quick Attack/Fire Punch", Ivs: "31/31/31/0/31/31", Evs: "252/0/0/0/0/0" },
    { type: "kill", pokemon: "Infernape", level: 61, item: "Focus Sash", nature: "Jolly", ability: "Iron Fist", moves: "Fire Punch/Thunder Punch/Close Combat/Mach Punch", Ivs: "31/31/31/0/31/31", Evs: "12/60/0/0/0/204" },

    // Lucian R1
    { type: "kill", pokemon: "Mr. Mime", level: 59, item: "Light Clay", nature: "Bold", ability: "Filter", moves: "Light Screen/Reflect/Psychic/Dazzling Gleam", Ivs: "31/0/31/31/31/31", Evs: "252/0/12/12/12/12" },
    { type: "kill", pokemon: "Girafarig", level: 59, item: "Mental Herb", nature: "Calm", ability: "Sap Sipper", moves: "Light Screen/Psychic/Thunderbolt/Trick Room", Ivs: "31/0/31/31/31/0", Evs: "252/0/12/12/12/0" },
    { type: "kill", pokemon: "Medicham", level: 60, item: "Muscle Band", nature: "Brave", ability: "Pure Power", moves: "Zen Headbutt/High Jump Kick/Thunder Punch/Ice Punch", Ivs: "31/31/31/0/31/0", Evs: "0/252/0/0/0/0" },
    { type: "kill", pokemon: "Alakazam", level: 60, item: "Life Orb", nature: "Timid", ability: "Magic Guard", moves: "Nasty Plot/Psychic/Future Sight/Shock Wave", Ivs: "31/0/31/31/31/31", Evs: "0/0/0/0/0/252" },
    { type: "kill", pokemon: "Bronzong", level: 63, item: "Sitrus Berry", nature: "Brave", ability: "Levitate", moves: "Gyro Ball/Earthquake/Payback/Trick Room", Ivs: "31/31/31/0/31/0", Evs: "12/252/0/0/0/0" },

    {type: "change-ability", ability: "Hello"},

    // Cynthia
    { type: "kill", pokemon: "Spiritomb", level: 61, item: "Sitrus Berry", nature: "Quiet", ability: "Pressure", moves: "Shadow Ball/Dark Pulse/Psychic/Sucker Punch", Ivs: "31/31/31/31/31/31", Evs: "252/6/0/252/0/0" },
    { type: "kill", pokemon: "Roserade", level: 60, item: "Expert Belt", nature: "Timid", ability: "Poison Point", moves: "Dazzling Gleam/Shadow Ball/Sludge Bomb/Energy Ball", Ivs: "31/0/31/0/31/31", Evs: "52/0/0/252/0/204" },
    { type: "kill", pokemon: "Gastrodon", level: 60, item: "Leftovers", nature: "Relaxed", ability: "Storm Drain", moves: "Scald/Earthquake/Sludge Bomb/Rock Tomb", Ivs: "31/31/31/31/31/0", Evs: "252/0/252/0/6/0" },
    { type: "kill", pokemon: "Lucario", level: 63, item: "Wise Glasses", nature: "Timid", ability: "Inner Focus", moves: "Aura Sphere/Dragon Pulse/Flash Cannon/Nasty Plot", Ivs: "31/0/31/31/31/31", Evs: "52/0/0/252/0/204" },
    { type: "kill", pokemon: "Milotic", level: 63, item: "Flame Orb", nature: "Bold", ability: "Marvel Scale", moves: "Recover/Mirror Coat/Ice Beam/Scald", Ivs: "31/0/31/31/31/31", Evs: "252/0/252/6/0/0" },
    { type: "kill", pokemon: "Garchomp", level: 66, item: "Yache Berry", nature: "Jolly", ability: "Rough Skin", moves: "Dragon Claw/Earthquake/Swords Dance/Poison Jab", Ivs: "31/31/31/0/31/31", Evs: "52/252/0/0/0/204" },
];

let requiredExperience = {
    "Erratic": [0, 15, 52, 122, 237, 406, 637, 942, 1326, 1800, 2369, 3041, 3822, 4719, 5737, 6881, 8155, 9564, 11111, 12800, 14632, 16610, 18737, 21012, 23437, 26012, 28737, 31610, 34632, 37800, 41111, 44564, 48155, 51881, 55737, 59719, 63822, 68041, 72369, 76800, 81326, 85942, 90637, 95406, 100237, 105122, 110052, 115015, 120001, 125000, 131324, 137795, 144410, 151165, 158056, 165079, 172229, 179503, 186894, 194400, 202013, 209728, 217540, 225443, 233431, 241496, 249633, 257834, 267406, 276458, 286328, 296358, 305767, 316074, 326531, 336255, 346965, 357812, 367807, 378880, 390077, 400293, 411686, 423190, 433572, 445239, 457001, 467489, 479378, 491346, 501878, 513934, 526049, 536557, 548720, 560922, 571333, 583539, 591882, 60000],
    "Fast": [0, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 800000],
    "Medium Fast": [0, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1000000],
    "Medium Slow": [0, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 1059860],
    "Slow": [0, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 1250000],
    "Fluctuating": [0, 4, 13, 32, 65, 112, 178, 276, 393, 540, 745, 967, 1230, 1591, 1957, 2457, 3046, 3732, 4526, 5440, 6482, 7666, 9003, 10506, 12187, 14060, 16140, 18439, 20974, 23760, 26811, 30146, 33780, 37731, 42017, 46656, 50653, 55969, 60505, 66560, 71677, 78533, 84277, 91998, 98415, 107069, 114205, 123863, 131766, 142500, 151222, 163105, 172697, 185807, 196322, 210739, 222231, 238036, 250562, 267840, 281456, 300293, 315059, 335544, 351520, 373744, 390991, 415050, 433631, 459620, 479600, 507617, 529063, 559209, 582187, 614566, 639146, 673863, 700115, 737280, 765275, 804997, 834809, 877201, 908905, 954084, 987754, 1035837, 1071552, 1122660, 1160499, 1214753, 1254796, 1312322, 1354652, 1415577, 1460276, 1524731, 1571884, 1640000],
};

let experienceYields = {
    "Abomasnow": 173,
    "Abra": 62,
    "Absol": 163,
    "Aegislash-Blade": 250,
    "Aegislash-Shield": 250,
    "Aerodactyl": 180,
    "Aggron": 265,
    "Aipom": 72,
    "Alakazam": 250,
    "Alcremie": 173,
    "Alomomola": 165,
    "Altaria": 172,
    "Ambipom": 169,
    "Ampharos": 255,
    "Anorith": 71,
    "Appletun": 170,
    "Applin": 52,
    "Araquanid": 159,
    "Arcanine": 194,
    "Arceus": 360,
    "Archen": 71,
    "Arctovish": 177,
    "Arctozolt": 177,
    "Ariados": 140,
    "Armaldo": 173,
    "Aromatisse": 162,
    "Aron": 66,
    "Arrokuda": 56,
    "Articuno-Galar": 261,
    "Articuno": 261,
    "Avalugg": 180,
    "Azelf": 290,
    "Azumarill": 210,
    "Azurill": 38,
    "Bagon": 60,
    "Baltoy": 60,
    "Banette": 159,
    "Barbaracle": 175,
    "Barboach": 58,
    "Barraskewda": 172,
    "Bastiodon": 173,
    "Bayleef": 142,
    "Beartic": 177,
    "Beautifly": 198,
    "Beldum": 60,
    "Bellossom": 245,
    "Bergmite": 61,
    "Bewear": 175,
    "Bibarel": 144,
    "Bidoof": 50,
    "Bisharp": 172,
    "Blastoise": 265,
    "Blaziken": 265,
    "Blipbug": 36,
    "Blissey": 635,
    "Boldore": 137,
    "Boltund": 172,
    "Bonsly": 58,
    "Bounsweet": 42,
    "Braviary": 179,
    "Breloom": 161,
    "Bronzong": 175,
    "Bronzor": 60,
    "Budew": 56,
    "Buizel": 66,
    "Bulbasaur": 64,
    "Buneary": 70,
    "Burmy": 45,
    "Butterfree": 178,
    "Cacnea": 67,
    "Cacturne": 166,
    "Candyfloss": 168,
    "Carbink": 100,
    "Carkol": 144,
    "Carnivine": 159,
    "Carvanha": 61,
    "Cascoon": 72,
    "Caterpie": 39,
    "Centiskorch": 184,
    "Chandelure": 260,
    "Chansey": 395,
    "Charizard": 267,
    "Charjabug": 140,
    "Charmander": 62,
    "Charmeleon": 142,
    "Chatot": 144,
    "Cherrim": 158,
    "Cherubi": 55,
    "Chewtle": 57,
    "Chikorita": 64,
    "Chimchar": 62,
    "Chimecho": 159,
    "Chinchou": 161,
    "Chingling": 57,
    "Cinccino": 165,
    "Cinderace": 265,
    "Clamperl": 69,
    "Claydol": 175,
    "Clefable": 242,
    "Clefairy": 113,
    "Cleffa": 44,
    "Cloyster": 184,
    "Coalossal": 255,
    "Cofagrigus": 169,
    "Combee": 49,
    "Combusken": 142,
    "Comfey": 170,
    "Conkeldurr": 227,
    "Copperajah": 175,
    "Corphish": 62,
    "Corsola-Galar": 144,
    "Corsola": 144,
    "Corviknight": 248,
    "Corvisquire": 128,
    "Cottonee": 56,
    "Crabrawler": 68,
    "Cradily": 173,
    "Cramorant": 166,
    "Cranidos": 70,
    "Crawdaunt": 164,
    "Cresselia": 300,
    "Croagunk": 60,
    "Crobat": 268,
    "Croconaw": 142,
    "Crustle": 170,
    "Cubchoo": 61,
    "Cubone": 64,
    "Cufant": 66,
    "Cursola-Galar": 179,
    "Cursola": 179,
    "Cutiefly": 61,
    "Cyndaquil": 62,
    "Darkrai": 300,
    "Darmanitan-Galar": 168,
    "Darmanitan": 168,
    "Darumaka-Galar": 63,
    "Darumaka": 63,
    "Delcatty": 140,
    "Delibird": 116,
    "Dewgong": 166,
    "Dewpider": 54,
    "Dhelmise": 181,
    "Dialga": 340,
    "Diggersby": 127,
    "Diglett-Alola": 53,
    "Diglett": 53,
    "Dodrio": 165,
    "Doduo": 62,
    "Donphan": 175,
    "Dottler": 117,
    "Doublade": 157,
    "Dracovish": 177,
    "Dracozolt": 177,
    "Dragapult": 300,
    "Dragonair": 147,
    "Dragonite": 300,
    "Drakloak": 144,
    "Drampa": 170,
    "Drapion": 175,
    "Dratini": 60,
    "Drednaw": 170,
    "Dreepy": 54,
    "Drifblim": 174,
    "Drifloon": 70,
    "Drilbur": 66,
    "Drizzile": 147,
    "Drowzee": 66,
    "Dubwool": 172,
    "Dugtrio-Alola": 149,
    "Dugtrio": 149,
    "Dunsparce": 145,
    "Duosion": 130,
    "Duraludon": 187,
    "Durant": 169,
    "Dusclops": 159,
    "Dusknoir": 263,
    "Duskull": 59,
    "Dustox": 193,
    "Eevee": 65,
    "Eiscue": 165,
    "Ekans": 58,
    "Eldegoss": 161,
    "Electabuzz": 172,
    "Electivire": 270,
    "Electrike": 59,
    "Elekid": 72,
    "Empoleon": 265,
    "Escavalier": 173,
    "Espeon": 184,
    "Excadrill": 178,
    "Exeggcute": 65,
    "Exeggutor": 186,
    "Exploud": 245,
    "Falinks": 165,
    "Farfetch'd-Galar": 132,
    "Farfetch'd": 132,
    "Fearow": 155,
    "Feebas": 40,
    "Feraligatr": 265,
    "Ferroseed": 61,
    "Ferrothorn": 171,
    "Finneon": 66,
    "Flaaffy": 128,
    "Flapple": 170,
    "Flareon": 184,
    "Fletchinder": 134,
    "Floatzel": 173,
    "Flygon": 260,
    "Fomantis": 50,
    "Frillish": 67,
    "Froslass": 168,
    "Frosmoth": 166,
    "Furfrou": 165,
    "Gabite": 144,
    "Gabite": 144,
    "Gallade": 259,
    "Galvantula": 165,
    "Garbodor": 166,
    "Garchomp": 300,
    "Gardevoir": 259,
    "Gastly": 62,
    "Gastrodon": 166,
    "Gengar": 250,
    "Geodude": 60,
    "Gible": 60,
    "Gigalith": 258,
    "Girafarig": 159,
    "Giratina": 340,
    "Glaceon": 184,
    "Glalie": 168,
    "Glameow": 62,
    "Gligar": 86,
    "Gliscor": 179,
    "Gloom": 138,
    "Golbat": 159,
    "Goldeen": 64,
    "Golduck": 175,
    "Golem": 248,
    "Golett": 61,
    "Golisopod": 186,
    "Golurk": 169,
    "Goodra": 300,
    "Goomy": 60,
    "Gorebyss": 170,
    "Gossifleur": 50,
    "Gothita": 58,
    "Gothorita": 137,
    "Gourgeist": 173,
    "Granbull": 158,
    "Grapploct": 168,
    "Graveler": 137,
    "Greedent": 161,
    "Grimer": 58,
    "Grimmsnarl": 255,
    "Grookey": 62,
    "Grotle": 142,
    "Grovyle": 142,
    "Growlithe": 70,
    "Grubbin": 60,
    "Grumpig": 165,
    "Gumshoos": 146,
    "Gurdurr": 142,
    "Gyarados": 189,
    "Hakamo-o": 147,
    "Happiny": 110,
    "Hariyama": 166,
    "Hatenna": 53,
    "Hatterene": 255,
    "Hattrem": 130,
    "Haunter": 142,
    "Hawlucha": 175,
    "Haxorus": 270,
    "Heatmor": 169,
    "Heatran": 300,
    "Heliolisk": 168,
    "Helioptile": 58,
    "Heracross": 175,
    "Herdier": 130,
    "Hippopotas": 66,
    "Hippowdon": 184,
    "Hitmonchan": 159,
    "Hitmonchan": 159,
    "Hitmonlee": 159,
    "Hitmonlee": 159,
    "Hitmontop": 159,
    "Hitmontop": 159,
    "Honchkrow": 177,
    "Honedge": 65,
    "Hoothoot": 52,
    "Hoppip": 50,
    "Horsea": 59,
    "Houndoom": 175,
    "Houndour": 66,
    "Huntail": 170,
    "Hypno": 169,
    "Indeedee-Female": 166,
    "Indeedee-Male": 166,
    "Infernape": 267,
    "Inkay": 58,
    "Inteleon": 265,
    "Ivysaur": 142,
    "Jangmo-o": 60,
    "Jellicent": 168,
    "Jigglypuff": 95,
    "Jolteon": 184,
    "Joltik": 64,
    "Jumpluff": 230,
    "Jynx": 159,
    "Kabuto": 71,
    "Kabutops": 173,
    "Kadabra": 140,
    "Kangaskhan": 172,
    "Kecleon": 154,
    "Kingdra": 270,
    "Kirlia": 97,
    "Klang": 154,
    "Klink": 60,
    "Klinklang": 260,
    "Koffing": 68,
    "Komala": 168,
    "Kommo-o": 270,
    "Krabby": 65,
    "Kricketot": 39,
    "Kricketune": 134,
    "Krokorok": 123,
    "Krookodile": 123,
    "Kubfu": 77,
    "Lairon": 151,
    "Lampent": 130,
    "Lanturn": 161,
    "Lapras": 187,
    "Larvitar": 60,
    "Leafeon": 184,
    "Ledian": 137,
    "Lickilicky": 180,
    "Lickitung": 77,
    "Liepard": 156,
    "Lileep": 71,
    "Lillipup": 55,
    "Linoone-Galar": 147,
    "Linoone": 147,
    "Litten": 64,
    "Litwick": 55,
    "Lombre": 119,
    "Lopunny": 168,
    "Lotad": 44,
    "Loudred": 126,
    "Lucario": 184,
    "Ludicolo": 216,
    "Lumineon": 161,
    "Lunatone": 161,
    "Lurantis": 168,
    "Luvdisc": 116,
    "Luxio": 127,
    "Luxray": 262,
    "Lycanroc-Dusk": 170,
    "Lycanroc-Midnight": 170,
    "Lycanroc": 170,
    "Machamp": 253,
    "Machoke": 142,
    "Machop": 61,
    "Magby": 73,
    "Magcargo": 151,
    "Magikarp": 40,
    "Magmar": 173,
    "Magmortar": 270,
    "Magnemite": 65,
    "Magneton": 163,
    "Magnezone": 268,
    "Makuhita": 47,
    "Malamar": 169,
    "Mamoswine": 265,
    "Manaphy": 300,
    "Mandibuzz": 179,
    "Manectric": 166,
    "Mankey": 61,
    "Mantine": 170,
    "Mantyke": 69,
    "Maractus": 161,
    "Mareanie": 61,
    "Mareep": 56,
    "Mareep": 56,
    "Marill": 88,
    "Marowak": 149,
    "Marshtomp": 142,
    "Mawile": 133,
    "Medicham": 144,
    "Meditite": 56,
    "Meganium": 263,
    "Meowth-Alola": 58,
    "Meowth-Galar": 58,
    "Meowth": 58,
    "Mesprit": 290,
    "Metagross": 300,
    "Metang": 147,
    "Metapod": 72,
    "Mienfoo": 70,
    "Mienshao": 179,
    "Mightyena": 147,
    "Milcery": 54,
    "Milotic": 189,
    "Miltank": 172,
    "Mime Jr.": 62,
    "Mimikyu": 167,
    "Minccino": 60,
    "Misdreavus": 87,
    "Mismagius": 173,
    "Moltres-Galar": 261,
    "Moltres": 261,
    "Monferno": 142,
    "Morelull": 57,
    "Morgrem": 130,
    "Morpeko": 153,
    "Mothim": 148,
    "Mr. Mime-Galar": 161,
    "Mr. Mime": 161,
    "Mr. Rime": 182,
    "Mudbray": 77,
    "Mudkip": 62,
    "Mudsdale": 175,
    "Muk": 175,
    "Munchlax": 78,
    "Murkrow": 81,
    "Natu": 64,
    "Nickit": 49,
    "NidoranF": 55,
    "Ninetales": 177,
    "Ninjask": 160,
    "Noctowl": 158,
    "Noibat": 49,
    "Noivern": 187,
    "Nosepass": 75,
    "Nuzleaf": 119,
    "Obstagoon": 260,
    "Octillery": 168,
    "Oddish": 64,
    "Omanyte": 71,
    "Omastar": 173,
    "Onix": 77,
    "Oranguru": 172,
    "Orbeetle": 253,
    "Oricorio": 167,
    "Pachirisu": 142,
    "Palkia": 340,
    "Pancham": 70,
    "Pangoro": 173,
    "Passimian": 172,
    "Pawniard": 68,
    "Pelipper": 154,
    "Perrserker": 154,
    "Persian": 154,
    "Petilil": 56,
    "Phanpy": 66,
    "Phantump": 62,
    "Phione": 240,
    "Pichu": 41,
    "Pidgey": 50,
    "Pidove": 53,
    "Pikachu": 112,
    "Pikipek": 53,
    "Piloswine": 158,
    "Pincurchin": 152,
    "Pinsir": 175,
    "Piplup": 63,
    "Poipole": 189,
    "Politoed": 250,
    "Poliwag": 60,
    "Poliwhirl": 135,
    "Poliwrath": 255,
    "Polteageist": 234,
    "Ponyta-Galar": 82,
    "Ponyta": 82,
    "Poochyena": 56,
    "Porygon-Z": 268,
    "Porygon": 79,
    "Porygon2": 180,
    "Primeape": 159,
    "Prinplup": 142,
    "Probopass": 184,
    "Psyduck": 64,
    "Pumpkaboo-Average": 67,
    "Pumpkaboo-Large": 67,
    "Pumpkaboo-Small": 67,
    "Pumpkaboo-Super": 67,
    "Pupitar": 144,
    "Purrloin": 56,
    "Purugly": 158,
    "Pyukumuku": 144,
    "Quagsire": 151,
    "Quilava": 142,
    "Qwilfish": 88,
    "Raboot": 147,
    "Raichu": 218,
    "Ralts": 40,
    "Rampardos": 173,
    "Rapidash-Galar": 175,
    "Rapidash": 175,
    "Raticate": 145,
    "Rattata": 51,
    "Regigigas": 335,
    "Relicanth": 170,
    "Remoraid": 60,
    "Rhydon": 170,
    "Rhyperior": 268,
    "Ribombee": 162,
    "Rillaboom": 265,
    "Riolu": 57,
    "Rockruff": 56,
    "Roggenrola": 56,
    "Rolycoly": 49,
    "Rookidee": 49,
    "Roselia": 140,
    "Roserade": 258,
    "Rotom-Fan": 154,
    "Rotom-Frost": 154,
    "Rotom-Heat": 154,
    "Rotom-Mow": 154,
    "Rotom-Wash": 154,
    "Rotom": 154,
    "Rufflet": 70,
    "Runerigus": 169,
    "Sableye": 133,
    "Salamance": 300,
    "Salandit": 64,
    "Salazzle": 168,
    "Sandaconda": 179,
    "Sandile": 58,
    "Sandshrew": 60,
    "Sandslash": 158,
    "Sandygast": 64,
    "Sawk": 163,
    "Sceptile": 265,
    "Scizor": 175,
    "Scolipede": 243,
    "Scorbunny": 62,
    "Scrafty": 171,
    "Scraggy": 70,
    "Scyther": 100,
    "Seadra": 154,
    "Seaking": 158,
    "Sealeo": 144,
    "Seedot": 44,
    "Seel": 65,
    "Seismitoad": 255,
    "Sharpedo": 161,
    "Shaymin-Land": 300,
    "Shaymin-Sky": 300,
    "Shelgon": 147,
    "Shellder": 61,
    "Shellos": 65,
    "Shieldon": 70,
    "Shiftry": 240,
    "Shiinotic": 142,
    "Shinx": 53,
    "Shroomish": 59,
    "Shuckle": 177,
    "Shuppet": 59,
    "Sigilyph": 172,
    "Silcoon": 72,
    "Silicobra": 63,
    "Silvally": 257,
    "Sinistea": 234,
    "Sirfetch'd": 177,
    "Sizzlipede": 61,
    "Skarmory": 163,
    "Skiploom": 119,
    "Skitty": 52,
    "Skorupi": 66,
    "Skuntank": 168,
    "Skwovet": 55,
    "Slaking": 285,
    "Slakoth": 56,
    "Sliggoo": 158,
    "Slowbro-Galar": 172,
    "Slowbro": 172,
    "Slowking-Galar": 172,
    "Slowking": 172,
    "Slowpoke-Galar": 63,
    "Slowpoke": 63,
    "Slugma": 50,
    "Slurpuff": 168,
    "Smeargle": 88,
    "Sneasel": 86,
    "Snom": 37,
    "Snorlax": 189,
    "Snorunt": 60,
    "Snover": 67,
    "Snubbull": 60,
    "Sobble": 62,
    "Solosis": 58,
    "Solrock": 161,
    "Spearow": 52,
    "Spheal": 58,
    "Spinarak": 50,
    "Spinda": 126,
    "Spiritomb": 170,
    "Spoink": 66,
    "Spritzee": 68,
    "Squirtle": 63,
    "Stantler": 163,
    "Staraptor": 243,
    "Staravia": 119,
    "Starly": 49,
    "Starmie": 182,
    "Staryu": 68,
    "Steelix": 179,
    "Steenee": 102,
    "Stonjourner": 165,
    "Stufful": 68,
    "Stunfisk-Galar": 165,
    "Stunfisk": 165,
    "Stunky": 66,
    "Sudowoodo": 144,
    "Sunflora": 149,
    "Sunkern": 36,
    "Swablu": 62,
    "Swampert": 268,
    "Swellow": 159,
    "Swinub": 50,
    "Swirlix": 68,
    "Swoobat": 149,
    "Sylveon": 184,
    "Tailow": 54,
    "Talonflame": 175,
    "Tangela": 87,
    "Tangrowth": 187,
    "Tauros": 172,
    "Teddiursa": 66,
    "Tentacool": 67,
    "Tentacruel": 180,
    "Thievul": 159,
    "Throh": 163,
    "Thwackey": 147,
    "Timburr": 61,
    "Tirtouga": 71,
    "Togedemaru": 152,
    "Togekiss": 273,
    "Togepi": 49,
    "Togetic": 142,
    "Torchic": 62,
    "Torkoal": 165,
    "Torracat": 147,
    "Torterra": 263,
    "Totodile": 63,
    "Toxapex": 173,
    "Toxel": 48,
    "Toxicroak": 172,
    "Toxtricity": 176,
    "Tranquill": 125,
    "Trapinch": 58,
    "Treecko": 62,
    "Trevenant": 166,
    "Tropius": 161,
    "Trubbish": 66,
    "Trumbeak": 124,
    "Tsareena": 255,
    "Turtonator": 170,
    "Turtwig": 64,
    "Tympole": 59,
    "Type: Null": 107,
    "Typholsion": 267,
    "Tyranitar": 300,
    "Tyrantrum": 182,
    "Tyrogue": 42,
    "Tyrunt": 72,
    "Umbreon": 184,
    "Unfezant": 220,
    "Ursaring": 175,
    "Urshifu-Rapid": 275,
    "Urshifu-Single": 275,
    "Uxie": 290,
    "Vanillish": 138,
    "Vanillite": 61,
    "Vanilluxe": 241,
    "Vaporeon": 184,
    "Venipede": 52,
    "Venusaur": 263,
    "Vespiquen": 166,
    "Vibrava": 119,
    "Vigoroth": 154,
    "Vikavolt": 250,
    "Vileplume": 245,
    "Vullaby": 74,
    "Vulpix": 60,
    "Wailmer": 80,
    "Wailord": 175,
    "Walrein": 265,
    "Wartortle": 142,
    "Weavile": 179,
    "Weedle": 39,
    "Weezing-Galar": 172,
    "Weezing": 172,
    "Whimsicott": 168,
    "Whirlipede": 126,
    "Whiscash": 164,
    "Whismur": 48,
    "Wigglytuff": 218,
    "Wimpod": 46,
    "Wingull": 54,
    "Wishiwashi-School": 217,
    "Wishiwashi": 61,
    "Wobbuffet": 142,
    "Woobat": 65,
    "Wooloo": 122,
    "Wooper": 42,
    "Wormadam-Sandy": 148,
    "Wormadam-Trash": 148,
    "Wormadam": 148, // Plant Cloak
    "Wurmple": 56,
    "Wynaut": 52,
    "Xatu": 165,
    "Yamask-Galar": 61,
    "Yamask": 61,
    "Yamper": 54,
    "Yanma": 78,
    "Yanmega": 180,
    "Yungoos": 51,
    "Zacian": 335,
    "Zamazenta": 335,
    "Zapdos-Galar": 261,
    "Zapdos": 261,
    "Zigzagoon-Galar": 56,
    "Zigzagoon": 56,
    "Zoroark": 179,
    "Zorua": 66,
    "Zubat": 49,
};

let evYields = {
    "Abomasnow": {atk: 1, spAtk: 1},
    "Abra": {spAtk: 1},
    "Aegislash-Blade": {atk: 2, spAtk: 1},
    "Aegislash-Shield": {def: 2, spDef: 1},
    "Aerodactyl": {spd: 2},
    "Aggron": {def: 3},
    "Aipom": {spd: 1},
    "Alakazam": {spAtk: 3},
    "Alcremie": {spDef: 2},
    "Altaria": {spDef: 2},
    "Ambipom": {spd: 2},
    "Ampharos": {spAtk: 3},
    "Anorith": {atk: 1},
    "Appletun": {hp: 2},
    "Applin": {def: 1},
    "Araquanid": {spDef: 2},
    "Arcanine": {atk: 2},
    "Arceus": {hp: 3},
    "Arctovish": {def: 2},
    "Arctozolt": {atk: 2},
    "Armaldo": {atk: 2},
    "Aromatisse": {hp: 2},
    "Aron": {def: 1},
    "Arrokuda": {spd: 1},
    "Articuno-Galar": {def: 3},
    "Articuno": {spDef: 3},
    "Avalugg": {def: 2},
    "Azelf": {atk: 2, spAtk: 1},
    "Azumarill": {hp: 3},
    "Azurill": {hp: 1},
    "Bagon": {atk: 1},
    "Baltoy": {spDef: 1},
    "Banette": {atk: 2},
    "Barbaracle": {atk: 2},
    "Barboach": {hp: 1},
    "Barraskewda": {spd: 2},
    "Bastiodon": {def: 2},
    "Bayleef": {def: 1, spDef: 1},
    "Beartic": {atk: 2},
    "Beautifly": {spAtk: 3},
    "Beldum": {def: 1},
    "Bellossom": {spDef: 3},
    "Bergmite": {def: 1},
    "Bewear": {atk: 2},
    "Bibarel": {atk: 2},
    "Bidoof": {hp: 1},
    "Bisharp": {atk: 2},
    "Blastoise": {spDef: 3},
    "Blaziken": {atk: 3},
    "Blipbug": {spDef: 1},
    "Blissey": {hp: 3},
    "Boldore": {atk: 1, def: 1},
    "Boltund": {spd: 2},
    "Bonsly": {def: 1},
    "Bounsweet":{hp: 1},
    "Braviary": {atk: 2},
    "Breloom": {atk: 2},
    "Bronzong": {def: 1, spDef: 1},
    "Bronzor": {def: 1},
    "Budew": {spAtk: 1},
    "Buizel": {spd: 1},
    "Bulbasaur": {spAtk: 1},
    "Buneary": {spd: 1},
    "Burmy": {spDef: 1},
    "Butterfree": {spAtk: 2, spDef: 1},
    "Cacnea": {spAtk: 1},
    "Cacturne": {atk: 1, spAtk: 1},
    "Candyfloss": {spd: 2},
    "Carkol": {def: 2},
    "Carnivine": {atk: 2},
    "Carvanha": {atk: 1},
    "Cascoon": {def: 2},
    "Caterpie": {hp: 1},
    "Centiskorch": {atk: 2},
    "Chandelure": {spAtk: 3},
    "Chansey": {hp: 2},
    "Charizard": {spAtk: 3},
    "Charjabug": {def: 2},
    "Charmander": {spd: 1},
    "Charmeleon": {spAtk: 1, spd: 1},
    "Chatot": {atk: 1},
    "Cherrim": {spAtk: 2},
    "Cherubi": {spAtk: 1},
    "Chewtle": {atk: 1},
    "Chikorita": {spDef: 1},
    "Chimchar": {spd: 1},
    "Chimecho": {spAtk: 1, spDef: 1},
    "Chinchou": {hp: 1},
    "Chingling": {spAtk: 1},
    "Cinccino": {spd: 2},
    "Cinderace": {spd: 3},
    "Clamperl": {def: 1},
    "Claydol": {spDef: 2},
    "Clefable": {hp: 3},
    "Clefairy": {hp: 2},
    "Cleffa": {spDef: 1},
    "Cloyster": {def: 2},
    "Coalossal": {def: 3},
    "Cofagrigus": {def: 2},
    "Combee": {spd: 1},
    "Combusken": {atk: 1, spAtk: 1},
    "Conkeldurr": {atk: 3},
    "Copperajah": {atk: 2},
    "Corphish": {atk: 1},
    "Corsola-Galar": {spDef: 1},
    "Corsola": {def: 1, spDef: 1},
    "Corviknight": {def: 3},
    "Corvisquire": {spd: 2},
    "Cottonee": {spd: 1},
    "Cradily": {spDef: 2},
    "Cramorant": {spDef: 2},
    "Cranidos": {atk: 1},
    "Crawdaunt": {atk: 2},
    "Cresselia": {spDef: 3},
    "Croagunk": {atk: 1},
    "Crobat": {spd: 3},
    "Croconaw": {atk: 1, def: 1},
    "Crustle": {def: 2},
    "Cubchoo": {atk: 1},
    "Cubone": {def: 1},
    "Cufant": {atk: 1},
    "Cursola": {spAtk: 2},
    "Cutiefly": {spd: 1},
    "Cyndaquil": {spd: 1},
    "Darkrai": {spAtk: 2, spd: 1},
    "Darmanitan-Galar": {atk: 2},
    "Darmanitan": {atk: 2},
    "Darumaka-Galar": {atk: 1},
    "Darumaka": {atk: 1},
    "Delcatty": {hp: 1, spd: 1},
    "Delibird": {spd: 1},
    "Dewgong": {spDef: 2},
    "Dewpider": {spDef: 1},
    "Dhelmise": {atk: 2},
    "Dialga": {spAtk: 3},
    "Diggersby": {hp: 2},
    "Diglett-Alola": {spd: 1},
    "Diglett": {spd: 1},
    "Dodrio": {atk: 2},
    "Doduo": {atk: 1},
    "Donphan": {atk: 1, def: 1},
    "Dottler": {spDef: 2},
    "Doublade": {def: 2},
    "Dracovish": {def: 2},
    "Dracozolt": {atk: 2},
    "Dragapult": {spd: 3},
    "Dragonair": {atk: 2},
    "Dragonite": {atk: 3},
    "Drakloak": {spd: 2},
    "Drampa": {spAtk: 2},
    "Drapion": {def: 2},
    "Dratini": {atk: 1},
    "Drednaw": {atk: 2},
    "Dreepy": {spd: 1},
    "Drifblim": {hp: 2},
    "Drifloon": {hp: 1},
    "Drilbur": {atk: 1},
    "Drizzile": {spAtk: 2},
    "Drowzee": {spDef: 1},
    "Dubwool": {def: 2},
    "Dugtrio-Alola": {atk: 2},
    "Dugtrio": {spd: 2},
    "Dunsparce": {hp: 1},
    "Duosion": {spAtk: 2},
    "Duraludon": {spAtk: 2},
    "Durant": {def: 2},
    "Dusclops": {def: 1, spDef: 1},
    "Dusknoir": {def: 1, spDef: 2},
    "Duskull": {spDef: 1},
    "Dustox": {spDef: 3},
    "Eevee": {spDef: 1},
    "Eiscue": {def: 2},
    "Eldegoss": {spDef: 2},
    "Electabuzz": {spd: 2},
    "Electivire": {atk: 3},
    "Electrike": {spd: 1},
    "Elekid": {spd: 1},
    "Empoleon": {spAtk: 3},
    "Escavalier": {atk: 2},
    "Espeon": {spAtk: 2},
    "Excadrill": {atk: 2},
    "Exeggcute": {def: 1},
    "Exeggutor": {spAtk: 2},
    "Exploud": {hp: 3},
    "Falinks": {atk: 2, spDef: 1},
    "Farfetch'd-Galar": {atk: 1},
    "Farfetch'd": {atk: 1},
    "Fearow": {spd: 2},
    "Feebas": {spd: 1},
    "Feraligatr": {atk: 2, def: 1},
    "Ferroseed": {def: 1},
    "Ferrothorn": {def: 2},
    "Finneon": {spd: 1},
    "Flaaffy": {spAtk: 2},
    "Flapple": {atk: 2},
    "Flareon": {atk: 2},
    "Floatzel": {spd: 2},
    "Flygon": {atk: 1, spd: 2},
    "Frillish": {spDef: 1},
    "Froslass": {spd: 2},
    "Frosmoth": {spAtk: 2},
    "Gabite": {atk: 2},
    "Gallade": {atk: 3},
    "Galvantula": {spd: 2},
    "Garbodor": {atk: 2},
    "Garchomp": {atk: 3},
    "Gardevoir": {spAtk: 3},
    "Gastly": {spAtk: 1},
    "Gastrodon": {hp: 2},
    "Gengar": {spAtk: 3},
    "Geodude": {def: 1},
    "Gible": {atk: 1},
    "Gigalith": {atk: 3},
    "Girafarig": {spAtk: 2},
    "Giratina": {hp: 3},
    "Glaceon": {spAtk: 2},
    "Glalie": {hp: 2},
    "Glameow": {spd: 1},
    "Gligar": {def: 1},
    "Gliscor": {def: 2},
    "Gloom": {spAtk: 2},
    "Golbat": {spd: 2},
    "Goldeen": {atk: 1},
    "Golduck": {spAtk: 2},
    "Golem": {def: 3},
    "Golett": {atk: 1},
    "Golisopod": {def: 2},
    "Golurk": {atk: 2},
    "Goodra": {spDef: 3},
    "Gorebyss": {spAtk: 2},
    "Gossifleur": {spDef: 1},
    "Gothita": {spDef: 1},
    "Gothorita": {spDef: 2},
    "Gourgeist": {def: 2},
    "Granbull": {atk: 2},
    "Grapploct": {atk: 2},
    "Graveler": {def: 2},
    "Greedent": {hp: 2},
    "Grimmsnarl": {atk: 3},
    "Grookey": {atk: 1},
    "Grotle": {atk: 1, def: 1},
    "Grovyle": {spd: 2},
    "Growlithe": {atk: 1},
    "Grubbin": {atk: 1},
    "Grumpig": {spDef: 2},
    "Gurdurr": {atk: 2},
    "Gyarados": {atk: 2},
    "Hakamo-o": {def: 2},
    "Happiny": {hp: 1},
    "Hariyama": {hp: 2},
    "Hatenna": {spAtk: 1},
    "Hatterene": {spAtk: 3},
    "Hattrem": {spAtk: 2},
    "Haunter": {spAtk: 2},
    "Hawlucha": {atk: 2},
    "Haxorus": {atk: 3},
    "Heatmor": {spAtk: 2},
    "Heatran": {spAtk: 3},
    "Heliolisk": {spAtk: 1, spd: 1},
    "Helioptile": {spAtk: 1},
    "Heracross": {atk: 2},
    "Hippopotas": {def: 1},
    "Hippowdon": {def: 2},
    "Hitmonchan": {spDef: 2},
    "Hitmonchan": {spDef: 2},
    "Hitmonlee": {atk: 2},
    "Hitmonlee": {atk: 2},
    "Hitmontop": {spDef: 2},
    "Hitmontop": {spDef: 2},
    "Honchkrow": {atk: 2},
    "Honedge": {def: 1},
    "Hoothoot": {hp: 1},
    "Hoppip": {spDef: 1},
    "Horsea": {spAtk: 1},
    "Houndoom": {spAtk: 2},
    "Houndour": {spAtk: 1},
    "Huntail": {atk: 1, def: 1},
    "Hypno": {spDef: 2},
    "Indeedee-Female": {spDef: 2},
    "Indeedee-Male": {spAtk: 2},
    "Infernape": {atk:1, spAtk: 1, spd: 1},
    "Inkay": {atk: 1},
    "Inteleon": {spd: 3},
    "Ivysaur": {spAtk: 1, spDef: 1},
    "Jangmo-o": {def: 1},
    "Jellicent": {spDef: 2},
    "Jolteon": {spd: 2},
    "Joltik": {spd: 1},
    "Jumpluff": {spd: 3},
    "Jynx": {spAtk: 2},
    "Kabuto": {def: 1},
    "Kabutops": {atk: 2},
    "Kadabra": {spAtk: 2},
    "Kangaskhan": {hp: 2},
    "Kecleon": {spDef: 1},
    "Kingdra": {atk: 1, def: 1, spAtk: 1},
    "Kirlia": {spAtk: 2},
    "Klang": {def: 2},
    "Klink": {def: 1},
    "Klinklang": {def: 3},
    "Koffing": {def: 1},
    "Kommo-o": {def: 3},
    "Krabby": {atk: 1},
    "Kricketot": {def: 1},
    "Kricketune": {atk: 2},
    "Krokorok": {atk: 2},
    "Krookodile": {atk: 3},
    "Kubfu": {atk: 1},
    "Lairon": {def: 2},
    "Lampent": {spAtk: 2},
    "Lanturn": {hp: 2},
    "Lapras": {hp: 2},
    "Larvitar": {atk: 1},
    "Leafeon": {def: 2},
    "Lickilicky": {hp: 3},
    "Lickitung": {hp: 2},
    "Liepard": {spd: 2},
    "Lileep": {spDef: 1},
    "Linoone-Galar": {spd: 2},
    "Linoone": {spd: 2},
    "Litwick": {spAtk: 1},
    "Lombre": {spDef: 2},
    "Lopunny": {spd: 2},
    "Lotad": {spDef: 1},
    "Loudred": {hp: 2},
    "Lucario": {atk: 1, spAtk: 1},
    "Ludicolo": {spDef: 3},
    "Lumineon": {spd: 2},
    "Lunatone": {spAtk: 2},
    "Luvdisc": {spd: 1},
    "Luxio": {atk: 2},
    "Luxray": {atk: 3},
    "Lycanroc-Dusk": {atk: 2},
    "Lycanroc-Midnight": {atk: 2},
    "Lycanroc": {atk: 2},
    "Machamp": {atk: 3},
    "Machoke": {atk: 2},
    "Machop": {atk: 1},
    "Magby": {spd: 1},
    "Magcargo": {def: 2},
    "Magikarp": {spd: 1},
    "Magmar": {spAtk: 2},
    "Magmortar": {spAtk: 3},
    "Magnemite": {spAtk: 1},
    "Magneton": {spAtk: 2},
    "Magnezone": {spAtk: 3},
    "Makuhita": {hp: 1},
    "Malamar": {atk: 2},
    "Mamoswine": {atk: 3},
    "Manaphy": {hp: 3},
    "Mandibuzz": {spAtk: 2},
    "Manectric": {spd: 2},
    "Mankey": {atk: 1},
    "Mantine": {spDef: 2},
    "Mantyke": {spDef: 1},
    "Maractus": {spAtk: 2},
    "Mareanie": {def: 1},
    "Mareep": {spAtk: 1},
    "Marill": {hp: 2},
    "Marowak": {def: 2},
    "Marshtomp": {atk: 2},
    "Mawile": {atk: 1, def: 1},
    "Medicham": {spd: 2},
    "Meditite": {spd: 1},
    "Meganium": {def: 1, spDef: 2},
    "Meowth-Alola": {spd: 1},
    "Meowth-Galar": {atk: 1},
    "Meowth": {spd: 1},
    "Mesprit": {atk: 1, spAtk: 1, spDef: 1},
    "Metagross": {def: 3},
    "Metang": {def: 2},
    "Metapod": {def: 2},
    "Mienfoo": {atk: 1},
    "Mienshao": {atk: 2},
    "Mightyena": {atk: 2},
    "Milcery": {spDef: 1},
    "Milotic": {spDef: 2},
    "Miltank": {def: 2},
    "Mime Jr.": {spDef: 1},
    "Mimikyu": {spDef: 2},
    "Minccino": {spd: 1},
    "Misdreavus": {spDef: 1},
    "Mismagius": {spAtk: 1, spDef: 1},
    "Moltres-Galar": {spDef: 3},
    "Moltres": {spAtk: 3},
    "Monferno": {spAtk: 1, spd: 1},
    "Morelull": {spDef: 1},
    "Morgrem": {spAtk: 2},
    "Morpeko": {spd: 2},
    "Mothim": {atk: 1, spAtk: 1},
    "Mr. Mime-Galar": {spd: 2},
    "Mr. Mime": {spDef: 2},
    "Mr. Rime": {spAtk: 3},
    "Mudbray": {atk: 1},
    "Mudkip": {atk: 1},
    "Mudsdale": {atk: 2},
    "Munchlax": {hp: 1},
    "Murkrow": {spd: 1},
    "Natu": {spAtk: 1},
    "Nickit": {spDef: 1},
    "Ninetales": {spDef: 1, spd: 1},
    "Ninjask": {spd: 2},
    "Noctowl": {hp: 2},
    "Noibat": {spd: 1},
    "Noivern": {spd: 2},
    "Nosepass": {def: 1},
    "Nuzleaf": {atk: 2},
    "Obstagoon": {def: 3},
    "Octillery": {atk: 1, spAtk: 1},
    "Oddish": {spAtk: 1},
    "Omanyte": {def: 1},
    "Omastar": {def: 2},
    "Onix": {def: 1},
    "Oranguru": {spDef: 2},
    "Orbeetle": {spDef: 3},
    "Pachirisu": {spd: 1},
    "Palkia": {spAtk: 3},
    "Pancham": {atk: 1},
    "Pangoro": {atk: 2},
    "Passimian": {atk: 2},
    "Pawniard": {atk: 1},
    "Pelipper": {def: 2},
    "Perrserker": {atk: 2},
    "Phanpy": {hp: 1},
    "Phantump": {atk: 1},
    "Phione": {hp: 1},
    "Pichu": {spd: 1},
    "Pidove": {atk: 1},
    "Pikachu": {spd: 2},
    "Piloswine": {hp: 1, atk: 1},
    "Pincurchin": {atk: 2},
    "Pinsir": {atk: 2},
    "Piplup": {spAtk: 1},
    "Politoed": {def: 3},
    "Poliwag": {spd: 1},
    "Poliwhirl": {spDef: 3},
    "Poliwrath": {spd: 2},
    "Polteageist": {spAtk: 2},
    "Ponyta-Galar": {spd: 1},
    "Ponyta": {spd: 1},
    "Poochyena": {atk: 1},
    "Porygon-Z": {spAtk: 3},
    "Porygon": {spAtk: 1},
    "Porygon2": {spAtk: 2},
    "Primeape": {atk: 2},
    "Prinplup": {spAtk: 2},
    "Probopass": {def: 1, spDef: 2},
    "Psyduck": {spAtk: 1},
    "Pumpkaboo-Average": {def: 1},
    "Pumpkaboo-Large": {def: 1},
    "Pumpkaboo-Small": {def: 1},
    "Pumpkaboo-Super": {def: 1},
    "Pupitar": {atk: 2},
    "Purrloin": {spd: 1},
    "Purugly": {spd: 2},
    "Pyukumuku": {spDef: 2},
    "Quagsire": {hp: 2},
    "Quilava": {spAtk: 1, spd: 1},
    "Qwilfish": {atk: 1},
    "Raboot": {spd: 2},
    "Raichu": {spd: 3},
    "Ralts": {spAtk: 1},
    "Rampardos": {atk: 2},
    "Rapidash-Galar": {spd: 2},
    "Rapidash": {spd: 2},
    "Raticate": {spd: 2},
    "Rattata": {spd: 1},
    "Regigigas": {atk: 3},
    "Relicanth": {hp: 1, def: 1},
    "Remoraid": {spAtk: 1},
    "Rhydon": {atk: 2},
    "Rhyperior": {atk: 3},
    "Ribombee": {spd: 2},
    "Rillaboom": {atk: 3},
    "Riolu": {atk: 1},
    "Rockruff": {atk: 1},
    "Roggenrola": {def: 1},
    "Rolycoly": {def: 1},
    "Rookidee": {spd: 1},
    "Roselia": {spAtk: 2},
    "Roserade": {spAtk: 3},
    "Rotom-Fan": {spAtk: 1, spd: 1},
    "Rotom-Frost": {spAtk: 1, spd: 1},
    "Rotom-Heat": {spAtk: 1, spd: 1},
    "Rotom-Mow": {spAtk: 1, spd: 1},
    "Rotom-Wash": {spAtk: 1, spd: 1},
    "Rotom": {spAtk: 1, spd: 1},
    "Rufflet": {atk: 1},
    "Runerigus": {def: 2},
    "Sableye": {atk: 1, def: 1},
    "Salamance": {atk: 3},
    "Salandit": {spd: 1},
    "Salazzle": {spd: 2},
    "Sandaconda": {def: 2},
    "Sandile": {atk: 1},
    "Sandshrew": {def: 1},
    "Sandslash": {def: 2},
    "Sawk": {atk: 2},
    "Sceptile": {spd: 3},
    "Scizor": {atk: 2},
    "Scolipede": {def: 3},
    "Scorbunny": {spd: 1},
    "Scrafty": {def: 1, spDef: 1},
    "Scraggy": {atk: 1},
    "Scyther": {atk: 1},
    "Seadra": {def: 1, spAtk: 1},
    "Seaking": {atk: 2},
    "Sealeo": {hp: 2},
    "Seedot": {atk: 1},
    "Seel": {spDef: 1},
    "Seismitoad": {hp: 3},
    "Sharpedo": {atk: 2},
    "Shaymin-Land": {hp: 3},
    "Shaymin-Sky": {spd: 3},
    "Shelgon": {def: 2},
    "Shellder": {def: 1},
    "Shellos": {hp: 1},
    "Shieldon": {def: 1},
    "Shiftry": {atk: 3},
    "Shiinotic": {spDef: 2},
    "Shinx": {atk: 1},
    "Shroomish": {hp: 1},
    "Shuckle": {def: 1, spDef: 1},
    "Shuppet": {atk: 1},
    "Sigilyph": {spAtk: 2},
    "Silcoon": {def: 2},
    "Silicobra": {def: 1},
    "Sinistea": {spAtk: 1},
    "Sirfetch'd": {atk: 2},
    "Sizzlipede": {atk: 1},
    "Skarmory": {def: 2},
    "Skiploom": {spd: 2},
    "Skitty": {spd: 1},
    "Skorupi": {def: 1},
    "Skuntank": {hp: 2},
    "Skwovet": {hp: 1},
    "Slaking": {hp: 3},
    "Slakoth": {hp: 1},
    "Sliggoo": {spDef: 2},
    "Slowbro-Galar": {def: 2},
    "Slowbro": {def: 2},
    "Slowking-Galar": {spDef: 2},
    "Slowking": {spDef: 2},
    "Slowpoke-Galar": {hp: 1},
    "Slowpoke": {hp: 1},
    "Slugma": {spAtk: 1},
    "Slurpuff": {def: 2},
    "Sneasel": {spd: 1},
    "Snom": {spAtk: 1},
    "Snorlax": {hp: 2},
    "Snorunt": {hp: 1},
    "Snover": {atk: 1},
    "Snubbull": {atk: 1},
    "Sobble": {spDef: 1, spd: 1},
    "Solosis": {spAtk: 1},
    "Solrock": {atk: 2},
    "Spearow": {spd: 1},
    "Spheal": {hp: 1},
    "Spinda": {spAtk: 1},
    "Spiritomb": {def: 1, spDef: 1},
    "Spoink": {spDef: 1},
    "Spritzee": {hp: 1},
    "Squirtle": {def: 1},
    "Stantler": {atk: 1},
    "Staraptor": {atk: 3},
    "Staravia": {spd: 2},
    "Starly": {spd: 1},
    "Starmie": {spd: 2},
    "Staryu": {spd: 1},
    "Steelix": {def: 2},
    "Steenee": {spd: 2},
    "Stonjourner": {def: 2},
    "Stufful": {atk: 1},
    "Stunfisk-Galar": {hp: 2},
    "Stunfisk": {hp: 2},
    "Stunky": {spd: 1},
    "Sudowoodo": {def: 2},
    "Sunflora": {spAtk: 2},
    "Sunkern": {spAtk: 1},
    "Swablu": {spDef: 1},
    "Swampert": {atk: 3},
    "Swellow": {spd: 2},
    "Swinub": {atk: 1},
    "Swirlix": {def: 1},
    "Swoobat": {spd: 2},
    "Sylveon": {spDef: 2},
    "Tailow": {spd: 1},
    "Tangela": {def: 1},
    "Tangrowth": {def: 2},
    "Tauros": {atk: 1, spd: 1},
    "Teddiursa": {atk: 1},
    "Tentacool": {spDef: 1},
    "Tentacruel": {spDef: 2},
    "Thievul": {spDef: 2},
    "Throh": {hp: 2},
    "Thwackey": {atk: 2},
    "Timburr": {atk: 1},
    "Togedemaru": {atk: 2},
    "Togekiss": {spAtk: 2, spDef: 1},
    "Togepi": {spDef: 1},
    "Togetic": {spDef: 2},
    "Torchic": {spAtk: 1},
    "Torkoal": {def: 2},
    "Torterra": {atk: 2, def: 1},
    "Totodile": {atk: 1},
    "Toxapex": {def: 2},
    "Toxel": {spAtk: 1},
    "Toxicroak": {atk: 2},
    "Toxtricity": {spAtk: 2},
    "Tranquill": {atk: 2},
    "Trapinch": {atk: 1},
    "Treecko": {spd: 1},
    "Trevenant": {atk: 2},
    "Tropius": {hp: 2},
    "Tsareena": {atk: 3},
    "Turtonator": {def: 2},
    "Turtwig": {atk: 1},
    "Tympole": {spd: 1},
    "Typholsion": {spAtk: 3},
    "Tyranitar": {atk: 3},
    "Tyrantrum": {atk: 2},
    "Tyrogue": {atk: 1},
    "Tyrunt": {atk: 1},
    "Umbreon": {spDef: 2},
    "Unfezant": {atk: 3},
    "Ursaring": {atk: 2},
    "Urshifu-Rapid": {atk: 3},
    "Urshifu-Single": {atk: 3},
    "Uxie": {def: 2, spDef: 1},
    "Vanillish": {spAtk: 2},
    "Vanillite": {spAtk: 1},
    "Vanilluxe": {spAtk: 3},
    "Vaporeon": {hp: 2},
    "Venipede": {def: 1},
    "Venusaur": {spAtk: 2, spDef: 1},
    "Vespiquen": {def: 1, spDef: 1},
    "Vibrava": {atk: 1, spd: 1},
    "Vigoroth": {spd: 2},
    "Vikavolt": {spAtk: 3},
    "Vileplume": {spAtk: 3},
    "Vullaby": {def: 1},
    "Vulpix": {spd: 1},
    "Wailmer": {hp: 1},
    "Wailord": {hp: 2},
    "Walrein": {hp: 3},
    "Wartortle": {def: 1, spDef: 1},
    "Weavile": {atk: 1, spd: 1},
    "Weezing-Galar": {def: 2},
    "Weezing": {def: 2},
    "Whimsicott": {spd: 2},
    "Whirlipede": {def: 2},
    "Whiscash": {hp: 2},
    "Whismur": {hp: 1},
    "Wingull": {spd: 1},
    "Wishiwashi-School": {hp: 1},
    "Wishiwashi": {hp: 1},
    "Wobbuffet": {hp: 2},
    "Woobat": {spd: 1},
    "Wooloo": {def: 1},
    "Wooper": {hp: 1},
    "Wormadam-Sandy": {def: 2},
    "Wormadam-Trash": {def: 1, spDef: 1},
    "Wormadam": {spDef: 2}, // Plant Cloak
    "Wurmple": {hp: 1},
    "Wynaut": {hp: 1},
    "Xatu": {spAtk: 1, spd: 1},
    "Yamask-Galar": {def: 1},
    "Yamask": {def: 1},
    "Yamper": {hp: 1},
    "Yanma": {spd: 1},
    "Yanmega": {atk: 2},
    "Zacian": {spd: 3},
    "Zamazenta": {spd: 3},
    "Zapdos-Galar": {atk: 3},
    "Zapdos": {spAtk: 3},
    "Zigzagoon-Galar": {spd: 1},
    "Zigzagoon": {spd: 1},
    "Zoroark": {spAtk: 2},
    "Zorua": {spAtk: 1},
    "Zubat": {spd: 1},
};

processActions(route);

function computeExperienceForLevel(level, curve) {
    return requiredExperience[curve][level - 1];
}

function gamefreakSqrt(n) {
    let actualSqrt = Math.sqrt(n);
    let lowerBound = Math.floor(actualSqrt);
    if (lowerBound * lowerBound === n) {
        return lowerBound * 4096;
    }

    let bestCoeff = 0;
    let bestDistance = actualSqrt - lowerBound;
    for (let i = 1; i <= 4096; i++) {
        let check = lowerBound + i / 4096;
        let distance = Math.abs(actualSqrt - check);
        if (distance < bestDistance) {
            bestCoeff = i;
            bestDistance = distance;
        }
    }
    return lowerBound * 4096 + bestCoeff;
}

function getExperienceForKill(foeName, foeLevel, level, luckyEgg, affection, rotoExp, expShare, tradeExp, evolutionDue) {
    let expYield = experienceYields[foeName];

    if (typeof expYield === "undefined") {
        throw new Error("Unknown Pokémon: " + foeName);
    }

    let x = foeLevel + foeLevel + 10;
    let y = foeLevel + level + 10;

    let x2 = x * x;
    let y2 = y * y;

    let z = Math.floor(expYield * foeLevel / 5);
    if (expShare) {
        z = Math.floor(z / 2);
    }

    let exp = Math.floor(((gamefreakSqrt(x) * x2) * z) / ((gamefreakSqrt(y) * y2))) + 1;

    // console.log(exp);

    if (tradeExp) {
        exp = Math.floor(exp * 1.5);
    }

    if (luckyEgg) {
        exp = Math.floor(exp * 1.5);
    }

    if (affection) {
        exp = exp * 4915;
        exp = Math.round(exp / 4096)
    }

    if (evolutionDue) {
        exp = exp * 4915;
        exp = Math.round(exp / 4096)
    }

    if (rotoExp) {
        exp = exp * 150;
        exp = Math.floor(exp / 100);
    }

    return Math.floor(exp);
}

function processActions(actions) {

    if (!actions || !actions[0] || actions[0].type !== "init") {
        throw new Error("First action must be init");
    }

    let affectionBoost = false;
    let luckyEgg = false;
    let rotoExp = false;
    let tradeExp = !!actions[0].tradeExp;

    let pokemonName = actions[0].name;
    let currentLevel = actions[0].level;
    let curve = actions[0].curve;
    let stage = 1;
    let evolution1 = actions[0].evolution1;
    let evolution2 = actions[0].evolution2;
    let evolution1Name = actions[0].evolution1Name;
    let evolution2Name = actions[0].evolution2Name;
    let currentExp = computeExperienceForLevel(currentLevel, curve);
    let currentHpEvs = 0;
    let currentAtkEvs = 0;
    let currentDefEvs = 0;
    let currentSpAtkEvs = 0;
    let currentSpDefEvs = 0;
    let currentSpdEvs = 0;
    let currentItem = "";
    let ability = actions[0].ability;
    let nature = actions[0].nature;
    let Ivs = actions[0].Ivs;
    let moves = actions[0].moves;

    function printDumpFormat() {
        if (typeof nature === "undefined") {
            nature = "(None)"
        }
        if (typeof ability === "undefined") {
            ability = "(other)"
        }
        if (typeof currentItem === "undefined") {
            currentItem = "(None)"
        }
        if (typeof Ivs === "undefined") {
            Ivs = "0/0/0/0/0/0"
        }
        if (typeof moves === "undefined") {
            moves = "(No Move)/(No Move)/(No Move)/(No Move)"
        }
        if (currentItem) {
            console.log(`${pokemonName} (Lv. ${currentLevel}) @${currentItem} (Ability: ${ability}) (Nature: ${nature}) (Moves: ${moves}) IVs: ${Ivs} EVs: ${currentHpEvs}/${currentAtkEvs}/${currentDefEvs}/${currentSpAtkEvs}/${currentSpDefEvs}/${currentSpdEvs}`);
        } else {
            console.log(`${pokemonName} (Lv. ${currentLevel}) (Ability: ${ability}) (Nature: ${nature}) (Moves: ${moves}) IVs: ${Ivs} EVs: ${currentHpEvs}/${currentAtkEvs}/${currentDefEvs}/${currentSpAtkEvs}/${currentSpDefEvs}/${currentSpdEvs}`);
        }
    }

    function printIvCalcFormat() {
        if (rangerFormat) {
            console.log(`${currentLevel} -> ${currentHpEvs}, ${currentAtkEvs}, ${currentDefEvs}, ${currentSpAtkEvs}, ${currentSpDefEvs}, ${currentSpdEvs}`);
        } else {
            console.log(`${currentLevel}\t${currentHpEvs}\t${currentAtkEvs}\t${currentDefEvs}\t${currentSpAtkEvs}\t${currentSpDefEvs}\t${currentSpdEvs}`);
        }
    }

    for (let i = 1; i < actions.length; ++i) {
        let action = actions[i];
        if (!action) {
            continue;
        }
        switch (action.type) {
            case "kill":
            case "catch":
                let evolutionDue = false;
                if ((stage === 1 && evolution1 && evolution1 <= currentLevel) || (stage <= 2 && evolution2 && evolution2 <= currentLevel)) {
                    evolutionDue = true;
                    if (!EVsOnly) {
                        console.log("[LEVEL BONUS]");
                    }
                }

                let receivedExp = action.overrideExperience;
                if (typeof receivedExp === "undefined") {
                    receivedExp = getExperienceForKill(action.pokemon, action.level, currentLevel, luckyEgg, affectionBoost, rotoExp, !!action.expShare, tradeExp, evolutionDue);
                }
                if (!EVsOnly) {
                    if (action.type === "kill") {
                        // console.log(`[KILL]: Got ${receivedExp} Exp for killing ${action.pokemon} (Lv. ${action.level})`);
                        if (typeof action.nature === "undefined") {
                            action.nature = "(None)"
                        }
                        if (typeof action.ability === "undefined") {
                            action.ability = "(other)"
                        }
                        if (typeof action.item === "undefined") {
                            action.item = "(None)"
                        }
                        if (typeof action.Ivs === "undefined") {
                            action.Ivs = "0/0/0/0/0/0"
                        }
                        if (typeof action.Evs === "undefined") {
                            action.Evs = "0/0/0/0/0/0"
                        }
                        if (typeof action.moves === "undefined") {
                            action.moves = "(No Move)/(No Move)/(No Move)/(No Move)"
                        }
                        console.log(`[KILL]: Got ${receivedExp} Exp for killing ${action.pokemon} (Lv. ${action.level}) @${action.item} (Ability: ${action.ability}) (Nature: ${action.nature}) (Moves: ${action.moves}) IVs: ${action.Ivs} EVs: ${action.Evs}`)
                    } else {
                        console.log(`[CATCH]: Got ${receivedExp} Exp for catching Lv. ${action.level} ${action.pokemon}`);
                    }
                }

                if (evYields[action.pokemon]) {
                    for (let stat in evYields[action.pokemon]) {
                        if (evYields[action.pokemon].hasOwnProperty(stat)) {
                            switch (stat) {
                                case "hp": currentHpEvs += evYields[action.pokemon][stat]; break;
                                case "atk": currentAtkEvs += evYields[action.pokemon][stat]; break;
                                case "def": currentDefEvs += evYields[action.pokemon][stat]; break;
                                case "spAtk": currentSpAtkEvs += evYields[action.pokemon][stat]; break;
                                case "spDef": currentSpDefEvs += evYields[action.pokemon][stat]; break;
                                case "spd": currentSpdEvs += evYields[action.pokemon][stat]; break;
                            }
                        }
                    }
                    if (!EVsOnly) {
                        console.log("EV yield: " + JSON.stringify(evYields[action.pokemon]));
                    }
                } else {
                    console.warn("Could not find EV Yield for: " + action.pokemon);
                }

                currentExp += receivedExp;

                if (!action.skipLevel) {
                    while (currentLevel < 100 && computeExperienceForLevel(currentLevel + 1, curve) <= currentExp) {
                        ++currentLevel;
                        if (!EVsOnly) {
                            console.log(`[LEVELUP] Now level ${currentLevel}`);
                        }
                        printIvCalcFormat();
                    }
                }
                if (!EVsOnly) {
                    printDumpFormat();
                }

                break;
            case "evolve":
                ++stage;
                if (stage === 2) {
                    pokemonName = evolution1Name;
                } else if (stage === 3) {
                    pokemonName = evolution2Name;
                }
                if (!EVsOnly) {
                    console.log(`[EVOLUTION]`);
                    printDumpFormat();
                }
                break;

            case "affection-boost":
                affectionBoost = !!action.value;
                if (!EVsOnly) {
                    console.log(`[AFFECTION BOOST] ${affectionBoost}`);
                }
                break;

            case "roto-exp":
                rotoExp = !!action.value;
                if (!EVsOnly) {
                    console.log(`[ROTO EXP] ${rotoExp}`);
                }
                break;

            case "rare-candy":
                currentExp = computeExperienceForLevel(currentLevel + 1, curve);
                ++currentLevel;
                if (!EVsOnly) {
                    console.log(`[RARE CANDY] Now level ${currentLevel}`);
                }
                printIvCalcFormat();
                if (!EVsOnly) {
                    printDumpFormat();
                }
                break;

            case "exp-candy":
                currentExp += action.experience;

                if (!EVsOnly) {
                    console.log(`[EXP CANDY] Added ${action.experience} Exp`);
                }

                while (currentLevel < 100 && computeExperienceForLevel(currentLevel + 1, curve) <= currentExp) {
                    ++currentLevel;
                    if (!EVsOnly) {
                        console.log(`[LEVELUP] Now level ${currentLevel}`);
                    }
                    printIvCalcFormat();
                }
                if (!EVsOnly) {
                    printDumpFormat();
                }
                break;

            case "item-equip":
                if (currentItem === "Lucky Egg" && action.item !== "Lucky Egg") {
                    luckyEgg = false;
                }

                currentItem = action.item || "";
                if (!EVsOnly) {
                    console.log("[ITEM EQUIP] " + (currentItem || "(none)"));
                }

                if (currentItem === "Lucky Egg") {
                    luckyEgg = true;
                }
                break;

            case "ev-gain":
                currentHpEvs+= action.hp || 0;
                currentAtkEvs+= action.atk || 0;
                currentDefEvs+= action.def || 0;
                currentSpAtkEvs+= action.spAtk || 0;
                currentSpDefEvs+= action.spDef || 0;
                currentSpdEvs+= action.spd || 0;
                printIvCalcFormat();
                if (!EVsOnly) {
                    printDumpFormat();
                }
                break;

            case "change-moves":
                moves = action.moves || "";
                if (!EVsOnly) {
                    console.log("[CURRENT MOVESET CHANGED] " + (moves || "(none)"));
                }
        }

        let addendum = "";
        if (currentLevel < 100) {
            let currentLevelExp = computeExperienceForLevel(currentLevel, curve);
            let nextLevelExp = computeExperienceForLevel(currentLevel + 1, curve);

            let percentage = (currentExp - currentLevelExp) / (nextLevelExp - currentLevelExp);
            addendum = " (" + (percentage * 100).toFixed(2) + "%)";
        }
        if (!EVsOnly) {
            console.log("Current Exp: " + currentExp + addendum);
            console.log();
        }
    }

    return currentExp;
}