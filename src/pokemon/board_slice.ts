import { createSlice } from "@reduxjs/toolkit";
import { BoardT } from "./types";
import { pipe } from "ramda";
import { useDecks, shuffle, setupBoard } from "./model";

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
  lastMove: undefined,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: (create) => ({
    startGame: create.reducer((state: BoardT) => {
      const deck = JSON.parse(localStorage.getItem("deck") || "[]");
      return pipe<[BoardT], BoardT, BoardT, BoardT>(
        useDecks({ me: deck, you: deck }),
        shuffle(),
        setupBoard(),
      )(state);
    }),
  }),
});

export const { startGame } = boardSlice.actions;
export default boardSlice.reducer;
