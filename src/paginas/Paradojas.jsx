import { Link } from "react-router-dom";
import { paradojas } from "../datos/datosFalsos";

function Paradojas() {
  return (
    <div>
      <h1>Paradojas</h1>
      <ul>
        {paradojas.map((unaParadoja) => (
          <li key={unaParadoja.id}>
            <Link to={"/paradojas/" + unaParadoja.id}>{unaParadoja.titulo}</Link>
            {" / " + unaParadoja.categoria + " / " + unaParadoja.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paradojas;