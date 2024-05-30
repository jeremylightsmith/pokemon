import { createSlice } from "@reduxjs/toolkit";
import { BoardT } from "./types";
import { pipe } from "ramda";
import {
  useDecks,
  shuffle,
  setupBoard,
  advance as advanceBoard,
  addLog,
} from "./model";

export const initialState: BoardT = {
  you: {
    prizeCards: [],
    bench: [],
    active: undefined,
    hand: [],
    deck: [],
    discardPile: [],
  },
  me: {
    prizeCards: [],
    bench: [],
    active: undefined,
    hand: [],
    deck: [],
    discardPile: [],
  },
  nextTurn: {},
  log: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: (create) => ({
    startGame: create.reducer(() => {
      const deck = JSON.parse(localStorage.getItem("deck") || "[]");
      return pipe<[BoardT], BoardT, BoardT, BoardT, BoardT>(
        useDecks({ me: deck, you: deck }),
        shuffle(),
        setupBoard(),
        addLog({ move: "started game" }),
      )(initialState);
    }),
    advance: create.reducer((state: BoardT) => {
      return advanceBoard(state);
    }),
  }),
});

export const { startGame, advance } = boardSlice.actions;
export default boardSlice.reducer;
