import { assocPath, curry, partition, pipe, remove, splitAt } from "ramda";
import { BoardT, CardT, DeckT, MoveT, SideT } from "./types";

export const useDecks = curry(
  ({ me, you }: { me: DeckT; you: DeckT }, board: BoardT): BoardT =>
    pipe(
      assocPath(["me", "deck"], me),
      assocPath(["you", "deck"], you),
    )(board) as BoardT,
);

export const shuffle = curry((board: BoardT) => bothSides(shuffleDeck, board));

export const shuffleDeck = (side: SideT) => {
  const shuffledDeck = [];
  let deck = side.deck;

  while (deck.length > 0) {
    const i = Math.floor(Math.random() * deck.length);
    const card = deck[i];
    shuffledDeck.push(card);
    deck = remove(i, 1, deck);
  }

  return { ...side, deck: shuffledDeck };
};

export const setupBoard = curry((board: BoardT) => bothSides(setupSide, board));

export const chooseFirstPlayer = curry((board: BoardT): BoardT => {
  const coinFlip = Math.random() > 0.5;
  const currentPlayer = coinFlip ? "me" : "you";
  return addLog(
    { player: currentPlayer, move: "wins the coin toss and goes first" },
    { ...board, currentPlayer },
  );
});

const setupSide = (side: SideT) => {
  const [prizeCards, deck1] = splitAt(6, side.deck);
  const [hand, deck2] = splitAt(7, deck1);
  return {
    ...side,
    prizeCards,
    hand,
    deck: deck2,
  };
};

const bothSides = curry((fn: (side: SideT) => SideT, board: BoardT) => ({
  ...board,
  me: fn(board.me),
  you: fn(board.you),
}));

export const advance = (board: BoardT): BoardT => {
  if (!board.currentPlayer) {
    return pipe<[BoardT], BoardT, BoardT, BoardT>(
      bothSides(startBasicPokemon),
      addLog({ move: "played basic pokemon" }),
      chooseFirstPlayer(),
    )(board);
  } else {
    return {
      ...board,
      log: [{ move: "nothin'" }],
    };
  }
};

const startBasicPokemon = (side: SideT) => {
  const [basics, hand] = partition(isBasicPokemon, side.hand);
  if (basics.length > 0) {
    const [active, ...bench] = basics;
    return { ...side, active, bench, hand };
  } else {
    return side;
  }
};

const isBasicPokemon = (card: CardT) =>
  card.supertype == "Pokémon" && card.subtypes.includes("Basic");

export const addLog = curry(
  (move: MoveT, board: BoardT): BoardT => ({
    ...board,
    log: [move, ...board.log],
  }),
);
