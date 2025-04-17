// src/services/profileService.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ——— Listar negocios del usuario ———
export const fetchBusinesses = async () => {
  const usuarioId = Number(localStorage.getItem("id"));
  const resp = await fetch(`${API_BASE}/negocios/usuario/${usuarioId}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener negocios");
  }
  const { content } = await resp.json();
  return content;
};

// ——— Obtener un negocio por ID ———
export const fetchBusinessById = async (id) => {
  const resp = await fetch(`${API_BASE}/negocios/${id}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error("Negocio no encontrado");
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener negocio");
  }
  return resp.json();
};

// ——— Crear negocio ———
export const createBusiness = async ({ name, urlPhoto, productos }) => {
  const usuarioId = Number(localStorage.getItem("id"));
  const payload = { usuarioId, name, urlPhoto, productos };
  const resp = await fetch(`${API_BASE}/negocios`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear negocio");
  }
  return resp.json();
};

// ——— Actualizar negocio ———
export const updateBusiness = async ({ id, usuarioId, name, urlPhoto, productos }) => {
  const payload = { id, usuarioId, name, urlPhoto, productos };
  const resp = await fetch(`${API_BASE}/negocios`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al actualizar negocio");
  }
  return resp.json();
};

// ——— Eliminar negocio ———
export const deleteBusiness = async (id) => {
  const resp = await fetch(`${API_BASE}/negocios/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al eliminar negocio");
  }
  return resp;
};
