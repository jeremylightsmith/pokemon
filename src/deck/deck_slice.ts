import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardT, DeckT } from "../pokemon/types";

interface DeckState {
  decks: DeckT[];
  openDeck: DeckT;
}

const initialState = {
  decks: [],
  openDeck: [],
} satisfies DeckState as DeckState;

const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: (create) => ({
    addCard: create.reducer((state, action: PayloadAction<CardT>) => {
      state.openDeck.push(action.payload);
    }),
  }),
});

export const { addCard } = deckSlice.actions;
export default deckSlice.reducer;
