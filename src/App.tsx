import { Link, Outlet, HashRouter, Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Play from "./routes/play";
import BuildDeck from "./routes/build_deck";

const Layout = () => {
  return (
    <div className="container mx-auto px-4">
      <nav className="w-full flex justify-between">
        <div>Pokemon TCG Simulator</div>
        <ul className="flex gap-2">
          <li>
            <Link to="/play">Play</Link>
          </li>
          <li>
            <Link to="/build">Build</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Root />} />
          <Route path="/play" element={<Play />} />
          <Route path="/build" element={<BuildDeck />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
