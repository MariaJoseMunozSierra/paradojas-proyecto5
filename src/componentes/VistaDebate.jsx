import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerParadoja } from "../redux/paradojasSlice";
import { obtenerRespuestasCapa, crearRespuesta } from "../redux/respuestasSlice";
import BotonesVoto from "./BotonesVoto";

function VistaDebate({ paradojaId }) {
  const dispatch = useDispatch();

  const paradoja = useSelector(function (state) {
    return state.paradojas.detalle;
  });
  const cargandoParadoja = useSelector(function (state) {
    return state.paradojas.cargando;
  });
  const errorParadoja = useSelector(function (state) {
    return state.paradojas.error;
  });
  const respuestasPorCapa = useSelector(function (state) {
    return state.respuestas.porCapa;
  });
  const cargandoRespuestas = useSelector(function (state) {
    return state.respuestas.cargando;
  });
  const errorRespuestas = useSelector(function (state) {
    return state.respuestas.error;
  });

  const [capaAbierta, setCapaAbierta] = useState(null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  // Puntajes actualizados después de votar: { idCapa: resolution_score }
  const [puntajes, setPuntajes] = useState({});

  useEffect(function () {
    dispatch(obtenerParadoja(paradojaId));
  }, [dispatch, paradojaId]);

  function alternarCapa(capaId) {
    if (capaAbierta === capaId) {
      setCapaAbierta(null);
      return;
    }
    setCapaAbierta(capaId);
    setNuevaRespuesta("");
    dispatch(obtenerRespuestasCapa(capaId));
  }

  function enviarRespuesta(capaId, tipo) {
    const datos = { capa: capaId, tipo: tipo, contenido: nuevaRespuesta };
    dispatch(crearRespuesta(datos)).then(function (resultado) {
      if (crearRespuesta.fulfilled.match(resultado)) {
        setNuevaRespuesta("");
      }
    });
  }

  function guardarPuntaje(capaId, puntaje) {
    setPuntajes(function (anteriores) {
      return { ...anteriores, [capaId]: puntaje };
    });
  }

  if (paradoja === null || paradoja._id !== paradojaId) {
    if (errorParadoja !== "" && !cargandoParadoja) {
      return <p className="mensaje-error">{errorParadoja}</p>;
    }
    return <p>Cargando debate... (la primera vez puede tardar hasta 1 minuto)</p>;
  }

  return (
    <div className="contenedor">
      <h1>{paradoja.titulo}</h1>
      <p><strong>Categoría:</strong> {paradoja.categoria} — <strong>Estado:</strong> {paradoja.estado}</p>
      <p>{paradoja.statement}</p>

      <h2>Debate por capas</h2>
      {errorRespuestas !== "" && <p className="mensaje-error">{errorRespuestas}</p>}

      {paradoja.capas.map(function (capa) {
        const abierta = capaAbierta === capa._id;
        const respuestas = respuestasPorCapa[capa._id] || [];
        const puntaje = puntajes[capa._id] !== undefined ? puntajes[capa._id] : capa.resolution_score;

        return (
          <div key={capa._id} className="tarjeta-paradoja">
            <div style={{ cursor: "pointer" }} onClick={() => alternarCapa(capa._id)}>
              <strong>Nivel {capa.profundidad}:</strong> {capa.pregunta} — Puntaje: {puntaje}
            </div>

            {abierta && (
              <div style={{ marginTop: 10 }}>
                {cargandoRespuestas && respuestas.length === 0 && <p>Cargando respuestas...</p>}
                {!cargandoRespuestas && respuestas.length === 0 && (
                  <p>Todavía no hay respuestas en esta capa.</p>
                )}

                {respuestas.map(function (respuesta) {
                  const autor = respuesta.autor ? respuesta.autor.username : "desconocido";
                  return (
                    <div key={respuesta._id} style={{ borderTop: "1px solid #8EBD9D", padding: "8px 0" }}>
                      <p style={{ margin: "4px 0" }}>
                        <strong>{respuesta.tipo === "resolve" ? "Resuelve" : "Complica"}</strong> ({autor}): {respuesta.contenido}
                      </p>
                      {respuesta.tipo === "resolve" && (
                        <BotonesVoto
                          respuestaId={respuesta._id}
                          onVotado={function (nuevoPuntaje) {
                            guardarPuntaje(capa._id, nuevoPuntaje);
                          }}
                        />
                      )}
                    </div>
                  );
                })}

                <div style={{ marginTop: 10 }}>
                  <textarea
                    placeholder="Escribe tu respuesta a esta capa…"
                    value={nuevaRespuesta}
                    onChange={(evento) => setNuevaRespuesta(evento.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                    <button disabled={cargandoRespuestas} onClick={() => enviarRespuesta(capa._id, "resolve")}>
                      Proponer resolución
                    </button>
                    <button disabled={cargandoRespuestas} onClick={() => enviarRespuesta(capa._id, "complicate")}>
                      Complicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default VistaDebate;