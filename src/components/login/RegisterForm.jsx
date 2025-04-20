// src/components/RegisterForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useTranslations from "../../hooks/useTranslations";

const RegisterForm = ({ onClose }) => {
  // 1) Hooks always in the same order
  const messagesAll = useTranslations();
  const msg = messagesAll?.login?.registerForm;

  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2) Guard until translations loaded
  if (!msg) {
    return <div>Loading...</div>;
  }

  // 3) Destructure translated strings
  const {
    nameLabel,
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    passwordMismatchError,
    registerButton,
    registering
  } = msg;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(passwordMismatchError);
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      onClose?.();
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div>
        <label htmlFor="reg-name" className="block mb-1">
          {nameLabel}
        </label>
        <input
          type="text"
          id="reg-name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-email" className="block mb-1">
          {emailLabel}
        </label>
        <input
          type="email"
          id="reg-email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-password" className="block mb-1">
          {passwordLabel}
        </label>
        <input
          type="password"
          id="reg-password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="block mb-1">
          {confirmPasswordLabel}
        </label>
        <input
          type="password"
          id="confirm-password"
          className="w-full border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-500 disabled:opacity-50"
      >
        {loading ? registering : registerButton}
      </button>
    </form>
  );
};

export default RegisterForm;
