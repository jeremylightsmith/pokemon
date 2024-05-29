import { expect, test } from "vitest";
import { initialState } from "./board_slice";
import { CardT } from "./types";
import { map } from "ramda";
import { useDecks, shuffle, setupBoard } from "./model";

const newCard = (name: string): CardT => ({
  id: name,
  name: name,
  images: {
    small: "",
    large: "",
  },
});

const newCards = (n: number) => map((n) => newCard(`card${n}`), Array(n));

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
