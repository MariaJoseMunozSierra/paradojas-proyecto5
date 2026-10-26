import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const dispatch = useDispatch();
  const navegar = useNavigate();
  const cargando = useSelector(function (state) {
    return state.auth.cargando;
  });

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    dispatch(login({ username: username, password: password })).then(
      function (resultado) {
        if (login.fulfilled.match(resultado)) {
          navegar("/perfil");
        } else {
          setMensajeError(resultado.payload);
        }
      }
    );
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(evento) => setUsername(evento.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>
        {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}
        {cargando && <p>Entrando... (la primera vez puede tardar hasta 1 minuto)</p>}
        <button type="submit" disabled={cargando}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;