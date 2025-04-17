// src/pages/LoginPage.jsx
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm"; // Asegúrate de que la ruta sea la correcta

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);

  // Si ya hay un usuario autenticado, redirige al perfil
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-sm">
        {isRegister ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Regístrate</h1>
            <RegisterForm onClose={() => setIsRegister(false)} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Inicia sesión</h1>
            <LoginForm />
          </>
        )}
        <div className="mt-4 text-center">
          {isRegister ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-500 hover:underline"
              >
                Inicia sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-500 hover:underline"
              >
                Regístrate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
