import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";
import { sacarMensajeDeError } from "../servicios/errores";

export const listarParadojas = createAsyncThunk(
  "paradojas/listar",
  async function (_, thunkAPI) {
    try {
      const respuesta = await conexion.get("/paradojas");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

export const obtenerParadoja = createAsyncThunk(
  "paradojas/detalle",
  async function (id, thunkAPI) {
    try {
      const respuesta = await conexion.get("/paradojas/" + id);
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

export const crearParadoja = createAsyncThunk(
  "paradojas/crear",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/paradojas", datos);
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

export const actualizarParadoja = createAsyncThunk(
  "paradojas/actualizar",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.put("/paradojas/" + datos.id, datos.cambios);
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

export const eliminarParadoja = createAsyncThunk(
  "paradojas/eliminar",
  async function (id, thunkAPI) {
    try {
      await conexion.delete("/paradojas/" + id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

const paradojasSlice = createSlice({
  name: "paradojas",
  initialState: {
    lista: [],
    detalle: null,
    cargando: false,
    error: "",
  },
  reducers: {},
  extraReducers: function (builder) {
    // Enlistar
    builder.addCase(listarParadojas.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(listarParadojas.fulfilled, function (state, action) {
      state.cargando = false;
      state.lista = action.payload;
    });
    builder.addCase(listarParadojas.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });

    // Detalle
    builder.addCase(obtenerParadoja.pending, function (state) {
      state.cargando = true;
      state.error = "";
      state.detalle = null;
    });
    builder.addCase(obtenerParadoja.fulfilled, function (state, action) {
      state.cargando = false;
      state.detalle = action.payload;
    });
    builder.addCase(obtenerParadoja.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });

    // Crear
    builder.addCase(crearParadoja.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(crearParadoja.fulfilled, function (state, action) {
      state.cargando = false;
      state.lista.push(action.payload);
    });
    builder.addCase(crearParadoja.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });

    // Actualizar
    builder.addCase(actualizarParadoja.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(actualizarParadoja.fulfilled, function (state, action) {
      state.cargando = false;
      state.detalle = action.payload;
    });
    builder.addCase(actualizarParadoja.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });

    // Eliminar
    builder.addCase(eliminarParadoja.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(eliminarParadoja.fulfilled, function (state, action) {
      state.cargando = false;
      state.lista = state.lista.filter(function (p) {
        return p._id !== action.payload;
      });
    });
    builder.addCase(eliminarParadoja.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});

export default paradojasSlice.reducer;