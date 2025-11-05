import React from 'react';

// A type to allow a property to be a single string for backward compatibility
// or a dictionary of strings for i18n
type LocalizedString = string | Record<string, string>;

export interface SearchEngine {
  id: string;
  name: string;
  popularity: number; // A relative score, e.g., 100 for the top one
  color: string;
  url: string;
  searchUrl: string; // URL with %s as placeholder for the query
  description: LocalizedString;
  logo: React.FC<{ className?: string }>;
  monthlySearches: LocalizedString;
}

export interface SearchEngineNode extends SearchEngine {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius: number;
  // Overwrite LocalizedString with the final, translated string
  description: string;
  monthlySearches: string;
}

export interface GeminiRecommendation {
  engineId: string;
  reason: string;
}

export interface GeminiResponse {
  recommendations: GeminiRecommendation[];
}
