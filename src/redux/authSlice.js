import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conexion from "../servicios/conexion";

function sacarMensajeDeError(error) {
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

export const login = createAsyncThunk(
  "auth/login",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/auth/login", datos);
      delete respuesta.data.usuario.password;
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

export const registro = createAsyncThunk(
  "auth/registro",
  async function (datos, thunkAPI) {
    try {
      const respuesta = await conexion.post("/auth/registro", datos);
      delete respuesta.data.usuario.password;
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(sacarMensajeDeError(error));
    }
  }
);

const estadoInicial = {
  usuario: JSON.parse(localStorage.getItem("usuario")),
  token: localStorage.getItem("token"),
  cargando: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: estadoInicial,
  reducers: {
    cerrarSesion: function (state) {
      state.usuario = null;
      state.token = null;
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    },
  },
  extraReducers: function (builder) {
    builder.addCase(login.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, function (state, action) {
      state.cargando = false;
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
      localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });

    builder.addCase(registro.pending, function (state) {
      state.cargando = true;
      state.error = "";
    });
    builder.addCase(registro.fulfilled, function (state, action) {
      state.cargando = false;
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
      localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registro.rejected, function (state, action) {
      state.cargando = false;
      state.error = action.payload;
    });
  },
});

export const { cerrarSesion } = authSlice.actions;
export default authSlice.reducer;