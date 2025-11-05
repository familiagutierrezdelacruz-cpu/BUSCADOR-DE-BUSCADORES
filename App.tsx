import React, { useState, useMemo, useEffect } from 'react';
import { SearchInput } from './components/SearchInput';
import { PlanetarySystem } from './components/PlanetarySystem';
import { LoadingSpinner } from './components/LoadingSpinner';
import { suggestEngines, getTrendingTopics } from './services/geminiService';
import { SEARCH_ENGINES } from './constants';
import { GeminiRecommendation, SearchEngineNode } from './types';
import { TrendingTopics } from './components/TrendingTopics';
import { getLanguage, getTranslator, getTranslatedEngineData } from './lib/i18n';

// Detect language once on app load
const language = getLanguage();
const t = getTranslator(language);

function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<GeminiRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const response = await getTrendingTopics(language);
        setTrendingTopics(response.topics);
      } catch (e) {
        console.error("Failed to fetch trending topics:", e);
      } finally {
        setIsTopicsLoading(false);
      }
    };
    fetchTrendingTopics();
  }, []);

  const searchEngineNodes: SearchEngineNode[] = useMemo(() =>
    SEARCH_ENGINES.map(engine => {
      const { description, monthlySearches } = getTranslatedEngineData(engine, language);
      return {
        ...engine,
        radius: 0,
        description,
        monthlySearches,
      };
    }), 
    []
  );

  const highlightedEngineIds = useMemo(() => recommendations.map(r => r.engineId), [recommendations]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setRecommendations([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuery(searchQuery); 
    try {
      const response = await suggestEngines(searchQuery, SEARCH_ENGINES, language);
      setRecommendations(response.recommendations);
    } catch (e) {
      setError(t('error'));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePlanetClick = (engine: SearchEngineNode) => {
    if (query.trim() && recommendations.length > 0) { 
        window.open(engine.searchUrl.replace('%s', encodeURIComponent(query)), '_blank');
    } else {
        window.open(engine.url, '_blank');
    }
  };

  const handleTopicClick = (topic: string) => {
    setQuery(topic);
    handleSearch(topic);
  }

  return (
    <main className="text-white min-h-screen flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop')" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900/75" />
      </div>
      
      <div className="relative z-10 w-full h-screen flex flex-col">
        <header className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center">
          <TrendingTopics 
            title={t('trendingOnGoogle')}
            topics={trendingTopics} 
            isLoading={isTopicsLoading} 
            onTopicClick={handleTopicClick}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-1 mt-2 md:mb-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t('title')}
          </h1>
          <p className="text-center text-gray-300 md:text-gray-400 text-sm md:text-base mb-4 md:mb-6">
            {t('subtitle')}
          </p>
          <SearchInput 
            query={query} 
            setQuery={setQuery} 
            onSearch={() => handleSearch(query)} 
            isLoading={isLoading} 
            placeholder={t('searchInputPlaceholder')}
          />
        </header>

        <div className="flex-grow w-full h-full">
          <PlanetarySystem 
            searchEngines={searchEngineNodes} 
            highlightedEngines={highlightedEngineIds}
            onPlanetClick={handlePlanetClick}
            monthlySearchesLabel={t('monthlySearchesLabel')}
          />
        </div>

        <footer className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-4xl flex justify-center">
            {isLoading && (
              <div className="flex items-center justify-center space-x-3 bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg">
                <LoadingSpinner />
                <span className="text-gray-300">{t('geminiThinking')}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-500/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <p>{error}</p>
              </div>
            )}

            {!isLoading && recommendations.length > 0 && (
              <div className="bg-slate-800/80 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-lg w-full">
                <h3 className="font-bold text-base md:text-lg mb-2 text-cyan-300 truncate">
                  {t('recommendationsFor')} "{query}"
                </h3>
                <ul className="space-y-2 max-h-[33vh] overflow-y-auto">
                  {recommendations.map(({ engineId, reason }) => {
                    const engine = SEARCH_ENGINES.find(e => e.id === engineId);
                    if (!engine) return null;
                    return (
                      <li key={engineId} className="p-2 bg-slate-700/50 rounded-md text-sm">
                        <p className="font-semibold text-white">{engine.name}: <span className="font-normal text-gray-300">{reason}</span></p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
        </footer>
      </div>
    </main>
  );
}

export default App;