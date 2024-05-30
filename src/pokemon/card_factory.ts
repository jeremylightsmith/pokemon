import { PokemonT, EnergyT, TrainerT } from "./types";

export const newPokemon = (
  props: Partial<PokemonT> & { name: string },
): PokemonT => {
  const defaultProps: PokemonT = {
    id: props.name,
    name: props.name,
    supertype: "Pokémon",
    subtypes: ["Basic"],
    hp: 40,
    types: ["Colorless"],
    evolvesTo: [],
    abilities: [],
    attacks: [],
    weaknesses: [],
    resistances: [],
    retreatCost: [],
    convertedRetreatCost: 1,
    images: { small: "", large: "" },
  };
  return { ...defaultProps, ...props };
};

export const newEnergy = (
  props: Partial<EnergyT> & { name: string },
): EnergyT => {
  const defaultProps: EnergyT = {
    id: props.name,
    name: props.name,
    supertype: "Energy",
    subtypes: ["Basic"],
    images: { small: "", large: "" },
  };
  return { ...defaultProps, ...props };
};

export const newTrainer = (
  props: Partial<TrainerT> & { name: string },
): TrainerT => {
  const defaultProps: TrainerT = {
    id: props.name,
    name: props.name,
    supertype: "Trainer",
    subtypes: ["Basic"],
    rules: ["some rule"],
    images: { small: "", large: "" },
  };
  return { ...defaultProps, ...props };
};

export const pikachu = newPokemon({
  name: "Pikachu",
  supertype: "Pokémon",
  subtypes: ["Basic"],
  hp: 60,
  types: ["Lightning"],
  evolvesTo: ["Raichu"],
  attacks: [
    {
      name: "Growl",
      cost: ["Colorless"],
      convertedEnergyCost: 1,
      damage: "",
      text: "If the Defending Pokémon attacks Pikachu during your opponent's next turn, any damage done by the attack is reduced by 10 (after applying Weakness and Resistance). (Benching either Pokémon ends this effect.)",
    },
    {
      name: "Thundershock",
      cost: ["Lightning", "Lightning"],
      convertedEnergyCost: 2,
      damage: "20",
      text: "Flip a coin. If heads, the Defending Pokémon is now Paralyzed.",
    },
  ],
  weaknesses: [{ type: "Fighting", value: "×2" }],
  retreatCost: ["Colorless"],
  convertedRetreatCost: 1,
});

export const raichu = newPokemon({
  name: "Raichu",
  supertype: "Pokémon",
  subtypes: ["Stage 1"],
  hp: 90,
  types: ["Lightning"],
  evolvesFrom: "Pikachu",
  attacks: [
    {
      name: "Slam",
      cost: ["Colorless", "Colorless"],
      convertedEnergyCost: 2,
      damage: "30×",
      text: "Flip 2 coins. This attack does 30 damage times the number of heads.",
    },
    {
      name: "High Volt",
      cost: ["Lightning", "Lightning", "Lightning"],
      convertedEnergyCost: 3,
      damage: "60",
      text: "If Raichu evolved from Pikachu during this turn, this attack's base damage is 100 instead of 60.",
    },
  ],
  weaknesses: [{ type: "Fighting", value: "+20" }],
  resistances: [{ type: "Metal", value: "-20" }],
  retreatCost: ["Colorless"],
});

export const eevee = newPokemon({
  name: "Eevee",
  supertype: "Pokémon",
  subtypes: ["Basic"],
  hp: 60,
  types: ["Colorless"],
  evolvesTo: [
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Sylveon",
    "Espeon",
    "Umbreon",
    "Leafeon",
    "Glaceon",
  ],
  attacks: [
    {
      cost: ["Colorless"],
      name: "Gnaw",
      text: "",
      damage: "20",
      convertedEnergyCost: 1,
    },
  ],
  weaknesses: [{ type: "Fighting", value: "×2" }],
  retreatCost: ["Colorless"],
});

export const charmander = newPokemon({
  name: "Charmander",
  supertype: "Pokémon",
  subtypes: ["Basic"],
  hp: 60,
  types: ["Fire"],
  evolvesTo: ["Charmeleon"],
  attacks: [
    {
      name: "Reckless Charge",
      cost: ["Colorless"],
      convertedEnergyCost: 1,
      damage: "20",
      text: "This Pokémon does 10 damage to itself.",
    },
  ],
  weaknesses: [{ type: "Water", value: "×2" }],
  retreatCost: ["Colorless"],
});

export const fireEnergy = newEnergy({
  name: "Basic Fire Energy",
  supertype: "Energy",
  subtypes: ["Basic"],
});

export const fightingEnergy = newEnergy({
  name: "Basic Fighting Energy",
  supertype: "Energy",
  subtypes: ["Basic"],
});

export const lightningEnergy = newEnergy({
  name: "Basic Lightning Energy",
  supertype: "Energy",
  subtypes: ["Basic"],
});

export const grassEnergy = newEnergy({
  name: "Basic Grass Energy",
  supertype: "Energy",
  subtypes: ["Basic"],
});

export const lightningCube = newTrainer({
  name: "Lightning Cube 01",
  supertype: "Trainer",
  subtypes: ["Technical Machine"],
  rules: [
    "Attach this card to 1 of your Lightning Pokémon in play. That Pokémon may use this card's attack instead of its own. At the end of your turn, discard Lightning Cube 01.",
  ],
  attacks: [
    {
      name: "Discharge",
      cost: ["Lightning"],
      convertedEnergyCost: 1,
      damage: "40×",
      text: "Discard all Lightning Energy cards attached to this Pokémon. Then, flip a number of coins equal to the number of Energy cards discarded that way. This attack does 40 damage times the number of heads.",
    },
  ],
});

export const serena = newTrainer({
  name: "Serena",
  supertype: "Trainer",
  subtypes: ["Supporter"],
  rules: [
    "Choose 1:\n• Discard up to 3 cards from your hand. (You must discard at least 1 card.) If you do, draw cards until you have 5 cards in your hand.\n• Switch 1 of your opponent's Benched Pokémon V with their Active Pokémon.",
    "You may play only 1 Supporter card during your turn.",
  ],
  images: {
    small: "https://images.pokemontcg.io/swsh12/193.png",
    large: "https://images.pokemontcg.io/swsh12/193_hires.png",
  },
});

export const sacredAsh = newTrainer({
  name: "Sacred Ash",
  supertype: "Trainer",
  subtypes: ["Item"],
  rules: [
    "Shuffle 5 Pokémon from your discard pile into your deck.",
    "You may play as many Item cards as you like during your turn (before your attack).",
  ],
});
