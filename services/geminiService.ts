import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse, SearchEngine } from '../types';

// FIX: Per coding guidelines, assume API_KEY is present in the environment and do not add a check for it.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      description: "A list of recommended search engines based on the user's query.",
      items: {
        type: Type.OBJECT,
        properties: {
          engineId: {
            type: Type.STRING,
            description: "The unique ID of the recommended search engine.",
          },
          reason: {
            type: Type.STRING,
            description: "A brief explanation of why this search engine is recommended for the given query.",
          },
        },
        required: ["engineId", "reason"],
      },
    },
  },
  required: ["recommendations"],
};

const trendingTopicsSchema = {
  type: Type.OBJECT,
  properties: {
    topics: {
      type: Type.ARRAY,
      description: "A list of 5 current global trending search topics.",
      items: {
        type: Type.STRING,
        description: "A single trending topic."
      }
    }
  },
  required: ["topics"],
};

export const suggestEngines = async (query: string, engines: SearchEngine[], language: string): Promise<GeminiResponse> => {
  const engineList = engines.map(e => {
    const description = typeof e.description === 'object' ? e.description[language] || e.description['en'] : e.description;
    return `- ${e.name} (id: ${e.id}): ${description}`;
  }).join('\n');

  const prompt = `
    A user wants to perform a search. Analyze their query and recommend the most suitable search engines from the provided list.
    Provide 2 to 3 recommendations. The user's query is in the language "${language}". Your entire response, including the reasons, must be in that same language.

    USER QUERY: "${query}"

    AVAILABLE SEARCH ENGINES:
    ${engineList}

    Analyze the query's intent (e.g., technical, shopping, news, regional, privacy-focused) and match it to the strengths of the search engines.
    For example, if the query is in Chinese, recommend Baidu. If it's about privacy, recommend DuckDuckGo. For general queries, Google is a good choice.
    Your response must be a JSON object that strictly adheres to the provided schema. Do not include any markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as GeminiResponse;

    if (!parsedResponse || !Array.isArray(parsedResponse.recommendations)) {
        throw new Error("Invalid response structure from Gemini API.");
    }

    return parsedResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to parse or receive a valid response from Gemini API.");
  }
};

export const getTrendingTopics = async (language: string): Promise<{topics: string[]}> => {
  const prompt = `
    Provide a list of 5 current and diverse global trending search topics. These should be real, popular topics people are searching for right now.
    The response must be in the language with this code: "${language}".

    Your response must be a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: trendingTopicsSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as {topics: string[]};
  } catch (error) {
    console.error("Error fetching trending topics from Gemini API:", error);
    throw new Error("Failed to get trending topics.");
  }
};
