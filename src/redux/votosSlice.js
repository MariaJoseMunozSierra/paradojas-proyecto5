import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";
import { sacarMensajeDeError } from "../servicios/errores";

// POST /votos   datos: { respuesta, valor }
// valor debe ser "agree", "disagree" o "abstain"
// El backend devuelve el nuevo resolution_score (0-100) de la capa.
export const votar = createAsyncThunk(
  "votos/votar",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/votos", datos);
      return {
        respuestaId: datos.respuesta,
        valor: datos.valor,
        resolution_score: respuesta.data.resolution_score,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

// votados: { idRespuesta: "agree" | "disagree" | "abstain" } para saber
// qué ya votó el usuario en esta sesión y poder deshabilitar los botones.
// ultimoScore: resolution_score que devolvió el último voto registrado.
const estadoInicial = {
  votados: {},
  ultimoScore: null,
  cargando: false,
  error: "",
};

const votosSlice = createSlice({
  name: "votos",
  initialState: estadoInicial,
  reducers: {
    limpiarErrorVotos: function (state) {
      state.error = "";
    },
  },
  extraReducers: function (builder) {
    builder.addCase(votar.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(votar.fulfilled, function (state, action) {
      state.cargando = false;
      state.votados[action.payload.respuestaId] = action.payload.valor;
      state.ultimoScore = action.payload.resolution_score;
    });
    builder.addCase(votar.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});

export const { limpiarErrorVotos } = votosSlice.actions;
export default votosSlice.reducer;