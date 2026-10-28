import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";
import { sacarMensajeDeError } from "../servicios/errores";
 
// GET /duelos/mios
export const obtenerMisDuelos = createAsyncThunk(
  "duelos/obtenerMisDuelos",
  async function (_, thunkAPI) {
    try {
      const respuesta = await conexion.get("/duelos/mios");
      return respuesta.data.duelos;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
// POST /duelos   datos: { paradoja, retado }  (retado es el _id del usuario)
export const crearDuelo = createAsyncThunk(
  "duelos/crearDuelo",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/duelos", datos);
      return respuesta.data.duelo;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
// PATCH /duelos/:id/responder   datos: { id, aceptar }  (aceptar: true o false)
export const responderDuelo = createAsyncThunk(
  "duelos/responderDuelo",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.patch("/duelos/" + datos.id + "/responder", {
        aceptar: datos.aceptar,
      });
      return respuesta.data.duelo;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
// PATCH /duelos/:id/finalizar   datos: { id, ganador }  (ganador es el _id del usuario)
export const finalizarDuelo = createAsyncThunk(
  "duelos/finalizarDuelo",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.patch("/duelos/" + datos.id + "/finalizar", {
        ganador: datos.ganador,
      });
      return respuesta.data.duelo;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);
 
const estadoInicial = {
  lista: [],
  cargando: false,
  error: "",
};
 
// responder y finalizar devuelven el duelo sin los nombres de los usuarios,
// así que solo se actualizan estado y ganador del duelo que ya está en la lista.
function actualizarDuelo(state, duelo) {
  const existente = state.lista.find(function (d) {
    return d._id === duelo._id;
  });
  if (existente) {
    existente.estado = duelo.estado;
    existente.ganador = duelo.ganador;
  }
}
 
const duelosSlice = createSlice({
  name: "duelos",
  initialState: estadoInicial,
  reducers: {
    limpiarErrorDuelos: function (state) {
      state.error = "";
    },
  },
  extraReducers: function (builder) {
    builder.addCase(obtenerMisDuelos.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(obtenerMisDuelos.fulfilled, function (state, action) {
      state.cargando = false;
      state.lista = action.payload;
    });
    builder.addCase(obtenerMisDuelos.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
 
    builder.addCase(crearDuelo.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(crearDuelo.fulfilled, function (state, action) {
      state.cargando = false;
      state.lista.unshift(action.payload);
    });
    builder.addCase(crearDuelo.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
 
    builder.addCase(responderDuelo.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(responderDuelo.fulfilled, function (state, action) {
      state.cargando = false;
      actualizarDuelo(state, action.payload);
    });
    builder.addCase(responderDuelo.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
 
    builder.addCase(finalizarDuelo.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(finalizarDuelo.fulfilled, function (state, action) {
      state.cargando = false;
      actualizarDuelo(state, action.payload);
    });
    builder.addCase(finalizarDuelo.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});
 
export const { limpiarErrorDuelos } = duelosSlice.actions;
export default duelosSlice.reducer;