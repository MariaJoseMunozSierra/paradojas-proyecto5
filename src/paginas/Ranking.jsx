import { usuarios, paradojas, calcularChaosIndex } from "../datos/datosFalsos";

function Ranking() {
  const grandPhilosopher = [...usuarios].sort((a, b) => b.paradox_score - a.paradox_score);

  const chaosPorCreador = {};
  paradojas.forEach((p) => {
    const chaos = calcularChaosIndex(p);
    if (!(p.creador_id in chaosPorCreador) || chaos > chaosPorCreador[p.creador_id]) {
      chaosPorCreador[p.creador_id] = chaos;
    }
  });
  const agentOfChaos = [...usuarios].sort(
    (a, b) => (chaosPorCreador[b.id] || 0) - (chaosPorCreador[a.id] || 0)
  );

  const contarPorCreador = (predicado) => {
    const conteo = {};
    paradojas.filter(predicado).forEach((p) => {
      conteo[p.creador_id] = (conteo[p.creador_id] || 0) + 1;
    });
    return conteo;
  };
  const creadas = contarPorCreador(() => true);
  const resueltas = contarPorCreador((p) => p.estado === "Resolved");
  const theCreator = [...usuarios].sort((a, b) => (creadas[b.id] || 0) - (creadas[a.id] || 0));
  const theResolver = [...usuarios].sort((a, b) => (resueltas[b.id] || 0) - (resueltas[a.id] || 0));

  const categorias = [
    { titulo: "Grand Philosopher", lista: grandPhilosopher, valor: (u) => u.paradox_score },
    { titulo: "Agent of Chaos", lista: agentOfChaos, valor: (u) => (chaosPorCreador[u.id] || 0).toFixed(1) },
    { titulo: "The Resolver", lista: theResolver, valor: (u) => resueltas[u.id] || 0 },
    { titulo: "The Creator", lista: theCreator, valor: (u) => creadas[u.id] || 0 },
  ];

  return (
    <div>
      <h1>Ranking de Filósofos</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {categorias.map((cat) => (
          <div key={cat.titulo} style={{ border: "1px solid #333", borderRadius: 4, padding: 12 }}>
            <h3>{cat.titulo}</h3>
            <ol>
              {cat.lista.slice(0, 5).map((u) => (
                <li key={u.id}>{u.username} — {cat.valor(u)}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;