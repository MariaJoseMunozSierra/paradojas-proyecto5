import { useAuth } from "../contexto/ContextoAutenticacion";

function Perfil() {
  const autentificacion = useAuth();
  const usuario = autentificacion.usuario;

  if (usuario === null) {
    return <p>Debes iniciar sesion para ver tu perfil</p>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Usuario :</strong> {usuario.username}</p>
      <p><strong>Escuela filosofica :</strong> {usuario.escuela}</p>
      <p><strong>Puntaje (paradox_score) :</strong> {usuario.paradox_score}</p>
      <p><strong>Chaos Index acumulado :</strong> {usuario.chaos_index}</p>
    </div>
  );
}

export default Perfil;