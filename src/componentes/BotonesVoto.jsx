import { useState } from "react";

function BotonesVoto({ votosIniciales, onVotar }) {
  const [votos, setVotos] = useState(votosIniciales);
  const [yaVote, setYaVote] = useState(false);

  const votar = (valor) => {
    if (yaVote) return;
    setYaVote(true);
    if (valor === "agree") setVotos((v) => ({ ...v, agree: v.agree + 1 }));
    if (valor === "disagree") setVotos((v) => ({ ...v, disagree: v.disagree + 1 }));
    onVotar && onVotar(valor);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
      <button disabled={yaVote} onClick={() => votar("agree")}>👍 A favor ({votos.agree})</button>
      <button disabled={yaVote} onClick={() => votar("disagree")}>👎 En contra ({votos.disagree})</button>
      <button disabled={yaVote} onClick={() => votar("abstain")}>Abstenerse</button>
    </div>
  );
}

export default BotonesVoto;