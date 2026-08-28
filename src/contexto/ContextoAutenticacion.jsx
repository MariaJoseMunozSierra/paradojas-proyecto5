import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";


const AuthContext = createContext();
export function AuthProvider(props) {
  const [usuario, setUsuario] = useState(null);

  const valorDelContexto = {
    usuario: usuario,
    setUsuario: setUsuario,
  };

  return (
    <AuthContext.Provider value={valorDelContexto}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  return contexto;
}