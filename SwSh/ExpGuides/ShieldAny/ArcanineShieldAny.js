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
    "7": [{ type: "init", level: 7, curve: "Slow", name: "Arcanine", item: "Charcoal", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "8": [{ type: "init", level: 8, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "9": [{ type: "init", level: 9, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "10": [{ type: "init", level: 10, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "8N": [{ type: "init", level: 8, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "9N": [{ type: "init", level: 9, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
    "10N": [{ type: "init", level: 10, curve: "Slow", name: "Arcanine", nature: "Hardy", ability: "Flash Fire", moves: "Flamethrower/Burn Up/Reversal/Extreme Speed", Ivs: "0/0/0/0/0/0" }],
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

let selectedRoute = "10";

/* Output is now generated so that you can copy the opponent pokemon directly from the output and place it into wartab's damage calc: https://wartab.best/damage-calc/
i.e. copy the Starly (Lv. 5) @(None) (Ability: Keen Eye) (Nature: Jolly) (Moves: Tackle/Growl/Quick Attack/(No Move)) IVs: 0/0/0/0/0/0 EVs: 0/0/0/0/0/0 from
[KILL]: Got 50 Exp for killing Starly (Lv. 5) @(None) (Ability: Keen Eye) (Nature: Jolly) (Moves: Tackle/Growl/Quick Attack/(No Move)) IVs: 0/0/0/0/0/0 EVs: 0/0/0/0/0/0
*/

let route = [
    ...initialRoutes[selectedRoute],
    
    // Team Yell Hotel
    { type: "kill", pokemon: "Zigzagoon-Galar", level: 9, nature: "Brave", moves: "Tackle/Lick/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Nickit", level: 9, nature: "Serious", moves: "Quick Attack/Tail Whip/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Zigzagoon-Galar", level: 9, nature: "Naughty", moves: "Leer/Lick/Snarl/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Nickit", level: 9, nature: "Serious", moves: "Quick Attack/Tail Whip/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },

    { type: "item-equip", item: "Charcoal" },

    // Hop 3
    { type: "kill", pokemon: "Wooloo", level: 11, nature: "Hasty", ability: "Run Away", moves: "Tackle/Growl/(No Move)/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Grookey", level: 14, ability: "Overgrow", moves: "Scratch/Growl/Branch Poke/Taunt", Ivs: "15/15/15/25/25/20" },
    { type: "kill", pokemon: "Rookidee", level: 12, nature: "Jolly", ability: "Unnerve", moves: "Peck/Leer/(No Move)/(No Move)", Ivs: "15/15/15/15/15/15" },

    // Required Route 3 and Galar Mine fights
    { type: "kill", pokemon: "Sizzlipede", level: 13, nature: "Bashful", ability: "Flash Fire", moves: "Bite/Ember/Wrap/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Dottler", level: 14, nature: "Adamant", moves: "Confusion/Struggle Bug/Light Screen/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Diglett", level: 14, nature: "Serious", moves: "Scratch/Growl/Astonish/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Drilbur", level: 15, nature: "Modest", moves: "Scratch/Rapid Spin/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },

    // Bede 1
    { type: "kill", pokemon: "Solosis", level: 13, nature: "Modest", ability: "Magic Guard", moves: "Endeavor/Confusion/(No Move)/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Gothita", level: 15, nature: "Bold", ability: "Competitive", moves: "Psybeam/Tickle/Pound/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Hatenna", level: 16, nature: "Modest", ability: "Anticipation", moves: "Confusion/Round/Disarming Voice/(No Move)", Ivs: "15/15/15/15/15/15" },

    // Milo's Gym
    { type: "kill", pokemon: "Gossifleur", level: 16, nature: "Impish", moves: "Leafage/Rapid Spin/(No Move)/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Gossifleur", level: 19, nature: "Serious", moves: "Magical Leaf/Round/Rapid Spin/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Eldegoss", level: 20, nature: "Relaxed", moves: "Magical Leaf/Leafage/Round/(No Move)", Ivs: "20/20/20/20/20/20", Evs: "620/0/0/0/0/0" },

    // Team Yell Route 5
    { type: "kill", pokemon: "Zigzagoon-Galar", level: 17, nature: "Bashful", moves: "Tackle/Lick/Snarl/Baby-Doll Eyes", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Thievul", level: 18, nature: "Docile", moves: "Quick Attack/Snarl/Tail Whip/Beat Up", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Sableye", level: 18, nature: "Relaxed", moves: "Disable/Astonish/Scratch/(No Move)", Ivs: "0/0/0/0/0/0" },

    // Hop 4
    { type: "kill", pokemon: "Wooloo", level: 18, nature: "Hasty", ability: "Run Away", moves: "Tackle/Growl/Defense Curl/Double Kick", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Corvisquire", level: 19, nature: "Jolly", ability: "Unnerve", moves: "Leer/Peck/Fury Attack/Pluck", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Thwackey", level: 21, ability: "Overgrow", moves: "Round/Razor Leaf/Double Hit/Screech", Ivs: "15/15/15/25/25/20" },

    // Nessa's Gym
    { type: "kill", pokemon: "Tympole", level: 21, nature: "Timid", moves: "Echoed Voice/Growl/Mud Shot/Round", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Krabby", level: 20, nature: "Jolly", ability: "Hyper Cutter", moves: "Whirlpool/Harden/(No Move)/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Corphish", level: 20, nature: "Timid", ability: "Hyper Cutter", moves: "Whirlpool/Leer/Bubble Beam/(No Move)", Ivs: "5/5/5/5/5/5" },
    ["8N", "9N", "10N"].indexOf(selectedRoute) !== -1 ? { type: "rare-candy" } : null, // Early Nessa Candies
    ["8N", "9N", "10N"].indexOf(selectedRoute) !== -1 ? { type: "rare-candy" } : null, 
    { type: "kill", pokemon: "Goldeen", level: 22, nature: "Timid", ability: "Swift Swim", moves: "Water Pulse/Whirlpool/Horn Attack/Agility", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Arrokuda", level: 23, nature: "Calm", ability: "Swift Swim", moves: "Aqua Jet/Bite/Whirlpool/Fury Attack", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Drednaw", level: 24, nature: "Modest", ability: "Swift Swim", moves: "Razor Shell/Water Gun/Bite/Headbutt", Ivs: "20/20/20/20/20/20", Evs: "820/0/0/0/0/0" },

    // Bede 2
    { type: "kill", pokemon: "Solosis", level: 21, nature: "Modest", ability: "Magic Guard", moves: "Psyshock/Psybeam/Endeavor/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Gothita", level: 22, nature: "Bold", ability: "Competitive", moves: "Psyshock/Rock Tomb/Psybeam/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Hatenna", level: 23, nature: "Modest", ability: "Anticipation", moves: "Psybeam/Disarming Voice/(No Move)/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Ponyta-Galar", level: 22, nature: "Adamant", ability: "Pastel Veil", moves: "Confusion/Fairy Wind/(No Move)/(No Move)", Ivs: "15/15/15/15/15/15" },

    { type: "item-equip", item: "Silk Scarf" },
    ["9", "10"].indexOf(selectedRoute) !== -1 ? { type: "rare-candy" } : null,

    // Galar Mine 2
    { type: "kill", pokemon: "Carkol", level: 21, nature: "Serious", ability: "Steam Engine", moves: "Rapid Spin/Smack Down/Ancient Power/Flame Charge", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Thievul", level: 21, nature: "Docile", moves: "Snarl/Nasty Plot/Tail Whip/Quick Attack", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Liepard", level: 22, nature: "Hasty", moves: "Torment/Fury Swipes/Sand Attack/Growl", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Linoone-Galar", level: 22, nature: "Jolly", moves: "Night Slash/Baby-Doll Eyes/Sand Attack/Lick", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Pancham", level: 21, nature: "Adamant", moves: "Low Sweep/Circle Throw/Work Up/Arm Thrust", Ivs: "0/0/0/0/0/0" },

    // Marnie 1
    { type: "kill", pokemon: "Croagunk", level: 24, nature: "Adamant", ability: "Dry Skin", moves: "Poison Sting/Venoshock/Revenge/Sucker Punch", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Scraggy", level: 24, nature: "Adamant", ability: "Shed Skin", moves: "Beat Up/Headbutt/Low Kick/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Morpeko", level: 26, nature: "Jolly", ability: "Hunger Switch", moves: "Bite/Quick Attack/Thunder Shock/(No Move)", Ivs: "15/15/15/15/15/15" },

    ["7", "8"].indexOf(selectedRoute) !== -1 ? { type: "rare-candy" } : null,

    // Kabu's Gym
    { type: "catch", pokemon: "Vulpix", level: 24 },
    { type: "catch", pokemon: "Sizzlipede", level: 25 },
    { type: "catch", pokemon: "Vulpix", level: 24 },
    { type: "kill", pokemon: "Ninetales", level: 25, nature: "Bold", ability: "Flash Fire", moves: "Will-O-Wisp/Fire Spin/Quick Attack/Ember", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Arcanine", level: 25, nature: "Timid", ability: "Intimidate", moves: "Will-O-Wisp/Flame Wheel/Bite/Agility", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Centiskorch", level: 27, nature: "Impish", ability: "Flash Fire", moves: "Flame Wheel/Coil/Bug Bite/Smokescreen", Ivs: "20/20/20/20/20/20", Evs: "840/0/0/0/0/0" },

    { type: "item-equip", item: "Charcoal" },
    { type: "change-moves", moves: "Flamethrower/Burn Up/Flare Blitz/Extreme Speed" },

    // Route 6 Required Fights
    { type: "kill", pokemon: "Stunky", level: 29, ability: "Aftermath", moves: "Bite/Feint/Poison Gas/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Linoone-Galar", level: 30, nature: "Serious", moves: "Hone Claws/Take Down/Night Slash/Baby-Doll Eyes", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Liepard", level: 30, nature: "Jolly", moves: "Fake Out/Fury Swipes/Assurance/Sand Attack", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Clefairy", level: 29, nature: "Serious", moves: "Metronome/(No Move)/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Clefable", level: 30, nature: "Serious", moves: "Metronome/(No Move)/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Koffing", level: 29, nature: "Modest", ability: "Neutralizing Gas", moves: "Self-Destruct/Haze/Smokescreen/Clear Smog", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Sudowoodo", level: 31, nature: "Serious", ability: "Sturdy", moves: "Slam/Rock Slide/Sucker Punch/(No Move)", Ivs: "0/0/0/0/0/0" },

    // Hop 5
    { type: "kill", pokemon: "Cramorant", level: 29, nature: "Hasty", ability: "Gulp Missile", moves: "Dive/Fury Attack/Pluck/(No Move)", Ivs: "10/10/10/10/10/10" },
    { type: "kill", pokemon: "Silicobra", level: 30, nature: "Bold", ability: "Shed Skin", moves: "Glare/Dig/Brutal Swing/(No Move)", Ivs: "10/10/10/10/10/10" },
    { type: "kill", pokemon: "Thwackey", level: 33, ability: "Overgrow", moves: "Knock Off/Razor Leaf/Screech/Round", Ivs: "15/15/15/25/25/20" },
    { type: "kill", pokemon: "Toxel", level: 29, nature: "Bold", ability: "Static", moves: "Tearful Look/Nuzzle/Flail/Acid", Ivs: "10/10/10/10/10/10" },

    // Allister's Gym
    { type: "kill", pokemon: "Pumpkaboo-Average", level: 31, nature: "Calm", moves: "Trick-or-Treat/Bullet Seed/Shadow Sneak/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Phantump", level: 31, nature: "Jolly", moves: "Horn Leech/Growth/Hex/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Pumpkaboo-Large", level: 31, nature: "Bold", moves: "Confuse Ray/Bullet Seed/Scary Face/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Corsola-Galar", level: 32, nature: "Bold", ability: "Weak Armor", moves: "Hex/Ancient Power/Disable/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Haunter", level: 33, nature: "Serious", ability: "Levitate", moves: "Night Shade/Payback/Mean Look/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Drifblim", level: 33, nature: "Serious", ability: "Unburden", moves: "Phantom Force/Shadow Ball/Stockpile/(No Move)", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Yamask-Galar", level: 34, nature: "Calm", ability: "Wandering Spirit", moves: "Brutal Swing/Hex/Disable/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Cursola", level: 35, nature: "Bold", ability: "Weak Armor", moves: "Ancient Power/Curse/Hex/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Mimikyu", level: 34, nature: "Jolly", ability: "Disguise", moves: "Shadow Sneak/Baby-Doll Eyes/Hone Claws/Slash", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Gengar", level: 35, nature: "Brave", ability: "Cursed Body", moves: "Venoshock/Hex/Hypnosis/Payback", Ivs: "20/20/20/20/20/20", Evs: "688/0/0/0/0/0" },
    /* Yes, Gengar is Level 36 but you only get the exp equivalent of defeating it at Lv 35 due to only
    having 3 badges at that point, which only allows you to get the exp of a pokemon up to it's Lv 35 equivalent */

    // Bede 3
    { type: "kill", pokemon: "Duosion", level: 32, nature: "Modest", ability: "Magic Guard", moves: "Light Screen/Reflect/Psyshock/Psybeam", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Gothorita", level: 32, nature: "Bold", ability: "Competitive", moves: "Fake Tears/Psybeam/Rock Tomb/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Ponyta-Galar", level: 33, nature: "Adamant", ability: "Pastel Veil", moves: "Fairy Wind/Psybeam/Agility/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Hattrem", level: 35, nature: "Modest", ability: "Anticipation", moves: "Dazzling Gleam/Psybeam/(No Move)/(No Move)", Ivs: "15/15/15/15/15/15" },

    // Opal's Gym
    { type: "kill", pokemon: "Spritzee", level: 34, nature: "Docile", moves: "Draining Kiss/Psychic/Echoed Voice/Sweet Kiss", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Slurpuff", level: 34, nature: "Bashful", moves: "Draining Kiss/Energy Ball/Cotton Spore/Fake Tears", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Swirlix", level: 34, nature: "Bashful", moves: "Draining Kiss/Energy Ball/Cotton Spore/Fake Tears", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Aromatisse", level: 34, nature: "Docile", moves: "Draining Kiss/Psychic/Echoed Voice/Sweet Kiss", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Morgrem", level: 35, nature: "Adamant", ability: "Prankster", moves: "Fake Out/False Surrender/Flatter/Draining Kiss", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Gardevoir", level: 35, nature: "Timid", ability: "Synchronize", moves: "Dazzling Gleam/Mystical Fire/Charm/Reflect", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Weezing-Galar", level: 36, nature: "Quirky", ability: "Levitate", moves: "Sludge/Fairy Wind/Tackle/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Togekiss", level: 37, nature: "Timid", ability: "Hustle", moves: "Air Slash/Draining Kiss/Ancient Power/(No Move)", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Mawile", level: 36, nature: "Adamant", ability: "Intimidate", moves: "Draining Kiss/Crunch/Iron Defense/Astonish", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Alcremie", level: 38, nature: "Bold", ability: "Sweet Veil", moves: "Draining Kiss/Acid Armor/Sweet Kiss/(No Move)", Ivs: "20/20/20/20/20/20", Evs: "720/0/0/0/0/0" },

    { type: "change-moves", moves: "Flamethrower/Will-O-Wisp/Flare Blitz/Extreme Speed" },

    // Hop 6
    { type: "kill", pokemon: "Trevenant", level: 34, nature: "Calm", ability: "Natural Cure", moves: "Horn Leech/Shadow Claw/Confuse Ray/(No Move)", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Heatmor", level: 34, nature: "Careful", ability: "Flash Fire", moves: "Fire Lash/Bug Bite/Slash/Lick", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Snorlax", level: 35, nature: "Bold", ability: "Thick Fat", moves: "Body Slam/Stockpile/Heavy Slam/(No Move)", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Boltund", level: 35, nature: "Adamant", ability: "Strong Jaw", moves: "Spark/Crunch/Roar/Nuzzle", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Rillaboom", level: 37, ability: "Overgrow", moves: "Drum Beating/Knock Off/Slam/Brutal Swing", Ivs: "15/15/15/25/25/20", expShare: true },

    // Route 8 Required Trainers
    { type: "kill", pokemon: "Roselia", level: 36, nature: "Serious", moves: "Leech Seed/Magical Leaf/Poison Sting/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Hattrem", level: 36, nature: "Modest", moves: "Dazzling Gleam/Psybeam/Brutal Swing/Calm Mind", Ivs: "0/0/0/0/0/0", expShare: true },

    // Melony's Gym
    // { type: "kill", pokemon: "Snom", level: 38, nature: "Quiet", moves: "Powder Snow/Struggle Bug/(No Move)/(No Move)", Ivs: "5/5/5/5/5/5" }, // Gym Trainer Lewis
    { type: "kill", pokemon: "Frosmoth", level: 40, nature: "Modest", ability: "Shield Dust", moves: "Icy Wind/Feather Dance/Bug Buzz/Hail", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Darmanitan-Galar", level: 40, nature: "Careful", ability: "Zen Mode", moves: "Icicle Crash/Headbutt/Taunt/Fire Fang", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Eiscue", level: 41, nature: "Sassy", ability: "Ice Face", moves: "Amnesia/Freeze-Dry/Hail/Icy Wind", Ivs: "15/15/15/15/15/15" },
    // { type: "kill", pokemon: "Lapras", level: 42, nature: "Modest", ability: "Shell Armor", moves: "Icy Wind/Ice Beam/Surf/Sing", Ivs: "20/20/20/20/20/20", Evs: "1120/0/0/0/0/0" },

    // Hop 7
    { type: "kill", pokemon: "Dubwool", level: 40, nature: "Hasty", ability: "Steadfast", moves: "Double Kick/Take Down/Growl/Defense Curl", Ivs: "5/5/5/5/5/5", expShare: true },
    { type: "kill", pokemon: "Corviknight", level: 40, nature: "Jolly", ability: "Unnerve", moves: "Drill Peck/Scary Face/Pluck/Fury Attack", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Rillaboom", level: 41, ability: "Overgrow", moves: "Drum Beating/Double Hit/Brick Break/Knock Off", Ivs: "15/15/15/25/25/20", expShare: true },
    { type: "kill", pokemon: "Snorlax", level: 39, nature: "Bold", ability: "Thick Fat", moves: "Heavy Slam/Body Slam/Crunch/(No Move)", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Pincurchin", level: 39, nature: "Sassy", ability: "Lightning Rod", moves: "Spark/Bubble Beam/Curse/(No Move)", Ivs: "10/10/10/10/10/10", expShare: true },

    // Team Yell Route 9
    { type: "kill", pokemon: "Linoone-Galar", level: 39, nature: "Jolly", moves: "Hone Claws/Night Slash/Counter/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Pangoro", level: 40, nature: "Adamant", moves: "Crunch/Bullet Punch/Taunt/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },

    // Marnie 2
    { type: "kill", pokemon: "Liepard", level: 42, nature: "Timid", ability: "Prankster", moves: "Fake Out/Torment/Nasty Plot/Sucker Punch", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Toxicroak", level: 43, nature: "Adamant", ability: "Dry Skin", moves: "Venoshock/Sucker Punch/Swagger/Poison Jab", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Scrafty", level: 43, nature: "Adamant", ability: "Shed Skin", moves: "Brick Break/Scary Face/Crunch/Swagger", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Morpeko", level: 44, nature: "Jolly", ability: "Hunger Switch", moves: "Quick Attack/Torment/Spark/Bite", Ivs: "15/15/15/15/15/15", expShare: true },

    // Piers' Gym
    { type: "kill", pokemon: "Linoone-Galar", level: 42, nature: "Jolly", moves: "Counter/Take Down/Night Slash/Fury Swipes", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Thievul", level: 42, nature: "Jolly", moves: "Foul Play/Sucker Punch/Tail Slap/Night Slash", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Scrafty", level: 42, nature: "Adamant", moves: "Swagger/Brick Break/Scary Face/Payback", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Weavile", level: 43, nature: "Careful", ability: "Pressure", moves: "Hone Claws/Slash/Ice Shard/Metal Claw", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Liepard", level: 43, nature: "Jolly", moves: "Hone Claws/Slash/Taunt/Assurance", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Drapion", level: 43, nature: "Careful", moves: "Poison Fang/Venoshock/Toxic Spikes/Bug Bite", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Scrafty", level: 44, nature: "Adamant", ability: "Intimidate", moves: "Fake Out/Sand Attack/Brick Break/Payback", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Obstagoon", level: 46, nature: "Relaxed", ability: "Reckless", moves: "Obstruct/Throat Chop/Counter/Shadow Claw", Ivs: "20/20/20/20/20/20", Evs: "252/0/252/0/0/0", expShare: true },
    { type: "kill", pokemon: "Malamar", level: 45, nature: "Adamant", ability: "Contrary", moves: "Night Slash/Foul Play/Psycho Cut/Payback", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Skuntank", level: 45, nature: "Brave", ability: "Aftermath", moves: "Sucker Punch/Screech/Toxic/Snarl", Ivs: "15/15/15/15/15/15", expShare: true },

    // Raihan's Gym
    { type: "kill", pokemon: "Pelipper", level: 45, nature: "Calm", ability: "Drizzle", moves: "Tailwind/Water Pulse/Supersonic/Air Slash", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Sliggoo", level: 45, nature: "Bold", ability: "Hydration", moves: "Water Pulse/Dragon Pulse/Acid Spray/Dragon Breath", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Ninetales", level: 45, nature: "Bold", ability: "Drought", moves: "Will-O-Wisp/Flamethrower/Disable/Extrasensory", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Turtonator", level: 45, nature: "Sassy", ability: "Shell Armor", moves: "Flamethrower/Dragon Pulse/Shell Trap/Rock Tomb", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Abomasnow", level: 45, nature: "Quiet", ability: "Snow Warning", moves: "Icy Wind/Razor Leaf/Ingrain/Aurora Veil", Ivs: "5/5/5/5/5/5" },
    // { type: "kill", pokemon: "Hakamo-o", level: 45, nature: "Careful", ability: "Overcoat", moves: "Dragon Claw/Shadow Claw/Brick Break/Noble Roar", Ivs: "5/5/5/5/5/5" },
    { type: "kill", pokemon: "Gigalith", level: 46, nature: "Careful", ability: "Sand Stream", moves: "Stealth Rock/Sand Tomb/Rock Blast/Body Press", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Sandaconda", level: 46, nature: "Calm", ability: "Sand Spit", moves: "Protect/Glare/Fire Fang/Earth Power", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Flygon", level: 47, nature: "Jolly", ability: "Levitate", moves: "Thunder Punch/Breaking Swipe/Crunch/Steel Wing", Ivs: "15/15/15/15/15/15" },
    { type: "kill", pokemon: "Duraludon", level: 48, nature: "Jolly", ability: "Heavy Metal", moves: "Breaking Swipe/Body Press/Stone Edge/Iron Head", Ivs: "20/20/20/20/20/20", Evs: "828/0/0/0/0/0" },

    // Marnie Final
    { type: "kill", pokemon: "Liepard", level: 47, nature: "Timid", ability: "Prankster", moves: "Fake Out/Torment/Nasty Plot/Snarl", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Scrafty", level: 47, nature: "Adamant", ability: "Shed Skin", moves: "Swagger/Scary Face/Brick Break/Crunch", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Toxicroak", level: 47, nature: "Adamant", ability: "Dry Skin", moves: "Venoshock/Sucker Punch/Swagger/Toxic", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Morpeko", level: 48, nature: "Jolly", ability: "Hunger Switch", moves: "Bullet Seed/Torment/Spark/Bite", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Grimmsnarl", level: 49, nature: "Adamant", ability: "Prankster", moves: "Spirit Break/Darkest Lariat/Bulk Up/Torment", Ivs: "15/15/15/15/15/15", Evs: "904/0/0/0/0/0", expShare: true },

    // Hop Final
    { type: "kill", pokemon: "Dubwool", level: 48, nature: "Hasty", ability: "Steadfast", moves: "Cotton Guard/Reversal/Body Slam/Zen Headbutt", Ivs: "5/5/5/5/5/5", expShare: true },
    { type: "kill", pokemon: "Snorlax", level: 47, nature: "Bold", ability: "Thick Fat", moves: "Heavy Slam/High Horsepower/Hammer Arm/(No Move)", Ivs: "10/10/10/10/10/10", expShare: true },
    { type: "kill", pokemon: "Corviknight", level: 48, nature: "Jolly", ability: "Unnerve", moves: "Steel Wing/Drill Peck/Scary Face/Swagger", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Pincurchin", level: 47, nature: "Sassy", ability: "Lightning Rod", moves: "Thunderbolt/Poison Jab/Curse/(No Move)", Ivs: "25/25/25/25/25/5", expShare: true },
    { type: "kill", pokemon: "Rillaboom", level: 49, ability: "Overgrow", moves: "Drum Beating/High Horsepower/Snarl/Uproar", Ivs: "15/15/15/25/25/20", Evs: "864/0/0/0/0/0", expShare: true },

    // Macro Cosmo Section
    { type: "kill", pokemon: "Meowth-Galar", level: 47, nature: "Jolly", moves: "Slash/Assurance/Play Rough/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Durant", level: 47, nature: "Jolly", ability: "Swarm", moves: "Iron Head/Crunch/X-Scissor/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Mawile", level: 47, nature: "Adamant", ability: "Hyper Cutter", moves: "Iron Head/Crunch/(No Move)/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Excadrill", level: 47, nature: "Adamant", moves: "Metal Claw/Crush Claw/Rock Slide/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Ferroseed", level: 47, nature: "Calm", ability: "Iron Barbs", moves: "Iron Head/Flash Cannon/Pin Missile/(No Move)", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Steelix", level: 47, nature: "Calm", ability: "Rock Head", moves: "Slam/Dragon Breath/Rock Slide/Crunch", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Durant", level: 48, nature: "Naughty", ability: "Hustle", moves: "Iron Head/Metal Sound/Agility/Crunch", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Cufant", level: 48, nature: "Calm", moves: "Iron Head/Play Rough/Strength/Dig", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Bronzong", level: 48, nature: "Bold", ability: "Levitate", moves: "Extrasensory/Safeguard/Iron Defense/Metal Sound", Ivs: "0/0/0/0/0/0" },
    { type: "kill", pokemon: "Klang", level: 48, nature: "Jolly", moves: "Shift Gear/Lock-On/Gear Grind/Screech", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Mawile", level: 48, nature: "Adamant", ability: "Intimidate", moves: "Iron Head/Fake Tears/Crunch/Astonish", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Steelix", level: 49, nature: "Calm", ability: "Rock Head", moves: "Slam/Screech/Rock Slide/Curse", Ivs: "0/0/0/0/0/0", expShare: true },
    { type: "kill", pokemon: "Stunfisk-Galar", level: 49, nature: "Bold", moves: "Snap Trap/Muddy Water/Metal Sound/Bounce", Ivs: "0/0/0/0/0/0", expShare: true },

    // Oleana
    { type: "kill", pokemon: "Froslass", level: 50, nature: "Timid", ability: "Snow Cloak", moves: "Hex/Icy Wind/Will-O-Wisp/Double Team", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Milotic", level: 51, nature: "Bold", ability: "Competitive", moves: "Surf/Safeguard/Aqua Ring/Recover", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Salazzle", level: 50, nature: "Timid", ability: "Corrosion", moves: "Venoshock/Incinerate/Poison Gas/Dragon Pulse", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Tsareena", level: 50, nature: "Jolly", ability: "Queenly Majesty", moves: "Trop Kick/Stomp/Attract/Acrobatics", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Garbodor", level: 52, nature: "Adamant", ability: "Weak Armor", moves: "Gunk Shot/Stomping Tantrum/Rock Blast/Toxic Spikes", Ivs: "20/20/20/20/20/20", Evs: "652/0/0/0/0/0", expShare: true },

    // Bede Final
    { type: "kill", pokemon: "Mawile", level: 51, nature: "Adamant", ability: "Intimidate", moves: "Play Rough/Iron Head/Crunch/(No Move)", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Gardevoir", level: 51, nature: "Timid", ability: "Synchronize", moves: "Dazzling Gleam/Psychic/Calm Mind/Wish", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Rapidash-Galar", level: 52, nature: "Adamant", ability: "Pastel Veil", moves: "Psycho Cut/Take Down/Dazzling Gleam/Quick Attack", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Hatterene", level: 53, nature: "Modest", ability: "Anticipation", moves: "Psychic/Dazzling Gleam/Calm Mind/Mystical Fire", Ivs: "15/15/15/15/15/15", Evs: "684/0/0/0/0/0", expShare: true },

    // Nessa Final
    { type: "kill", pokemon: "Golisopod", level: 51, nature: "Jolly", ability: "Emergency Exit", moves: "First Impression/Liquidation/Swords Dance/Shadow Claw", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Barraskewda", level: 52, nature: "Calm", ability: "Swift Swim", moves: "Liquidation/Throat Chop/Ice Fang/Drill Run", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Seaking", level: 52, nature: "Timid", ability: "Swift Swim", moves: "Smart Strike/Megahorn/Aqua Ring/Waterfall", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Pelipper", level: 51, nature: "Bold", ability: "Drizzle", moves: "Roost/Air Slash/Water Pulse/Tailwind", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Drednaw", level: 53, nature: "Adamant", ability: "Shell Armor", moves: "Liquidation/Jaw Lock/Rock Tomb/Crunch", Ivs: "20/20/20/20/20/20", Evs: "952/0/0/0/0/0", expShare: true },

    // Allister Final
    { type: "kill", pokemon: "Dusknoir", level: 52, nature: "Bold", ability: "Pressure", moves: "Shadow Punch/Thunder Punch/Rock Tomb/Disable", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Chandelure", level: 52, nature: "Timid", ability: "Flash Fire", moves: "Shadow Ball/Mystical Fire/Will-O-Wisp/(No Move)", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Polteageist", level: 53, nature: "Timid", ability: "Weak Armor", moves: "Shadow Ball/Protect/Nasty Plot/Giga Drain", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Cursola", level: 53, nature: "Bold", ability: "Weak Armor", moves: "Hex/Strength Sap/Ancient Power/Amnesia", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Gengar", level: 54, nature: "Brave", ability: "Cursed Body", moves: "Shadow Ball/Sludge Bomb/Dark Pulse/Hypnosis", Ivs: "20/20/20/20/20/20", Evs: "716/0/0/0/0/0", expShare: true },

    // Raihan Final
    { type: "kill", pokemon: "Torkoal", level: 53, nature: "Brave", ability: "Drought", moves: "Lava Plume/Body Press/Solar Beam/Yawn", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Turtonator", level: 54, nature: "Quiet", ability: "Shell Armor", moves: "Sunny Day/Dragon Pulse/Shell Trap/Fire Blast", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Flygon", level: 54, nature: "Jolly", ability: "Levitate", moves: "Sandstorm/Dragon Claw/Earthquake/Crunch", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Goodra", level: 54, nature: "Quiet", ability: "Sap Sipper", moves: "Rain Dance/Surf/Thunder/Muddy Water", Ivs: "15/15/15/15/15/15", expShare: true },
    { type: "kill", pokemon: "Duraludon", level: 55, nature: "Jolly", ability: "Light Metal", moves: "Dragon Claw/Body Press/Stone Edge/Iron Head", Ivs: "20/20/20/20/20/20", Evs: "832/0/0/0/0/0", expShare: true },

    // Rose Final
    { type: "kill", pokemon: "Escavalier", level: 55, nature: "Brave", ability: "Shell Armor", moves: "Drill Run/Iron Head/Megahorn/Swords Dance", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Ferrothorn", level: 55, nature: "Brave", ability: "Iron Barbs", moves: "Gyro Ball/Power Whip/Body Press/Curse", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Perrserker", level: 55, nature: "Brave", ability: "Tough Claws", moves: "Iron Head/Screech/Shadow Claw/Throat Chop", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Klinklang", level: 56, nature: "Jolly", ability: "Minus", moves: "Gear Grind/Shift Gear/Wild Charge/Assurance", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Copperajah", level: 57, nature: "Adamant", ability: "Sheer Force", moves: "Heavy Slam/Iron Head/High Horsepower/Zen Headbutt", Ivs: "20/20/20/20/20/20", Evs: "1136/0/0/0/0/0", expShare: true },

    // Leon w/ Scorbunny Starter
    { type: "kill", pokemon: "Aegislash-Blade", level: 62, nature: "Quiet", ability: "Stance Change", moves: "King's Shield/Shadow Ball/Sacred Sword/Flash Cannon", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Haxorus", level: 63, nature: "Jolly", ability: "Mold Breaker", moves: "Poison Jab/Iron Tail/Outrage/Earthquake", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Mr. Rime", level: 64, nature: "Modest", ability: "Tangled Feet", moves: "Teeter Dance/Psychic/Freeze-Dry/Thunderbolt", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Dragapult", level: 62, nature: "Modest", ability: "Clear Body", moves: "Shadow Ball/Flamethrower/Thunderbolt/Dragon Breath", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Inteleon", level: 64, nature: "Modest", ability: "Torrent", moves: "Snipe Shot/Dark Pulse/Mud Shot/Tearful Look", Ivs: "20/20/20/20/20/20", expShare: true },
    { type: "kill", pokemon: "Charizard", level: 65, nature: "Timid", ability: "Blaze", moves: "Fire Blast/Air Slash/Solar Beam/Ancient Power", Ivs: "30/30/30/30/30/30", Evs: "896/0/0/0/0/0", expShare: true },

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