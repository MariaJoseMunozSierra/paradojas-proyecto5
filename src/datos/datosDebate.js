export const respuestasFalsas = {
  1: [
    { id: 1, usuario: "esceptico_1", tipo: "resolver", contenido: "No, actuar implica intención directa.", votos: { agree: 5, disagree: 2 } },
    { id: 2, usuario: "estoico_2", tipo: "complicar", contenido: "¿Pero la inacción no es también una elección?", votos: { agree: 1, disagree: 0 } },
  ],
  2: [
    { id: 3, usuario: "existencialista_3", tipo: "resolver", contenido: "Sí, salvar más vidas justifica desviar el tranvía.", votos: { agree: 3, disagree: 3 } },
  ],
};

export const duelosFalsos = [
  { id: 1, paradoja_id: 1, retador: "esceptico_1", retado: "estoico_2", estado: "En Curso", ganador: null },
  { id: 2, paradoja_id: 1, retador: "existencialista_3", retado: "esceptico_1", estado: "Finalizado", ganador: "existencialista_3" },
];