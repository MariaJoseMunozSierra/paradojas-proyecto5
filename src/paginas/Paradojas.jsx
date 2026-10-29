import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarParadojas } from "../redux/paradojasSlice";

function Paradojas() {
  const dispatch = useDispatch();
  const lista = useSelector(function (state) {
    return state.paradojas.lista;
  });
  const cargando = useSelector(function (state) {
    return state.paradojas.cargando;
  });
  const error = useSelector(function (state) {
    return state.paradojas.error;
  });

  useEffect(function () {
    dispatch(listarParadojas());
  }, [dispatch]);

  return (
    <div>
      <h1>Paradojas</h1>

      {cargando && <p>Cargando paradojas... (la primera vez puede tardar hasta 1 minuto)</p>}
      {error !== "" && <p className="mensaje-error">{error}</p>}

      {!cargando && error === "" && lista.length === 0 && (
        <p>Todavía no hay paradojas.</p>
      )}

      <ul>
        {lista.map(function (unaParadoja) {
          return (
            <li key={unaParadoja._id}>
              <Link to={"/paradojas/" + unaParadoja._id}>{unaParadoja.titulo}</Link>
              {" - " + unaParadoja.categoria + " - " + unaParadoja.estado}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Paradojas;