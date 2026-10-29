import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { crearParadoja } from "../redux/paradojasSlice";
import { categorias } from "../constantes";

function CrearParadoja() {
  const [titulo, setTitulo] = useState("");
  const [statement, setStatement] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [capa1, setCapa1] = useState("");
  const [capa2, setCapa2] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const dispatch = useDispatch();
  const navegar = useNavigate();
  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });
  const cargando = useSelector(function (state) {
    return state.paradojas.cargando;
  });

  function manejarSubmit(evento) {
    evento.preventDefault();
    setMensajeError("");

    if (titulo === "" || statement === "" || capa1 === "" || capa2 === "") {
      setMensajeError("Faltan datos");
      return;
    }

    const datos = {
      titulo: titulo,
      statement: statement,
      categoria: categoria,
      creador_id: usuario._id,
      capas: [
        { pregunta: capa1, profundidad: 1 },
        { pregunta: capa2, profundidad: 2 },
      ],
    };

    dispatch(crearParadoja(datos)).then(function (resultado) {
      if (crearParadoja.fulfilled.match(resultado)) {
        navegar("/");
      } else {
        setMensajeError(resultado.payload);
      }
    });
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
          <label>Statement (máx. 300 caracteres):</label>
          <textarea
            value={statement}
            maxLength={300}
            onChange={(evento) => setStatement(evento.target.value)}
          />
          <p>{statement.length}/300</p>
        </div>
        <div>
          <label>Categoría:</label>
          <select value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
            {categorias.map(function (unaCategoria) {
              return <option key={unaCategoria} value={unaCategoria}>{unaCategoria}</option>;
            })}
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

        {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}
        {cargando && <p>Creando paradoja...</p>}
        <button type="submit" disabled={cargando}>Crear paradoja</button>
      </form>
    </div>
  );
}

export default CrearParadoja;