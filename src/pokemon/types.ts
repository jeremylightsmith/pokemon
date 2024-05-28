export type ColorT = "R" | "G" | "B" | "Y" | "W"; // red, green, blue, yellow, white
export type CardT = string; // like G2, R1, Y5

export type DeckT = CardT[];

export type PlayerT = {
  hand: CardT[];
  notes: any;
};

export type HintT = {
  player: number;
  cards: number[];
  color?: ColorT;
  number?: number;
};

export type MoveT =
  | {
      type: "hint";
      player: number;
      hint: HintT;
    }
  | {
      type: "play" | "discard";
      player: number;
      card: number;
    };

export type SideT = {
  prizeCards: CardT[];
  bench: CardT[];
  active: CardT;
  hand: CardT[];
  deck: CardT[];
  discardPile: CardT[];
};

export type BoardT = {
  you: SideT;
  me: SideT;
  turn: number;
  deck: CardT[];
  players: PlayerT[];
  discards: CardT[];
  table: { [key in ColorT]?: number };
  lastMove?: MoveT;
  livesLeft: number;
  hintsLeft: number;
  lastTurn?: number; // set when the cards run out
};

export type AllBoardsT = {
  currentBoard: BoardT;
  boards: BoardT[];
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
