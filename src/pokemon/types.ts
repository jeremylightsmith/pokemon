export type PlayerT = "me" | "you";

export type SubtypeT =
  | "ACE SPEC"
  | "Ancient"
  | "BREAK"
  | "Baby"
  | "Basic"
  | "EX"
  | "Eternamax"
  | "Fusion Strike"
  | "Future"
  | "GX"
  | "Goldenrod Game Corner"
  | "Item"
  | "LEGEND"
  | "Level-Up"
  | "MEGA"
  | "Pokémon Tool"
  | "Pokémon Tool F"
  | "Prime"
  | "Prism Star"
  | "Radiant"
  | "Rapid Strike"
  | "Restored"
  | "Rocket's Secret Machine"
  | "SP"
  | "Single Strike"
  | "Special"
  | "Stadium"
  | "Stage 1"
  | "Stage 2"
  | "Star"
  | "Supporter"
  | "TAG TEAM"
  | "Team Plasma"
  | "Technical Machine"
  | "Tera"
  | "Ultra Beast"
  | "V"
  | "V-UNION"
  | "VMAX"
  | "VSTAR"
  | "ex";

export type TypeT =
  | "Colorless"
  | "Darkness"
  | "Dragon"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Grass"
  | "Lightning"
  | "Metal"
  | "Psychic"
  | "Water";

export type AbilityT = {
  name: string;
  text: string;
  type: string; // maybe "Poké-Power" | "Poké-Body" | "Ability";
};

export type AttackT = {
  name: string;
  cost: TypeT[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
};

export type TypeValueT = {
  type: TypeT;
  value: string; // e.g. +20 or -10
};

export type PokemonT = {
  id: string;
  name: string;
  supertype: "Pokémon";
  subtypes: SubtypeT[];
  hp: number; // convert
  types: TypeT[];
  evolvesTo?: string[];
  evolvesFrom?: string;
  abilities: AbilityT[];
  attacks: AttackT[];
  weaknesses: TypeValueT[];
  resistances: TypeValueT[];
  retreatCost: TypeT[];
  convertedRetreatCost: number;
  images: {
    small: string;
    large: string;
  };
};

export type EnergyT = {
  id: string;
  name: string;
  supertype: "Energy";
  subtypes: SubtypeT[];
  images: {
    small: string;
    large: string;
  };
};

export type TrainerT = {
  id: string;
  name: string;
  supertype: "Trainer";
  subtypes: SubtypeT[];
  rules: string[];
  attacks?: AttackT[];
  images: {
    small: string;
    large: string;
  };
};

export type CardT = PokemonT | EnergyT | TrainerT;

export type DeckT = CardT[];

export type SideT = {
  prizeCards: CardT[];
  bench: CardT[];
  active?: CardT;
  hand: CardT[];
  deck: CardT[];
  discardPile: CardT[];
};

export type BoardT = {
  you: SideT;
  me: SideT;
  currentPlayer?: PlayerT;
  log: MoveT[];
};

export type AllBoardsT = {
  currentBoard: BoardT;
  boards: BoardT[];
};

export type MoveT = {
  move: string;
  player?: PlayerT;
};

// prize cards, start game w/ 6, then claim when you beat a pokemon
// game is won when prize cards are gone
//
// bench: up to 5 pokemon at a time
//   pokemon can have energy cards under them, need to see them
//   can have tools attached to them
//   can have damage counters
// active: 1 pokemon at a time (only can attack from there)
// deck: 60 cards (all cards come from here, including prize cards)
// discard
// hand: 7 cards (no limit)
// lose if have to draw and no cards in the deck
//
// types of cards:
//   pokemon: basic, stage 1, stage 2
//   energy: 9 types
//   trainer: items, supporters, stadiums
//   special energy: 11 types
//   tools:
// who's turn it is
//   1. draw a card
//   2. action
//      - place pokemon cards (many)
//      - evolve pokemon (many) - but not single pokemon more than once
//      - attach energy cards (one)
//      - play trainer cards (many - supporter only once)
//      - retreat active pokemon (one)
//      - use abilities (many)
//   3. attack
