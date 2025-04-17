const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

/**
 * Obtiene productos de un negocio (paginado)
 */
export const fetchProductsByBusiness = async (
  negocioId,
  { page = 0, size = 10, sort = "id,asc" } = {}
) => {
  if (!negocioId) return { content: [] };
  const params = new URLSearchParams({ page, size, sort });
  const resp = await fetch(
    `${API_BASE}/producto/productos/${negocioId}?${params.toString()}`,
    { headers: authHeaders() }
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener productos");
  }
  return resp.json();
};

/**
 * Obtiene un producto por su ID
 */
export const fetchProductById = async (id) => {
  const resp = await fetch(`${API_BASE}/producto/${id}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error("Producto no encontrado");
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al obtener producto");
  }
  return resp.json();
};

/**
 * Crea un nuevo producto
 */
export const createProduct = async (datos) => {
  const payload = {
    negocioId: datos.negocioId,
    nombre: datos.nombre,
    precio: datos.precio,
    descripcion: datos.descripcion,
    estimadoId: datos.estimadoId ?? null,
  };
  const resp = await fetch(`${API_BASE}/producto`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear producto");
  }
  return resp.json();
};

/**
 * Actualiza un producto existente
 */
export const updateProduct = async (datos) => {
  const payload = {
    id: datos.id,
    nombre: datos.nombre,
    precio: datos.precio,
    descripcion: datos.descripcion,
  };
  const resp = await fetch(`${API_BASE}/producto`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error("Producto no encontrado");
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al actualizar producto");
  }
  return resp.json();
};

/**
 * Elimina un producto por su ID
 */
export const deleteProduct = async (id) => {
  const resp = await fetch(`${API_BASE}/producto/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error("Producto no encontrado");
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al eliminar producto");
  }
};
