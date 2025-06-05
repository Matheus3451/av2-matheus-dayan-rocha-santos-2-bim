import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Detalhes from "../pages/Detalhes";
import Favoritos from "../pages/Favoritos";

export default function AppRoutes() {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/detalhes" style={{ marginRight: "1rem" }}>Detalhes</Link>
        <Link to="/favoritos">Favoritos</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhes" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}