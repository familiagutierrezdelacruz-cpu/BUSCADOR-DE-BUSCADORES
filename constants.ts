import React from 'react';
import { SearchEngine } from './types';

// Simple, scalable SVG-based logos
// FIX: Converted JSX to React.createElement to support .ts file extension.
// FIX: Export `GoogleLogo` to resolve import error in `TrendingTopics.tsx`.
export const GoogleLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 24 24", className: className, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('path', { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
    React.createElement('path', { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
    React.createElement('path', { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", fill: "#FBBC05" }),
    React.createElement('path', { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
  )
);
// FIX: Converted JSX to React.createElement to support .ts file extension.
const BingLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 24 24", className: className, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('path', { d: "M10.388 15.35l4.312-2.544-6.42 2.924V8.37l6.42-2.924L10.388 8.09v7.26z", fill: "#008373" }),
    React.createElement('path', { d: "M4 5.446l6.388-2.924v16.58l-6.388 2.924V5.446z", fill: "#FFB900" }),
    React.createElement('path', { d: "M10.388 2.522l10.012 4.414v9.676l-10.012 4.91V2.522z", fill: "#F25022" })
  )
);
// FIX: Converted JSX to React.createElement to support .ts file extension.
const YahooLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 100 100", className: className, preserveAspectRatio: "xMidYMid meet" },
    React.createElement('text', { x: "50", y: "70", fontSize: "60", fontWeight: "bold", textAnchor: "middle", fill: "white" }, 'Y!')
  )
);
// FIX: Converted JSX to React.createElement to support .ts file extension.
const BaiduLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 100 100", className: className, preserveAspectRatio: "xMidYMid meet" },
    React.createElement('text', { x: "50", y: "70", fontSize: "50", textAnchor: "middle", fill: "white" }, '百度')
  )
);
// FIX: Converted JSX to React.createElement to support .ts file extension.
const YandexLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 100 100", className: className, preserveAspectRatio: "xMidYMid meet" },
    React.createElement('text', { x: "50", y: "70", fontSize: "60", fontWeight: "bold", textAnchor: "middle", fill: "white" }, 'Y')
  )
);
// FIX: Converted JSX to React.createElement to support .ts file extension.
const DuckDuckGoLogo: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', { viewBox: "0 0 24 24", className: className, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('circle', { cx: "12", cy: "12", r: "10", fill: "#DE5833" }),
    React.createElement('circle', { cx: "12", cy: "12", r: "7", fill: "white" }),
    React.createElement('circle', { cx: "12", cy: "12", r: "4", fill: "#DE5833" })
  )
);


export const SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    popularity: 100,
    color: 'fill-blue-500',
    url: 'https://www.google.com',
    searchUrl: 'https://www.google.com/search?q=%s',
    description: {
      en: 'The most popular search engine worldwide, offering comprehensive and fast results for general queries, technical questions, and product searches.',
      es: 'El motor de búsqueda más popular del mundo, que ofrece resultados completos y rápidos para consultas generales, preguntas técnicas y búsquedas de productos.',
    },
    logo: GoogleLogo,
    monthlySearches: {
      en: 'Approx. 90B+',
      es: 'Aprox. 90B+',
    },
  },
  {
    id: 'bing',
    name: 'Bing',
    popularity: 35,
    color: 'fill-cyan-400',
    url: 'https://www.bing.com',
    searchUrl: 'https://www.bing.com/search?q=%s',
    description: {
      en: 'Microsoft\'s search engine, known for its strong image and video search capabilities and integration with Microsoft products.',
      es: 'El motor de búsqueda de Microsoft, conocido por sus potentes capacidades de búsqueda de imágenes y videos y su integración con los productos de Microsoft.',
    },
    logo: BingLogo,
    monthlySearches: {
      en: 'Approx. 6B+',
      es: 'Aprox. 6B+',
    },
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    popularity: 20,
    color: 'fill-purple-500',
    url: 'https://search.yahoo.com',
    searchUrl: 'https://search.yahoo.com/search?p=%s',
    description: {
      en: 'A long-standing search engine and web portal, providing news, finance, and media content alongside its search results.',
      es: 'Un portal web y motor de búsqueda de larga trayectoria, que proporciona noticias, finanzas y contenido multimedia junto con sus resultados de búsqueda.',
    },
    logo: YahooLogo,
    monthlySearches: {
      en: 'Approx. 3.5B+',
      es: 'Aprox. 3.5B+',
    },
  },
  {
    id: 'baidu',
    name: 'Baidu',
    popularity: 60,
    color: 'fill-blue-600',
    url: 'https://www.baidu.com',
    searchUrl: 'https://www.baidu.com/s?wd=%s',
    description: {
      en: 'The dominant search engine in China, specializing in Chinese language content and services.',
      es: 'El motor de búsqueda dominante en China, especializado en contenido y servicios en idioma chino.',
    },
    logo: BaiduLogo,
    monthlySearches: {
      en: 'Approx. 5B+',
      es: 'Aprox. 5B+',
    },
  },
  {
    id: 'yandex',
    name: 'Yandex',
    popularity: 25,
    color: 'fill-red-600',
    url: 'https://yandex.com',
    searchUrl: 'https://yandex.com/search/?text=%s',
    description: {
      en: 'The leading search engine in Russia, offering a wide range of services including maps, translation, and cloud storage, with a focus on Cyrillic languages.',
      es: 'El motor de búsqueda líder en Rusia, que ofrece una amplia gama de servicios que incluyen mapas, traducción y almacenamiento en la nube, con un enfoque en los idiomas cirílicos.',
    },
    logo: YandexLogo,
    monthlySearches: {
      en: 'Approx. 3B+',
      es: 'Aprox. 3B+',
    },
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    popularity: 30,
    color: 'fill-orange-600',
    url: 'https://duckduckgo.com',
    searchUrl: 'https://duckduckgo.com/?q=%s',
    description: {
      en: 'A privacy-focused search engine that does not track its users, providing unbiased results from various sources.',
      es: 'Un motor de búsqueda centrado en la privacidad que no rastrea a sus usuarios, proporcionando resultados imparciales de diversas fuentes.',
    },
    logo: DuckDuckGoLogo,
    monthlySearches: {
      en: 'Approx. 2.5B+',
      es: 'Aprox. 2.5B+',
    },
  },
];
