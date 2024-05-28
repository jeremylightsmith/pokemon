import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Play from "./routes/play";
import BuildDeck from "./routes/build_deck";

const router = createBrowserRouter([
  {
    path: "/pokemon/",
    element: <Root />,
  },
  {
    path: "/pokemon/play",
    element: <Play />,
  },
  {
    path: "/pokemon/build",
    element: <BuildDeck />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
