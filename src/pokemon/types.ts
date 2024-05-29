export type PlayerT = "me" | "you";

export type CardT = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
};

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
  lastMove?: MoveT;
};

export type AllBoardsT = {
  currentBoard: BoardT;
  boards: BoardT[];
};

export type MoveT =
  | {
      type: "hint";
      player: PlayerT;
    }
  | {
      type: "play" | "discard";
      player: PlayerT;
      card: number;
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
