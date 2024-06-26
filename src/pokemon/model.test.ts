import { expect, test } from "vitest";
import { initialState } from "./board_slice";
import { BoardT, CardT } from "./types";
import { useDecks, shuffle, setupBoard, advance } from "./model";
import {
  newEnergy,
  pikachu,
  raichu,
  fireEnergy,
  grassEnergy,
  charmander,
  eevee,
} from "./card_factory";
import { flatten } from "ramda";

const newCards = (n: number) =>
  Array(n).map((n) => newEnergy({ name: `card${n}` }));

test("useDeck", () => {
  const deck1 = newCards(10);
  const deck2 = newCards(10);
  const state1 = useDecks({ me: deck1, you: deck2 }, initialState);
  expect(state1.me.deck).toBe(deck1);
  expect(state1.you.deck).toBe(deck2);
});

test("shuffle", () => {
  const deck = newCards(10);
  const state1 = useDecks({ me: deck, you: deck }, initialState);
  const state2 = shuffle(state1);
  expect(state2.me.deck.length).toBe(10);
  expect(state2.you.deck.length).toBe(10);
});

test("setupBoard", () => {
  const a = newCards(60);
  const b = newCards(60);
  const state1 = useDecks({ me: a, you: b }, initialState);
  const { me, you } = setupBoard(state1);
  expect(me.prizeCards).toEqual([a[0], a[1], a[2], a[3], a[4], a[5]]);
  expect(me.hand).toEqual([a[6], a[7], a[8], a[9], a[10], a[11], a[12]]);
  expect(me.deck.length).toBe(47);
  expect(you.prizeCards).toEqual([b[0], b[1], b[2], b[3], b[4], b[5]]);
  expect(you.hand).toEqual([b[6], b[7], b[8], b[9], b[10], b[11], b[12]]);
  expect(you.deck.length).toBe(47);
});

const x = (n: number, card: CardT) => Array(n).fill(card);

test("advance: pass out basics", () => {
  const deck = flatten([
    x(6, fireEnergy),
    raichu,
    pikachu,
    raichu,
    charmander,
    fireEnergy,
    eevee,
    x(5, grassEnergy),
  ]);
  const state1 = setupBoard(useDecks({ me: deck, you: deck }, initialState));
  const state2 = advance(state1);

  expect(state1.me.active).toEqual(undefined);
  expect(state1.me.bench).toEqual([]);
  expect(state2.me.active).toEqual(pikachu);
  expect(state2.me.bench).toEqual([charmander, eevee]);
});

test("advance: draw a card", () => {
  const deck = [raichu, pikachu];
  const state0: BoardT = {
    ...initialState,
    me: {
      ...initialState.me,
      deck,
    },
    nextTurn: { player: "me", step: "draw" },
  };
  const state1 = advance(state0);

  expect(state1.me.hand).toEqual([raichu]);
  expect(state1.me.deck).toEqual([pikachu]);
  expect(state1.nextTurn).toEqual({ player: "me", step: "play" });
});
