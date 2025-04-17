import React, { createContext, useState, useEffect } from "react";
import { loginService, registerService } from "../services/authService";
import { fetchUserProfile } from "../services/usuarioService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar, si hay token + id, validamos y traemos perfil
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        try {
          const profile = await fetchUserProfile(id);
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        } catch (err) {
          console.error("Token inválido o expirado", err);
          logout();
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const register = async (name, email, password) => {
    // registerService devuelve { id, token }
    const { id, token } = await registerService(name, email, password);

    // Manejo del almacenamiento aquí
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);

    // Traigo el perfil completo
    const profile = await fetchUserProfile(id);
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    return profile;
  };

  const login = async (email, password) => {
    // loginService devuelve { id, token }
    const { id, token } = await loginService(email, password);

    // Manejo del almacenamiento aquí
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);

    // Traigo el perfil completo
    const profile = await fetchUserProfile(id);
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    return profile;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Mientras validamos token, podrías mostrar un spinner o null
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};