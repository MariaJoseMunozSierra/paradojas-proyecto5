import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { votar } from "../redux/votosSlice";

const etiquetas = {
  agree: "A favor",
  disagree: "En contra",
  abstain: "Abstención",
};

function BotonesVoto({ respuestaId, onVotado }) {
  const dispatch = useDispatch();
  const miVoto = useSelector(function (state) {
    return state.votos.votados[respuestaId];
  });
  const cargando = useSelector(function (state) {
    return state.votos.cargando;
  });
  const [mensajeError, setMensajeError] = useState("");

  function manejarVoto(valor) {
    setMensajeError("");
    dispatch(votar({ respuesta: respuestaId, valor: valor })).then(function (resultado) {
      if (votar.fulfilled.match(resultado)) {
        if (onVotado) {
          onVotado(resultado.payload.resolution_score);
        }
      } else {
        setMensajeError(resultado.payload);
      }
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button disabled={cargando} onClick={() => manejarVoto("agree")}> A favor</button>
        <button disabled={cargando} onClick={() => manejarVoto("disagree")}> En contra</button>
        <button disabled={cargando} onClick={() => manejarVoto("abstain")}>Abstenerse</button>
      </div>
      {miVoto && <p>Tu voto: {etiquetas[miVoto]}</p>}
      {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}
    </div>
  );
}

export default BotonesVoto;