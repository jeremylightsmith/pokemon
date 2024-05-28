import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Play from "./routes/play";
import BuildDeck from "./routes/build_deck";

const router = createHashRouter([
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
  return <RouterProvider router={router} />;
}

export default App;
