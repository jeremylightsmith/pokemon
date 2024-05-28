import { expect, test } from "vitest";
import { INITIAL_STATE } from "./board_reducer";

test("initial state", () => {
  const state = INITIAL_STATE;
  expect(state.me.bench).toEqual([]);
});
