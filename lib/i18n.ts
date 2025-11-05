import { SearchEngine } from '../types';

export const translations = {
  en: {
    title: "Search Engine Recommender",
    subtitle: "Describe what you're looking for, and Gemini will suggest the best search engines for the job.",
    searchInputPlaceholder: "Type your search and press Enter...",
    geminiThinking: "Gemini is thinking...",
    recommendationsFor: "Recommendations for",
    trendingOnGoogle: "Trending on Google",
    error: "Sorry, something went wrong while getting recommendations. Please try again.",
    monthlySearchesLabel: "Monthly Searches",
  },
  es: {
    title: "Recomendador de Motores de Búsqueda",
    subtitle: "Describe lo que buscas y Gemini te sugerirá los mejores motores de búsqueda para la tarea.",
    searchInputPlaceholder: "Escribe tu búsqueda y presiona Enter...",
    geminiThinking: "Gemini está pensando...",
    recommendationsFor: "Recomendaciones para",
    trendingOnGoogle: "Tendencias en Google",
    error: "Lo sentimos, algo salió mal al obtener las recomendaciones. Por favor, inténtalo de nuevo.",
    monthlySearchesLabel: "Búsquedas Mensuales",
  },
};

export type Language = keyof typeof translations;

export const getLanguage = (): Language => {
  const lang = navigator.language.split('-')[0];
  return (Object.keys(translations).includes(lang)) ? lang as Language : 'en';
};

export const getTranslator = (lang: Language) => {
  return (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key];
  };
};

export const getTranslatedEngineData = (engine: SearchEngine, lang: Language): { description: string; monthlySearches: string } => {
    const description = typeof engine.description === 'object' 
      ? engine.description[lang] || engine.description.en 
      : engine.description;

    const monthlySearches = typeof engine.monthlySearches === 'object'
        ? engine.monthlySearches[lang] || engine.monthlySearches.en
        : engine.monthlySearches;
    
    return { description, monthlySearches };
}
