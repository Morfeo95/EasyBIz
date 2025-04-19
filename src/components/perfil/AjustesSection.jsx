import React, { useState, useEffect } from 'react';
import useTranslations from '../../hooks/useTranslations';

const AjustesSection = ({ userData, onUpdateUser }) => {
  // Hook de traducciones
  const messages = useTranslations();

  // Estado del formulario
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  // Inicializa el formulario cuando llega userData
  useEffect(() => {
    if (userData) {
      setForm({
        nombre: userData.nombre || '',
        email: userData.email || '',
        password: '',
      });
    }
  }, [userData]);

  // Guardar hooks antes del return para mantener orden
  if (!messages?.perfil?.ajustesSection) {
    return <div>Loading...</div>;
  }

  // Extraer textos de traducción
  const { title } = messages.perfil.ajustesSection;
  const {
    nombre: labelNombre,
    email: labelEmail,
    password: labelPassword,
  } = messages.perfil.ajustesSection.labels;
  const {
    nombre: phNombre,
    email: phEmail,
    password: phPassword,
  } = messages.perfil.ajustesSection.placeholders;
  const buttonText = messages.perfil.ajustesSection.button;

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      id: userData.id,
      name: form.nombre,
      email: form.email,
      password: form.password,
    };
    onUpdateUser?.(updatedData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">{labelNombre}</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={phNombre}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">{labelEmail}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={phEmail}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">{labelPassword}</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={phPassword}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AjustesSection;