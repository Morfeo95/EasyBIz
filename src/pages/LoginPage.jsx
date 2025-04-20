// src/pages/LoginPage.jsx
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useTranslations from "../hooks/useTranslations";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

const LoginPage = () => {
  // Hooks
  const messagesAll = useTranslations();
  const msg = messagesAll?.login?.loginPage;
  const { user } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);

  // Guard: wait for translations
  if (!msg) {
    return <div>Loading...</div>;
  }

  const {
    titleLogin,
    titleRegister,
    noAccountText,
    registerLink,
    haveAccountText,
    loginLink
  } = msg;

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? titleRegister : titleLogin}
        </h1>
        {isRegister ? (
          <RegisterForm onClose={() => setIsRegister(false)} />
        ) : (
          <LoginForm />
        )}
        <div className="mt-4 text-center">
          {isRegister ? (
            <>
              {haveAccountText}{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-500 hover:underline"
              >
                {loginLink}
              </button>
            </>
          ) : (
            <>
              {noAccountText}{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-500 hover:underline"
              >
                {registerLink}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
