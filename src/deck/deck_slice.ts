import { createSlice } from "@reduxjs/toolkit";
import { DeckT } from "../pokemon/types";

interface DeckState {
  decks: DeckT[];
  openDeck: DeckT[];
}

const initialState = {
  decks: [],
  openDeck: [],
} satisfies DeckState as DeckState;

const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
});

export const {} = deckSlice.actions;
export default deckSlice.reducer;
