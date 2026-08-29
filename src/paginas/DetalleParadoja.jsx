import { useParams } from "react-router-dom";
import { paradojas } from "../datos/datosFalsos";
import { calcularChaosIndex } from "../datos/datosFalsos";

function DetalleParadoja() {
  const parametros = useParams();
  const idBuscado = Number(parametros.id);
  let paradojaEncontrada = null;
  for (let i = 0; i < paradojas.length; i++) {
    if (paradojas[i].id === idBuscado) {
      paradojaEncontrada = paradojas[i];
    }
  }

  if (paradojaEncontrada === null) {
    return <p>Paradoja no existe</p>;
  }
  const chaosIndex = calcularChaosIndex(paradojaEncontrada);

  return (
    <div>
      <h1>{paradojaEncontrada.titulo}</h1>
      <p><strong>Categoría :</strong> {paradojaEncontrada.categoria}</p>
      <p><strong>Estado :</strong> {paradojaEncontrada.estado}</p>
      <p><strong>Chaos Index :</strong> {chaosIndex.toFixed(2)}</p>
      <p>{paradojaEncontrada.informacion}</p>

      <h2>Capas</h2>
      <ul>
        {paradojaEncontrada.capas.map((unaCapa) => (
          <li key={unaCapa.id}>
            <strong>Nivel {unaCapa.profundidad}:</strong> {unaCapa.pregunta}
            {" Puntaje: " + unaCapa.puntaje}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetalleParadoja;