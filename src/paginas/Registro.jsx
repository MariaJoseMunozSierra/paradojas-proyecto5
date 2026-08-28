import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../datos/datosFalsos";
import { escuelas } from "../datos/datosFalsos";
import { useAuth } from "../contexto/ContextoAutenticacion";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [escuela, setEscuela] = useState(escuelas[0]);
  const [mensajeError, setMensajeError] = useState("");

  const autentificacion = useAuth();
  const navegar = useNavigate();

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    let yaExiste = false;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === username) {
        yaExiste = true;
      }
    }

    if (yaExiste === true) {
      setMensajeError("Ese usuario ya existe");
      return;
    }

    if (username === "" || password === "") {
      setMensajeError("Faltan datos");
      return;
    }

    let nuevoId = usuarios.length + 1;
    let nuevoUsuario = {
      id: nuevoId,
      username: username,
      password: password,
      escuela: escuela,
      paradox_score: 0,
      chaos_index: 0,
    };

    usuarios.push(nuevoUsuario);

    autentificacion.setUsuario(nuevoUsuario);
    navegar("/perfil");
  }

  return (
    <div>
      <h1>Crear cuenta</h1>
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
          <label>Contraseña :</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>
        <div>
          <label>Escuela filosofica :</label>
          <select value={escuela} onChange={(evento) => setEscuela(evento.target.value)}>
            {escuelas.map((unaEscuela) => (
              <option key={unaEscuela} value={unaEscuela}>{unaEscuela}</option>
            ))}
          </select>
        </div>
        {mensajeError !== "" && <p style={{ color: "red" }}>{mensajeError}</p>}
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;