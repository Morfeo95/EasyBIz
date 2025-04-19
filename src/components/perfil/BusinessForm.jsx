import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dp1vldnej/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

const BusinessForm = ({ onSubmit }) => {
  // Hooks en tope para mantener orden constante
  const messages = useTranslations();
  const [name, setName] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [uploading, setUploading] = useState(false);

  // Retorno condicional después de todos los hooks
  if (!messages?.perfil?.businessForm) {
    return <div>Loading...</div>;
  }

  // Extraer textos una vez cargadas traducciones
  const {
    placeholders: { name: phName },
    upload: { uploading: txtUploading, label: uploadLabel },
    preview: previewText,
    button: buttonText,
  } = messages.perfil.businessForm;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUrlPhoto(data.secure_url);
    } catch (err) {
      console.error('Error subiendo imagen:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, urlPhoto });
    setName('');
    setUrlPhoto('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
      {/* Nombre del negocio */}
      <input
        type="text"
        placeholder={phName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Subir imagen */}
      <label className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition text-white px-4 py-2 rounded-xl cursor-pointer shadow">
        <ImagePlus className="w-5 h-5" />
        {uploading ? txtUploading : uploadLabel}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Vista previa de imagen (opcional) */}
      {urlPhoto && (
        <img
          src={urlPhoto}
          alt={previewText}
          className="w-32 h-32 object-cover rounded-xl border shadow-md self-start"
        />
      )}

      {/* Botón de envío */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="self-start bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl shadow"
      >
        {buttonText}
      </motion.button>
    </form>
  );
};

export default BusinessForm;