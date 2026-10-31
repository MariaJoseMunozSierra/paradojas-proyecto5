import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerRanking } from "../redux/rankingSlice";

function Ranking() {
  const dispatch = useDispatch();
  const ranking = useSelector(function (state) {
    return state.ranking;
  });

  useEffect(function () {
    dispatch(obtenerRanking());
  }, [dispatch]);

  function textoChaos(paradoja) {
    if (typeof paradoja.chaos_index === "number") {
      return paradoja.chaos_index.toFixed(1);
    }
    return "-";
  }

  const categorias = [
    {
      titulo: "Grand Philosopher",
      lista: ranking.grandPhilosopher,
      clave: function (u) { return u._id; },
      texto: function (u) { return u.username + " - " + u.paradox_score; },
    },
    {
      titulo: "Agent of Chaos",
      lista: ranking.agentOfChaos,
      clave: function (p) { return p._id; },
      texto: function (p) {
        const creador = p.creador_id ? p.creador_id.username : "desconocido";
        return creador + " - " + textoChaos(p) + " (" + p.titulo + ")";
      },
    },
    {
      titulo: "The Resolver",
      lista: ranking.theResolver,
      clave: function (u) { return u.usuario; },
      texto: function (u) { return u.usuario + " - " + u.paradojasResueltas; },
    },
    {
      titulo: "The Creator",
      lista: ranking.theCreator,
      clave: function (u) { return u.usuario; },
      texto: function (u) { return u.usuario + " - " + u.paradojasCreadas; },
    },
  ];

  return (
    <div className="contenedor">
      <h1>Ranking de Filósofos</h1>

      {ranking.cargando && <p>Cargando ranking... (la primera vez puede tardar hasta 1 minuto)</p>}
      {ranking.error !== "" && <p className="mensaje-error">{ranking.error}</p>}

      {!ranking.cargando && ranking.error === "" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {categorias.map(function (categoria) {
            return (
              <div key={categoria.titulo} className="tarjeta-paradoja">
                <h3>{categoria.titulo}</h3>
                {categoria.lista.length === 0 ? (
                  <p>Sin datos todavía.</p>
                ) : (
                  <ol>
                    {categoria.lista.slice(0, 5).map(function (elemento) {
                      return <li key={categoria.clave(elemento)}>{categoria.texto(elemento)}</li>;
                    })}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ranking;