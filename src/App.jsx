import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AuthProvider } from "./contexto/ContextoAutenticacion";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Perfil from "./paginas/Perfil";
import Paradojas from "./paginas/Paradojas";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Paradojas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
