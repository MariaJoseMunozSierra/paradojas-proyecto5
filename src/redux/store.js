import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import respuestasReducer from "./RespuestasSlice";

import duelosReducer from "./duelosSlice";
import rankingReducer from "./rankingSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    respuestas: respuestasReducer,
    votos: votosReducer,
    duelos: duelosReducer,
    ranking: rankingReducer,
  },
});