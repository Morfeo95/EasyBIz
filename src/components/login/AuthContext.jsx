import React, { createContext, useState } from 'react';
import { loginService, registerService } from '../../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await loginService(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const userData = await registerService(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
