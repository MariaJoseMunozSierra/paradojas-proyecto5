// Saca un mensaje legible del error que devuelve el backend.
// Mismo criterio que usa authSlice: { error } del errorHandler o
// { errores: [...] } de las validaciones.
export function sacarMensajeDeError(error) {
  if (error.response && error.response.data) {
    if (error.response.data.error) {
      return error.response.data.error;
    }
    if (error.response.data.errores) {
      return error.response.data.errores[0].msg;
    }
  }
  return "Error de conexión con el servidor";
}