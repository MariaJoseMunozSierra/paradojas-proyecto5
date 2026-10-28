import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";
import { sacarMensajeDeError } from "../servicios/errores";
 
// GET /respuestas/capa/:capaId
export const obtenerRespuestasCapa = createAsyncThunk(
  "respuestas/obtenerRespuestasCapa",
  async function (capaId, thunkAPI) {
    try {
      const respuesta = await conexion.get("/respuestas/capa/" + capaId);
      return { capaId: capaId, respuestas: respuesta.data.respuestas };
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
// POST /respuestas   datos: { capa, tipo, contenido, respuestaPadre? }
// tipo debe ser "resolve" o "complicate"
export const crearRespuesta = createAsyncThunk(
  "respuestas/crearRespuesta",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/respuestas", datos);
      return respuesta.data.respuesta;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
// porCapa guarda las respuestas agrupadas por el _id de cada capa:
// { "idCapa1": [respuesta, respuesta], "idCapa2": [...] }
const estadoInicial = {
  porCapa: {},
  cargando: false,
  error: "",
};
 
const respuestasSlice = createSlice({
  name: "respuestas",
  initialState: estadoInicial,
  reducers: {
    limpiarErrorRespuestas: function (state) {
      state.error = "";
    },
  },
  extraReducers: function (builder) {
    builder.addCase(obtenerRespuestasCapa.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(obtenerRespuestasCapa.fulfilled, function (state, action) {
      state.cargando = false;
      state.porCapa[action.payload.capaId] = action.payload.respuestas;
    });
    builder.addCase(obtenerRespuestasCapa.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
 
    builder.addCase(crearRespuesta.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(crearRespuesta.fulfilled, function (state, action) {
      state.cargando = false;
      const capaId = action.payload.capa;
      if (!state.porCapa[capaId]) {
        state.porCapa[capaId] = [];
      }
      state.porCapa[capaId].push(action.payload);
    });
    builder.addCase(crearRespuesta.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});
 
export const { limpiarErrorRespuestas } = respuestasSlice.actions;
export default respuestasSlice.reducer;