import { assocPath, curry, pipe, remove, splitAt } from "ramda";
import { BoardT, DeckT, SideT } from "./types";

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
  return { ...board, currentPlayer: coinFlip ? "me" : "you" };
});

const setupSide = (side: SideT) => {
  let { deck } = side;
  let prizeCards, hand;
  [prizeCards, deck] = splitAt(6, deck);
  [hand, deck] = splitAt(7, deck);
  return {
    ...side,
    prizeCards,
    hand,
    deck,
  };
};

const bothSides = (fn: (side: SideT) => SideT, board: BoardT) => ({
  ...board,
  me: fn(board.me),
  you: fn(board.you),
});

export const advance = (board: BoardT): BoardT => {
  return {
    ...board,
    lastMove: { type: "hint", player: "me" },
  };
};
