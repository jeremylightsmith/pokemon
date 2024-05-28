import { Link, Outlet, HashRouter, Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Play from "./routes/play";
import BuildDeck from "./routes/build_deck";

const Layout = () => {
  return (
    <div>
      <nav className="py-2 px-4 bg-slate-700 text-white w-full flex justify-between">
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

      <main className="p-4">
        <Outlet />
      </main>
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
