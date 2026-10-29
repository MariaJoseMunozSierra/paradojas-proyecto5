import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RutaProtegida(props) {
  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });

  if (usuario === null) {
    return <Navigate to="/login" />;
  }

  if (props.rol && usuario.role !== props.rol) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default RutaProtegida;