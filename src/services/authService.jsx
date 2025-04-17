const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const registerService = async (name, email, password) => {
  const resp = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Error al registrar el usuario");
  }

  // Devuelve { id, token } para que quien llame maneje el almacenamiento
  return await resp.json();
};

export const loginService = async (email, password) => {
  const resp = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Credenciales inválidas");
  }

  // Devuelve { id, token } para que quien llame maneje el almacenamiento
  return await resp.json();
};