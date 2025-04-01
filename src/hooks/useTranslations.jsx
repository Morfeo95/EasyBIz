// Import useState and useEffect hooks from React
import { useState, useEffect } from 'react';
// Import the useLanguage hook to access the current language from context
import { useLanguage } from '../context/LanguageContext';

// Define the useTranslations hook which will load translation messages based on the current language
const useTranslations = () => {
  // Get the current language from the LanguageContext
  const { language } = useLanguage();
  // State to store the loaded translation messages
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    // Build the path to the translation file (e.g., 'esp.json', 'en.json', etc.)
    // Assuming that the BASE_URL environment variable points to the location of these files
    fetch(`${import.meta.env.BASE_URL}${language}.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error loading translations:', err));
  }, [language]); // Re-run the effect whenever the language changes

  // Return the loaded translation messages
  return messages;
};

export default useTranslations;
