import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const MODULES = ['opencalc', 'index', 'perfil','login'];

const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const allTranslations = {};

      for (const module of MODULES) {
        try {
          const response = await fetch(`/locales/${module}/${language}.json`);
          if (!response.ok) {
            throw new Error(`Archivo no encontrado: ${response.status}`);
          }
          const json = await response.json();
          allTranslations[module] = json;
        } catch (error) {
          console.error(`❌ Error cargando /locales/${module}/${language}.json:`, error);
        }
      }

      setTranslations(allTranslations);
    };

    loadTranslations();
  }, [language]);

  return translations;
};

export default useTranslations;
