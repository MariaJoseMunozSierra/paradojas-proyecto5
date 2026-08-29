import { useState } from "react";
import { duelosFalsos } from "../datos/datosDebate";

function InterfazDuelo({ paradojaId }) {
  const [duelos, setDuelos] = useState(duelosFalsos.filter((d) => d.paradoja_id === Number(paradojaId)));
  const [retado, setRetado] = useState("");

  const lanzarDuelo = () => {
    if (!retado.trim()) return;
    setDuelos((prev) => [
      ...prev,
      { id: prev.length + 1, paradoja_id: Number(paradojaId), retador: "tú", retado, estado: "Pendiente", ganador: null },
    ]);
    setRetado("");
  };

  return (
    <div>
      <h2>Duelo de paradoja</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Usuario a retar" value={retado} onChange={(e) => setRetado(e.target.value)} />
        <button onClick={lanzarDuelo}>Lanzar duelo</button>
      </div>

      {duelos.length === 0 ? (
        <p>Todavía no hay duelos para esta paradoja.</p>
      ) : (
        duelos.map((d) => (
          <div key={d.id} style={{ border: "1px solid #333", borderRadius: 4, padding: 8, marginBottom: 8 }}>
            <p>{d.retador} vs. {d.retado} — <strong>{d.estado}</strong></p>
            {d.estado === "Finalizado" && <p>Ganador: {d.ganador ?? "empate"}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default InterfazDuelo;