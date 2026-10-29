import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Navegacion from "./componentes/Navegacion";
import RutaProtegida from "./componentes/RutaProtegida";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Perfil from "./paginas/Perfil";
import Paradojas from "./paginas/Paradojas";
import DetalleParadoja from "./paginas/DetalleParadoja";
import CrearParadoja from "./paginas/CrearParadoja";
import DebateParadoja from "./paginas/DebateParadoja";
import Ranking from "./paginas/Ranking";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Paradojas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/paradojas/:id" element={<DetalleParadoja />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
        <Route path="/crear" element={<RutaProtegida><CrearParadoja /></RutaProtegida>} />
        <Route path="/debate/:id" element={<RutaProtegida><DebateParadoja /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;