import { useState } from "react";
import BotonesVoto from "./BotonesVoto";
import { paradojas } from "../datos/datosFalsos";
import { respuestasFalsas } from "../datos/datosDebate";

function VistaDebate({ paradojaId }) {
  const paradoja = paradojas.find((p) => p.id === Number(paradojaId)) || paradojas[0];
  const [capaAbierta, setCapaAbierta] = useState(paradoja.capas[0]?.id ?? null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");

  return (
    <div>
      <h1>{paradoja.titulo}</h1>
      <p><strong>Categoría:</strong> {paradoja.categoria} — <strong>Estado:</strong> {paradoja.estado}</p>
      <p>{paradoja.informacion}</p>

      <h2>Debate por capas</h2>
      {paradoja.capas.map((capa) => {
        const abierta = capaAbierta === capa.id;
        const respuestas = respuestasFalsas[capa.id] || [];
        return (
          <div key={capa.id} style={{ border: "1px solid #333", borderRadius: 4, padding: 10, marginBottom: 10 }}>
            <div style={{ cursor: "pointer" }} onClick={() => setCapaAbierta(abierta ? null : capa.id)}>
              <strong>Nivel {capa.profundidad}:</strong> {capa.pregunta} — Puntaje: {capa.puntaje}
            </div>

            {abierta && (
              <div style={{ marginTop: 10 }}>
                {respuestas.map((r) => (
                  <div key={r.id} style={{ borderTop: "1px solid #333", padding: "8px 0" }}>
                    <p style={{ margin: "4px 0" }}>
                      <strong>{r.tipo === "resolver" ? "Resuelve" : "Complica"}</strong> ({r.usuario}): {r.contenido}
                    </p>
                    <BotonesVoto votosIniciales={r.votos} />
                  </div>
                ))}

                <div style={{ marginTop: 10 }}>
                  <textarea
                    placeholder="Escribe tu respuesta a esta capa…"
                    value={nuevaRespuesta}
                    onChange={(e) => setNuevaRespuesta(e.target.value)}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setNuevaRespuesta("")}>Proponer resolución</button>
                    <button onClick={() => setNuevaRespuesta("")}>Complicar</button>
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