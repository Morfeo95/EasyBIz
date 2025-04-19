import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslations from '../../hooks/useTranslations';

const LanguageSwitcher = () => {
  // 1) Hooks siempre en el mismo orden
  const { language, setLanguage } = useLanguage();
  const messages = useTranslations();

  // 2) Effect sin retornos de JSX, solo lógica de idioma
  useEffect(() => {
    // Si aún no cargo translations, salgo
    if (!messages?.opencalc?.nav) return;

    const { languageSwitcher } = messages.opencalc.nav;
    const browserLang = navigator.language.slice(0, 2);

    if (!language && languageSwitcher.options[browserLang]) {
      setLanguage(browserLang);
    } else if (!language) {
      setLanguage('es');  // o 'en' según prefieras
    }
  }, [messages, language, setLanguage]);

  // 3) Guardia de render segura
  if (!messages?.opencalc?.nav) {
    return <div>Loading translations...</div>;
  }

  // 4) Ya podemos destructurar con garantía
  const { languageSwitcher } = messages.opencalc.nav;

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
        {Object.entries(languageSwitcher.options).map(([lang, label]) => (
          <option key={lang} value={lang}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
