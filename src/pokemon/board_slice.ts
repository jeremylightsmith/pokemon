import { createSlice } from "@reduxjs/toolkit";
import { BoardT } from "./types";

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
    startGame: create.reducer((state) => {
      const deck = JSON.parse(localStorage.getItem("deck") || "[]");
      state.you.deck = deck;
      state.me.deck = deck;
    }),
  }),
});

export const { startGame } = boardSlice.actions;
export default boardSlice.reducer;
