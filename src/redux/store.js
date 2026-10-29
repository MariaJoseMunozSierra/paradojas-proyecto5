import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import paradojasReducer from "./paradojasSlice";
import respuestasReducer from "./respuestasSlice";
import votosReducer from "./votosSlice";
import duelosReducer from "./duelosSlice";
import rankingReducer from "./rankingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    paradojas: paradojasReducer,
    respuestas: respuestasReducer,
    votos: votosReducer,
    duelos: duelosReducer,
    ranking: rankingReducer,
  },
});