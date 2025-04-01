import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Import custom context for language management
import useTranslations from '../hooks/useTranslations'; // Custom hook for handling translations

// Define the LanguageSwitcher component
const LanguageSwitcher = () => {
  // Access language state and setter from LanguageContext
  const { language, setLanguage } = useLanguage();
  // Fetch translation messages using custom hook
  const messages = useTranslations();
  // Return null (render nothing) if translations aren't loaded yet
  if (!messages) return null;

  // Destructure the language switcher translations from the nav section
  const { languageSwitcher } = messages.nav;

  // Handler function to update the language when the select value changes
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Set new language based on selected option
  };

  return (
    // Container for the language switcher UI
    <div className="flex items-center">
      {/* Label for the language selector */}
      <label className="mr-2 font-ubuntu text-green-700">
        {languageSwitcher.label}: {/* Translated label (e.g., "Language") */}
      </label>
      {/* Dropdown select for choosing the language */}
      <select
        value={language} // Current selected language
        onChange={handleLanguageChange} // Call handler on selection change
        className="p-1 border border-green-300 rounded" // Basic styling
      >
        {/* Map through available language options */}
        {Object.keys(languageSwitcher.options).map((lang) => (
          <option key={lang} value={lang}>
            {languageSwitcher.options[lang]} {/* Display translated language name */}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the component for use in other parts of the app
export default LanguageSwitcher;