import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerParadoja,
  actualizarParadoja,
  eliminarParadoja,
} from "../redux/paradojasSlice";

function DetalleParadoja() {
  const parametros = useParams();
  const id = parametros.id;
  const dispatch = useDispatch();
  const navegar = useNavigate();

  const paradoja = useSelector(function (state) {
    return state.paradojas.detalle;
  });
  const cargando = useSelector(function (state) {
    return state.paradojas.cargando;
  });
  const error = useSelector(function (state) {
    return state.paradojas.error;
  });
  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });

  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [statement, setStatement] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(function () {
    dispatch(obtenerParadoja(id));
  }, [dispatch, id]);

  function empezarEdicion() {
    setTitulo(paradoja.titulo);
    setStatement(paradoja.statement);
    setMensajeError("");
    setEditando(true);
  }

  function guardarCambios(evento) {
    evento.preventDefault();
    setMensajeError("");

    if (titulo === "" || statement === "") {
      setMensajeError("El título y el statement no pueden estar vacíos");
      return;
    }

    const datos = { id: id, cambios: { titulo: titulo, statement: statement } };
    dispatch(actualizarParadoja(datos)).then(function (resultado) {
      if (actualizarParadoja.fulfilled.match(resultado)) {
        setEditando(false);
        // Vuelve a pedir la paradoja para traer también el chaos_index
        dispatch(obtenerParadoja(id));
      } else {
        setMensajeError(resultado.payload);
      }
    });
  }

  function borrar() {
    const seguro = window.confirm("¿Seguro que quieres eliminar esta paradoja?");
    if (!seguro) {
      return;
    }
    dispatch(eliminarParadoja(id)).then(function (resultado) {
      if (eliminarParadoja.fulfilled.match(resultado)) {
        navegar("/");
      } else {
        setMensajeError(resultado.payload);
      }
    });
  }

  if (cargando && paradoja === null) {
    return <p>Cargando paradoja...</p>;
  }

  if (error !== "" && paradoja === null) {
    return <p className="mensaje-error">{error}</p>;
  }

  if (paradoja === null) {
    return <p>Paradoja no encontrada</p>;
  }

  return (
    <div className="contenedor">
      <h1>{paradoja.titulo}</h1>
      <p><strong>Categoría:</strong> {paradoja.categoria}</p>
      <p><strong>Estado:</strong> {paradoja.estado}</p>
      {paradoja.chaos_index !== undefined && (
        <p><strong>Chaos Index:</strong> {paradoja.chaos_index.toFixed(2)}</p>
      )}
      <p>{paradoja.statement}</p>

      <h2>Capas</h2>
      <ul>
        {paradoja.capas.map(function (unaCapa) {
          return (
            <li key={unaCapa._id}>
              <strong>Nivel {unaCapa.profundidad}:</strong> {unaCapa.pregunta}
              {" - Puntaje: " + unaCapa.resolution_score}
            </li>
          );
        })}
      </ul>

      <p>
        <Link to={"/debate/" + paradoja._id}>Ir al debate</Link>
      </p>

      {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}

      {usuario !== null && !editando && (
        <button onClick={empezarEdicion}>Editar</button>
      )}

      {usuario !== null && usuario.role === "admin" && !editando && (
        <button onClick={borrar}>Eliminar</button>
      )}

      {editando && (
        <form onSubmit={guardarCambios}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
            />
          </div>
          <div>
            <label>Statement (máx. 300 caracteres):</label>
            <textarea
              value={statement}
              maxLength={300}
              onChange={(evento) => setStatement(evento.target.value)}
            />
            <p>{statement.length}/300</p>
          </div>
          <button type="submit" disabled={cargando}>Guardar</button>
          <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default DetalleParadoja;