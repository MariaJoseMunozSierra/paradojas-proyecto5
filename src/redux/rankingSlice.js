import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";
import { sacarMensajeDeError } from "../servicios/errores";
 
// GET /ranking
// Devuelve { grandPhilosopher, theCreator, agentOfChaos, theResolver }
export const obtenerRanking = createAsyncThunk(
  "ranking/obtenerRanking",
  async function (_, thunkAPI) {
    try {
      const respuesta = await conexion.get("/ranking");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
const estadoInicial = {
  grandPhilosopher: [],
  theCreator: [],
  agentOfChaos: [],
  theResolver: [],
  cargando: false,
  error: "",
};
 
const rankingSlice = createSlice({
  name: "ranking",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(obtenerRanking.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(obtenerRanking.fulfilled, function (state, action) {
      state.cargando = false;
      state.grandPhilosopher = action.payload.grandPhilosopher;
      state.theCreator = action.payload.theCreator;
      state.agentOfChaos = action.payload.agentOfChaos;
      state.theResolver = action.payload.theResolver;
    });
    builder.addCase(obtenerRanking.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});
 
export default rankingSlice.reducer;    