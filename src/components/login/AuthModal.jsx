// src/components/perfil/AuthModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import useTranslations from '../../hooks/useTranslations';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ onClose }) => {
  // Hooks
  const messagesAll = useTranslations();
  const msg = messagesAll?.login?.authModal;
  const [isLogin, setIsLogin] = useState(true);

  // Guard: wait for translations
  if (!msg) {
    return <div>Loading...</div>;
  }

  const {
    loginTitle,
    registerTitle,
    noAccountText,
    registerLink,
    haveAccountText,
    loginLink
  } = msg;

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
          <h2 className="text-2xl font-bold mb-4">{loginTitle}</h2>
          <LoginForm onClose={onClose} />
          <p className="mt-4 text-center">
            {noAccountText}{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              {registerLink}
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{registerTitle}</h2>
          <RegisterForm onClose={onClose} />
          <p className="mt-4 text-center">
            {haveAccountText}{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              {loginLink}
            </span>
          </p>
        </>
      )}
    </motion.div>
  );
};

export default AuthModal;
