import React from "react";
import BoardHistory from "../pokemon/components/board_history";
import { configureStore } from "@reduxjs/toolkit";
// import { startGame } from "../pokemon/actions";
import reducer from "../pokemon/reducers/history_reducer";
import { Provider } from "react-redux";

const Root: React.FC = () => {
  const store = configureStore({
    reducer: reducer,
  });
  // store.dispatch(startGame());
  return (
    <Provider store={store}>
      <BoardHistory />
    </Provider>
  );
};

export default Root;
