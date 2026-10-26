import { useSelector } from "react-redux";

function Perfil() {
  const usuario = useSelector(function (state) {
    return state.auth.usuario;
  });

  if (usuario === null) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Usuario:</strong> {usuario.username}</p>
      <p><strong>Escuela filosófica:</strong> {usuario.escuela}</p>
      <p><strong>Rol:</strong> {usuario.role}</p>
      <p><strong>Puntaje (paradox_score):</strong> {usuario.paradox_score}</p>
      <p><strong>Chaos Index acumulado:</strong> {usuario.chaos_index}</p>
    </div>
  );
}

export default Perfil;