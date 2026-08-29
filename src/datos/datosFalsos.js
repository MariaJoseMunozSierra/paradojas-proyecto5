export const escuelas = ["Esceptico", "Estoico", "Existencialista"];

export const usuarios = [
  { id: 1, username: "Usuario1", password: "123456", escuela: "Esceptico", paradox_score: 0, chaos_index: 0 },
  { id: 2, username: "Usuario2", password: "123456", escuela: "Esceptico", paradox_score: 0, chaos_index: 0 },
  { id: 3, username: "Usuario3", password: "123456", escuela: "Esceptico", paradox_score: 0, chaos_index: 0 },
  { id: 4, username: "Usuario4", password: "123456", escuela: "Esceptico", paradox_score: 0, chaos_index: 0 },
  { id: 5, username: "Usuario5", password: "123456", escuela: "Estoico", paradox_score: 0, chaos_index: 0 },
  { id: 6, username: "Usuario6", password: "123456", escuela: "Estoico", paradox_score: 0, chaos_index: 0 },
  { id: 7, username: "Usuario7", password: "123456", escuela: "Estoico", paradox_score: 0, chaos_index: 0 },
  { id: 8, username: "Usuario8", password: "123456", escuela: "Estoico", paradox_score: 0, chaos_index: 0 },
  { id: 9, username: "Usuario9", password: "123456", escuela: "Existencialista", paradox_score: 0, chaos_index: 0 },
  { id: 10, username: "Usuario10", password: "123456", escuela: "Existencialista", paradox_score: 0, chaos_index: 0 },
  { id: 11, username: "Usuario11", password: "123456", escuela: "Existencialista", paradox_score: 0, chaos_index: 0 },
  { id: 12, username: "Usuario12", password: "123456", escuela: "Existencialista", paradox_score: 0, chaos_index: 0 },
];

export const paradojas = [
  {
    id: 1,
    titulo: "El dilema del tranvía",
    informacion: "Un tranvía va a matar a 5 personas. Puedes desviarlo y matar solo a 1. ¿Es correcto actuar?",
    categoria: "Etica",
    creador_id: 1,
    estado: "Active",
    capas: [
      { id: 1, pregunta: "¿Es lo mismo actuar que dejar que algo pase?", profundidad: 1, puntaje: 0 },
      { id: 2, pregunta: "¿El número de vidas justifica la decisión?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 2,
    titulo: "La paradoja del abuelo",
    informacion: "Si viajas al pasado y evitas que tus abuelos se conozcan, ¿cómo puedes existir para viajar en el tiempo?",
    categoria: "Tiempo",
    creador_id: 2,
    estado: "Active",
    capas: [
      { id: 3, pregunta: "¿Se puede alterar el pasado sin contradicción?", profundidad: 1, puntaje: 0 },
      { id: 4, pregunta: "¿Existen líneas de tiempo paralelas?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 3,
    titulo: "Aquiles y la tortuga",
    informacion: "Aquiles nunca alcanza a la tortuga si esta siempre avanza un poco más antes de que él llegue a su posición anterior.",
    categoria: "Espacio",
    creador_id: 3,
    estado: "Draft",
    capas: [
      { id: 5, pregunta: "¿El espacio se puede dividir infinitamente?", profundidad: 1, puntaje: 0 },
      { id: 6, pregunta: "¿Cómo se relaciona esto con el movimiento real?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 4,
    titulo: "La paradoja de la profecía",
    informacion: "Si sabes con certeza que algo va a pasar, ¿sigue siendo libre tu decisión de actuar?",
    categoria: "Conocimiento",
    creador_id: 4,
    estado: "Draft",
    capas: [
      { id: 7, pregunta: "¿El conocimiento del futuro elimina el libre albedrío?", profundidad: 1, puntaje: 0 },
      { id: 8, pregunta: "¿Puede una predicción ser cierta y evitable a la vez?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 5,
    titulo: "El argumento del sueño de Descartes",
    informacion: "¿Cómo sabes que no estás soñando en este momento?",
    categoria: "Realidad",
    creador_id: 5,
    estado: "Draft",
    capas: [
      { id: 9, pregunta: "¿Existe una diferencia real entre soñar y estar despierto?", profundidad: 1, puntaje: 0 },
      { id: 10, pregunta: "¿Qué evidencia distingue la realidad de la ilusión?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 6,
    titulo: "La paradoja de los gemelos idénticos",
    informacion: "Si dos personas comparten el 100% de su ADN, ¿qué hace que sean individuos distintos?",
    categoria: "Identidad",
    creador_id: 6,
    estado: "Frozen",
    capas: [
      { id: 11, pregunta: "¿La identidad depende del cuerpo o de la mente?", profundidad: 1, puntaje: 0 },
      { id: 12, pregunta: "¿Qué papel juega la experiencia individual?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 7,
    titulo: "La paradoja de Newcomb",
    informacion: "Te ofrecen dos cajas: una transparente con dinero visible y otra opaca según una predicción sobre tu elección. ¿Es más racional elegir una o las dos?",
    categoria: "Etica",
    creador_id: 7,
    estado: "Resolved",
    capas: [
      { id: 13, pregunta: "¿Puede una predicción perfecta afectar tu decisión libre?", profundidad: 1, puntaje: 85 },
      { id: 14, pregunta: "¿Qué estrategia maximiza la ganancia esperada?", profundidad: 2, puntaje: 80 },
    ],
  },

  {
    id: 8,
    titulo: "La paradoja de Monty Hall",
    informacion: "En un concurso con 3 puertas, cambiar tu elección después de revelar una puerta vacía duplica tus posibilidades de ganar.",
    categoria: "Conocimiento",
    creador_id: 8,
    estado: "Resolved",
    capas: [
      { id: 15, pregunta: "¿Por qué la probabilidad no es 50/50 tras revelar una puerta?", profundidad: 1, puntaje: 90 },
      { id: 16, pregunta: "¿Cómo cambia la información nueva la estrategia óptima?", profundidad: 2, puntaje: 75 },
    ],
  },

  {
    id: 9,
    titulo: "El dilema del prisionero",
    informacion: "Dos sospechosos: si ambos cooperan les va mejor que si ambos se traicionan, pero individualmente cada uno gana más traicionando al otro.",
    categoria: "Etica",
    creador_id: 9,
    estado: "Active",
    capas: [
      { id: 17, pregunta: "¿Es racional cooperar si no puedes confiar en el otro?", profundidad: 1, puntaje: 0 },
      { id: 18, pregunta: "¿Qué pasa si el juego se repite muchas veces?", profundidad: 2, puntaje: 0 },
    ],
  },

  {
    id: 10,
    titulo: "La nave de Teseo",
    informacion: "Si reemplazas todas las piezas de un barco una por una, ¿sigue siendo el mismo barco?",
    categoria: "Identidad",
    creador_id: 10,
    estado: "Active",
    capas: [
      { id: 19, pregunta: "¿La identidad depende de la materia o de la forma?", profundidad: 1, puntaje: 0 },
      { id: 20, pregunta: "¿Qué pasa si alguien arma un segundo barco con las piezas originales?", profundidad: 2, puntaje: 0 },
    ],
  },
];

export function calcularChaosIndex(paradoja) {
  if (paradoja.capas.length === 0) {
    return 0;
  }

  let sumaDePuntajes = 0;
  for (let i = 0; i < paradoja.capas.length; i++) {
    sumaDePuntajes = sumaDePuntajes + paradoja.capas[i].puntaje;
  }

  let promedio = sumaDePuntajes / paradoja.capas.length;
  let intentos = 0;
  let chaosIndex = (intentos * 2) + (paradoja.capas.length * 5) - (promedio * 0.5);

  return chaosIndex;
}