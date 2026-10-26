import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../redux/authSlice";

function Navegacion() {
  const dispatch = useDispatch();
  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });

  function manejarCerrarSesion() {
    dispatch(cerrarSesion());
  }

  return (
    <nav>
      <Link to="/">Paradojas</Link>
      {" | "}
      <Link to="/crear">Crear Paradoja</Link>
      {" | "}
      <Link to="/ranking">Ranking</Link>

      {usuario === null ? (
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
          <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
        </span>
      )}
    </nav>
  );
}

export default Navegacion;