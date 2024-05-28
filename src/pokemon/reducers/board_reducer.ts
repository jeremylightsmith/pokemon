export const INITIAL_STATE = {
  you: {
    prizeCards: [],
    bench: [],
    active: null,
    hand: [],
    deck: [],
    discardPile: [],
  },
  me: {
    prizeCards: [],
    bench: [],
    active: null,
    hand: [],
    deck: [],
    discardPile: [],
  },
};

export default function boardReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
