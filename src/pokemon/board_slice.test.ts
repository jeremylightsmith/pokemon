import { expect, test } from "vitest";
import { initialState } from "./board_slice";

test("initial state", () => {
  const state = initialState;
  expect(state.me.bench).toEqual([]);
});
