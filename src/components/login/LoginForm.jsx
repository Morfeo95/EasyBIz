// src/components/LoginForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useTranslations from "../../hooks/useTranslations";

const LoginForm = ({ onClose }) => {
  // 1) Hooks always in same order
  const messagesAll = useTranslations();
  const msg = messagesAll?.login?.loginForm;

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2) Guard until translations loaded
  if (!msg) {
    return <div>Loading...</div>;
  }

  // 3) Destructure translation texts
  const {
    emailLabel,
    passwordLabel,
    login: loginText,
    logging
  } = msg;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      onClose?.();
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-96 flex flex-col gap-4">
      <div>
        <label htmlFor="login-email" className="block mb-1">
          {emailLabel}
        </label>
        <input
          type="email"
          id="login-email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block mb-1">
          {passwordLabel}
        </label>
        <input
          type="password"
          id="login-password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-500 disabled:opacity-50"
      >
        {loading ? logging : loginText}
      </button>
    </form>
  );
};

export default LoginForm;
