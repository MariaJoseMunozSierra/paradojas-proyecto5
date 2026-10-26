import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registro } from "../redux/authSlice";
import { escuelas } from "../datos/datosFalsos";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [escuela, setEscuela] = useState(escuelas[0]);
  const [mensajeError, setMensajeError] = useState("");

  const dispatch = useDispatch();
  const navegar = useNavigate();
  const cargando = useSelector(function (state) {
    return state.auth.cargando;
  });

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    if (username === "" || password === "") {
      setMensajeError("Faltan datos");
      return;
    }

    dispatch(registro({ username: username, password: password, escuela: escuela })).then(
      function (resultado) {
        if (registro.fulfilled.match(resultado)) {
          navegar("/perfil");
        } else {
          setMensajeError(resultado.payload);
        }
      }
    );
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
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>
        <div>
          <label>Escuela filosófica:</label>
          <select value={escuela} onChange={(evento) => setEscuela(evento.target.value)}>
            {escuelas.map((unaEscuela) => (
              <option key={unaEscuela} value={unaEscuela}>{unaEscuela}</option>
            ))}
          </select>
        </div>
        {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}
        {cargando && <p>Creando cuenta...</p>}
        <button type="submit" disabled={cargando}>Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;