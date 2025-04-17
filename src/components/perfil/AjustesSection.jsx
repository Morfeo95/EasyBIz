// src/components/perfil/AjustesSection.jsx
import React, { useState, useEffect } from 'react';

const AjustesSection = ({ userData, onUpdateUser }) => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  // Al cargar la data del usuario, inicializa el formulario.
  useEffect(() => {
    if (userData) {
      setForm({
        nombre: userData.nombre || '',
        email: userData.email || '',
        password: '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Al enviar, se convoca el callback; puedes realizar aquí una transformación 
    // para cambiar "nombre" a "name" si tu backend lo requiere.
    const updatedData = {
      id: userData.id,
      name: form.nombre,  // Mapea el campo 'nombre' a 'name'
      email: form.email,
      password: form.password,
    };

    if (onUpdateUser) {
      onUpdateUser(updatedData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Configuración de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Ingresa tu email"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Nueva contraseña (opcional)"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default AjustesSection;
