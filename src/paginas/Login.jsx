import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../datos/datosFalsos";
import { useAuth } from "../contexto/ContextoAutenticacion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const autentificacion = useAuth();
  const navegar = useNavigate();

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === username) {
        usuarioEncontrado = usuarios[i];
      }
    }

    if (usuarioEncontrado === null) {
      setMensajeError("Este usuario no existe");
      return;
    }

    if (usuarioEncontrado.password !== password) {
      setMensajeError("Contraseña incorrecta");
      return;
    }

    autentificacion.setUsuario(usuarioEncontrado);
    navegar("/perfil");
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Usuario :</label>
          <input
            type="text"
            value={username}
            onChange={(evento) => setUsername(evento.target.value)}
          />
        </div>
        <div>
          <label>Contraseña :</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>
        {mensajeError !== "" && <p style={{ color: "red" }}>{mensajeError}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
export default Login;