import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerMisDuelos,
  crearDuelo,
  responderDuelo,
  finalizarDuelo,
} from "../redux/duelosSlice";
import { obtenerRanking } from "../redux/rankingSlice";

function InterfazDuelo({ paradojaId }) {
  const dispatch = useDispatch();

  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });
  const lista = useSelector(function (state) {
    return state.duelos.lista;
  });
  const cargando = useSelector(function (state) {
    return state.duelos.cargando;
  });
  const error = useSelector(function (state) {
    return state.duelos.error;
  });
  // El backend no tiene un listado de usuarios, así que se usan los del ranking
  const filosofos = useSelector(function (state) {
    return state.ranking.grandPhilosopher;
  });

  const [retado, setRetado] = useState("");
  // Ganador elegido para cada duelo: { idDuelo: idUsuario }
  const [ganadores, setGanadores] = useState({});

  useEffect(function () {
    dispatch(obtenerMisDuelos());
    dispatch(obtenerRanking());
  }, [dispatch]);

  const duelosDeEstaParadoja = lista.filter(function (duelo) {
    return duelo.paradoja && duelo.paradoja._id === paradojaId;
  });

  const posiblesRetados = filosofos.filter(function (filosofo) {
    return usuario !== null && filosofo._id !== usuario._id;
  });

  function lanzarDuelo() {
    if (retado === "") {
      return;
    }
    dispatch(crearDuelo({ paradoja: paradojaId, retado: retado })).then(function (resultado) {
      if (crearDuelo.fulfilled.match(resultado)) {
        setRetado("");
      }
    });
  }

  function contestarDuelo(idDuelo, aceptar) {
    dispatch(responderDuelo({ id: idDuelo, aceptar: aceptar }));
  }

  function terminarDuelo(idDuelo) {
    const ganador = ganadores[idDuelo];
    if (!ganador) {
      return;
    }
    dispatch(finalizarDuelo({ id: idDuelo, ganador: ganador }));
  }

  function elegirGanador(idDuelo, idUsuario) {
    setGanadores(function (anteriores) {
      return { ...anteriores, [idDuelo]: idUsuario };
    });
  }

  function nombreDelGanador(duelo) {
    if (duelo.retador && duelo.ganador === duelo.retador._id) {
      return duelo.retador.username;
    }
    if (duelo.retado && duelo.ganador === duelo.retado._id) {
      return duelo.retado.username;
    }
    return "sin ganador";
  }

  return (
    <div className="contenedor">
      <h2>Duelo de paradoja</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <select value={retado} onChange={(evento) => setRetado(evento.target.value)}>
          <option value="">Elige a quién retar</option>
          {posiblesRetados.map(function (filosofo) {
            return (
              <option key={filosofo._id} value={filosofo._id}>
                {filosofo.username} ({filosofo.escuela})
              </option>
            );
          })}
        </select>
        <button disabled={cargando || retado === ""} onClick={lanzarDuelo}>Lanzar duelo</button>
      </div>

      {error !== "" && <p className="mensaje-error">{error}</p>}
      {cargando && duelosDeEstaParadoja.length === 0 && <p>Cargando duelos...</p>}

      {!cargando && duelosDeEstaParadoja.length === 0 && (
        <p>Todavía no tienes duelos para esta paradoja.</p>
      )}

      {duelosDeEstaParadoja.map(function (duelo) {
        const soyElRetado = usuario !== null && duelo.retado && duelo.retado._id === usuario._id;
        const nombreRetador = duelo.retador ? duelo.retador.username : "desconocido";
        const nombreRetado = duelo.retado ? duelo.retado.username : "desconocido";

        return (
          <div key={duelo._id} className="tarjeta-paradoja">
            <p>{nombreRetador} vs. {nombreRetado} — <strong>{duelo.estado}</strong></p>

            {duelo.estado === "Pendiente" && soyElRetado && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                <button disabled={cargando} onClick={() => contestarDuelo(duelo._id, true)}>Aceptar</button>
                <button disabled={cargando} onClick={() => contestarDuelo(duelo._id, false)}>Rechazar</button>
              </div>
            )}

            {duelo.estado === "Pendiente" && !soyElRetado && (
              <p>Esperando respuesta de {nombreRetado}...</p>
            )}

            {duelo.estado === "Aceptado" && duelo.retador && duelo.retado && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                <select
                  value={ganadores[duelo._id] || ""}
                  onChange={(evento) => elegirGanador(duelo._id, evento.target.value)}
                >
                  <option value="">¿Quién ganó?</option>
                  <option value={duelo.retador._id}>{nombreRetador}</option>
                  <option value={duelo.retado._id}>{nombreRetado}</option>
                </select>
                <button
                  disabled={cargando || !ganadores[duelo._id]}
                  onClick={() => terminarDuelo(duelo._id)}
                >
                  Finalizar
                </button>
              </div>
            )}

            {duelo.estado === "Terminado" && <p>Ganador: {nombreDelGanador(duelo)}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default InterfazDuelo;