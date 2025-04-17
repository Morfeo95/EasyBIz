// src/services/usuarioService.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Función para obtener las cabeceras de autenticación.
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const fetchUserProfile = async (usuarioId) => {
  const resp = await fetch(`${API_BASE}/usuarios/${usuarioId}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error("Error al obtener perfil de usuario");
  return resp.json(); // { id, name, email, ... }
};

// Registrar un nuevo usuario (POST /usuarios)
export const createUsuario = async (datos) => {
  const response = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al registrar usuario");
  }
  return response.json();
};

// Actualizar un usuario existente (PUT /usuarios)
export const updateUsuario = async (datos) => {
  const response = await fetch(`${API_BASE}/usuarios`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al actualizar usuario");
  }
  return response.json();
};

// Obtener los datos de un usuario (GET /usuarios/{id})
export const getUsuario = async (id) => {
  const response = await fetch(`${API_BASE}/usuarios/${id}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener datos del usuario");
  }
  return response.json();
};

// Eliminar un usuario (DELETE /usuarios/{id})
export const deleteUsuario = async (id) => {
  const response = await fetch(`${API_BASE}/usuarios/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al eliminar usuario");
  }
  return response;
};
