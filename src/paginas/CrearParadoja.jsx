import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paradojas } from "../datos/datosFalsos";
import { useAuth } from "../contexto/ContextoAutenticacion";

const categorias = ["Tiempo", "Espacio", "Identidad", "Conocimiento", "Etica", "Realidad"];

function CrearParadoja() {
  const [titulo, setTitulo] = useState("");
  const [informacion, setInformacion] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [capa1, setCapa1] = useState("");
  const [capa2, setCapa2] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const autentificacion = useAuth();
  const navegar = useNavigate();

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    if (autentificacion.usuario === null) {
      setMensajeError("Debes iniciar sesión para crear una paradoja");
      return;
    }

    if (titulo === "" || informacion === "" || capa1 === "" || capa2 === "") {
      setMensajeError("Faltan datos");
      return;
    }

    if (informacion.length > 300) {
      setMensajeError("La información no puede tener más de 300 caracteres");
      return;
    }

    let idMasAlto = 0;
    for (let i = 0; i < paradojas.length; i++) {
      if (paradojas[i].id > idMasAlto) {
        idMasAlto = paradojas[i].id;
      }

    }
    let nuevoId = idMasAlto + 1;

    let nuevaParadoja = {
      id: nuevoId,
      titulo: titulo,
      informacion: informacion,
      categoria: categoria,
      creador_id: autentificacion.usuario.id,
      estado: "Draft",
      capas: [
        { id: nuevoId * 100 + 1, pregunta: capa1, profundidad: 1, puntaje: 0 },
        { id: nuevoId * 100 + 2, pregunta: capa2, profundidad: 2, puntaje: 0 },
      ],
    };
    paradojas.push(nuevaParadoja);
    navegar("/");

  }

  return (
    <div>
      <h1>Crear paradoja</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
          />
        </div>
        <div>
          <label>Información (máx. 300 caracteres):</label>
          <textarea
            value={informacion}
            maxLength={300}
            onChange={(evento) => setInformacion(evento.target.value)}
          />
          <p>{informacion.length}/300</p>
        </div>
        <div>
          <label>Categoría:</label>
          <select value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
            {categorias.map((unaCategoria) => (
              <option key={unaCategoria} value={unaCategoria}>{unaCategoria}</option>
            ))}
          </select>
        </div>
        <h3>Capas</h3>
        <div>
          <label>Capa 1:</label>
          <input
            type="text"
            value={capa1}
            onChange={(evento) => setCapa1(evento.target.value)}
          />
        </div>
        <div>
          <label>Capa 2:</label>
          <input
            type="text"
            value={capa2}
            onChange={(evento) => setCapa2(evento.target.value)}
          />
        </div>
        {mensajeError !== "" && <p style={{ color: "red" }}>{mensajeError}</p>}
        <button type="submit">Crear nueva paradoja</button>
      </form>
    </div>
  );
}

export default CrearParadoja;