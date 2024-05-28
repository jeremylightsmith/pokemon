import { PayloadAction } from "@reduxjs/toolkit";
import { CardT, DeckT } from "../pokemon/types";
import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

interface DeckState {
  decks: DeckT[];
  openDeck: DeckT;
}

const initialState: DeckState = {
  decks: [],
  openDeck: [],
};

const deckSlice = createAppSlice({
  name: "decks",
  initialState,
  reducers: (create) => ({
    addCard: create.reducer((state, action: PayloadAction<CardT>) => {
      state.openDeck.push(action.payload);
    }),
    saveDeck: create.reducer((state) => {
      localStorage.setItem("deck", JSON.stringify(state.openDeck));
    }),
    loadDeck: create.reducer((state) => {
      const deck = localStorage.getItem("deck");
      if (deck) {
        state.openDeck = JSON.parse(deck);
      }
    }),
  }),
});

export const { addCard, saveDeck, loadDeck } = deckSlice.actions;
export default deckSlice.reducer;
