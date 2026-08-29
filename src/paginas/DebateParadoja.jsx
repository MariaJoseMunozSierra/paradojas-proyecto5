import { useParams } from "react-router-dom";
import VistaDebate from "../componentes/VistaDebate";
import InterfazDuelo from "../componentes/InterfazDuelo";

function DebateParadoja() {
  const { id } = useParams();
  return (
    <div>
      <VistaDebate paradojaId={id} />
      <InterfazDuelo paradojaId={id} />
    </div>
  );
}

export default DebateParadoja;