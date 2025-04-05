import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslations from '../../hooks/useTranslations';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const messages = useTranslations();

  // Mover useEffect antes del return condicional
  useEffect(() => {
    // Asegurarse de que ya se han cargado las traducciones
    if (!messages) return;
    const { languageSwitcher } = messages.nav;
    const browserLang = navigator.language.slice(0, 2);
    if (!language && languageSwitcher.options[browserLang]) {
      setLanguage(browserLang);
    } else if (!language) {
      setLanguage('en');
    }
  }, [messages, language, setLanguage]);

  // Ahora se puede condicionar el render sin alterar el orden de los Hooks
  if (!messages) return <div>Loading...</div>;

  const { languageSwitcher } = messages.nav;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center">
      <label className="mr-2 font-ubuntu text-green-700">
        {languageSwitcher.label}:
      </label>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="p-1 border border-green-300 rounded"
      >
        {Object.keys(languageSwitcher.options).map((lang) => (
          <option key={lang} value={lang}>
            {languageSwitcher.options[lang]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
