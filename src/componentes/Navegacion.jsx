import { Link } from "react-router-dom";
import { useAuth } from "../contexto/ContextoAutenticacion";

function Navegacion() {
  const autentificacion = useAuth();

  function cerrarSesion() {
    autentificacion.setUsuario(null);
  }

  return (
    <nav>
      <Link to="/">Paradojas</Link>
      {" | "}
      <Link to="/crear">Crear Paradoja</Link>
      {" | "}
      <Link to="/ranking">Ranking</Link>
      {autentificacion.usuario === null ? (
        <span>
          {" | "}
          <Link to="/login">Iniciar sesión</Link>
          {" | "}
          <Link to="/registro">Registrarme</Link>
        </span>
      ) : (
        <span>
          {" | "}
          <Link to="/perfil">Mi Perfil</Link>
          {" | "}
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </span>
      )}
    </nav>
  );
}

export default Navegacion;