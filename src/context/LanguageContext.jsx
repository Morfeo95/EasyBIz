// Import necessary hooks from React
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context for managing the application's language
const LanguageContext = createContext();

// Define a LanguageProvider component that will wrap the application
export const LanguageProvider = ({ children }) => {
  // Set up a state variable for the language. 
  // Initialize it with a value from localStorage (if available) or default to 'es' (Spanish)
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'es');

  // Whenever the language changes, update it in localStorage for persistence
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  // Provide the language and function to update it to any child component via the context
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to easily access the LanguageContext in other components
export const useLanguage = () => useContext(LanguageContext);
