import { expect, test } from "vitest";
import boardReducer, { INITIAL_STATE } from "./board_reducer";
import * as c from "../constants";

test("starts the game", () => {
  const state = INITIAL_STATE;
  const { deck, discards, hintsLeft, lastMove, livesLeft, players } =
    boardReducer(state, { type: c.START_GAME });
  expect(deck.length).toBe(34);
  expect(discards).toEqual([]);
  expect(hintsLeft).toBe(8);
  expect(lastMove).toBe(null);
  expect(livesLeft).toBe(4);
  expect(players.length).toBe(4);
});
