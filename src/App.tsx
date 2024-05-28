import "./App.css";
import { startGame } from "./pokemon/actions";
import reducer from "./pokemon/reducers/history_reducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Play from "./routes/play";
import BuildDeck from "./routes/build_deck";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/build",
    element: <BuildDeck />,
  },
]);

function App() {
  const store = configureStore({
    reducer: reducer,
  });

  store.dispatch(startGame());

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
