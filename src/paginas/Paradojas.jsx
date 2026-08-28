import { paradojas } from "../datos/datosFalsos";

function Paradojas() {
  return (
    <div>
      <h1>Paradojas</h1>
      <ul>
        {paradojas.map((unaParadoja) => (
          <li key={unaParadoja.id}>
            {unaParadoja.titulo} — {unaParadoja.categoria} — {unaParadoja.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paradojas;