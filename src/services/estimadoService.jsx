const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const createEstimado = async (datos) => {
  const resp = await fetch(`${API_BASE}/estimado`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear estimado");
  }
  return resp.json();
};

export const updateEstimado = async (datos) => {
  const resp = await fetch(`${API_BASE}/estimado`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al actualizar estimado");
  }
  return resp.json();
};

export const fetchEstimadoById = async (id) => {
  const resp = await fetch(`${API_BASE}/estimado/${id}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error("Estimado no encontrado");
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener estimado");
  }
  return resp.json();
};

// Función para obtener la lista paginada de estimados del usuario
export const fetchEstimados = async (usuarioId, page = 0, size = 100) => {
  const resp = await fetch(
    `${API_BASE}/estimado/lista-estimados/${usuarioId}?page=${page}&size=${size}`,
    { headers: authHeaders() }
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener la lista de estimados");
  }
  return resp.json();
};

export const deleteEstimado = async (id) => {
  const resp = await fetch(`${API_BASE}/estimado/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al eliminar estimado");
  }
  return resp;
};
