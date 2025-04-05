import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg relative w-11/12 max-w-md"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <X size={24} />
      </motion.button>
      {isLogin ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
          <LoginForm />
          <p className="mt-4 text-center">
            ¿No tienes cuenta?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Regístrate
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
          <RegisterForm />
          <p className="mt-4 text-center">
            ¿Ya tienes cuenta?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Inicia Sesión
            </span>
          </p>
        </>
      )}
    </motion.div>
  );
};

export default AuthModal;
