import "./App.css";
import { startGame } from "./pokemon/actions";
import reducer from "./pokemon/reducers/history_reducer";
import { Provider } from "react-redux";
import BoardHistory from "./pokemon/components/board_history";
import { configureStore } from "@reduxjs/toolkit";

function App() {
  const store = configureStore({
    reducer: reducer,
  });

  store.dispatch(startGame());

  return (
    <>
      <Provider store={store}>
        <BoardHistory />
      </Provider>
    </>
  );
}

export default App;
