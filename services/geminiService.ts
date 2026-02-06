
import { GoogleGenAI, Type } from "@google/genai";
import { GuykaSite, SearchResult } from "../types";

export async function searchInternalSites(query: string, sites: GuykaSite[]): Promise<SearchResult[]> {
  // Initialize AI client per request for dynamic context safety
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const sitesContext = sites.map(s => `[${s.domain}] ${s.name}: ${s.description}`).join("\n");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find relevant guyka sites for the search query: "${query}" based on this registry:
    ${sitesContext}
    
    Return a JSON array of search results with title, url, snippet, and source (always "INTERNAL").`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            url: { type: Type.STRING },
            snippet: { type: Type.STRING },
            source: { type: Type.STRING }
          },
          required: ["title", "url", "snippet", "source"]
        }
      }
    }
  });

  try {
    // Accessing .text property directly as per @google/genai specification
    return JSON.parse(response.text?.trim() || "[]");
  } catch (e) {
    console.error("Failed to parse search results", e);
    return [];
  }
}

export async function getSiteSummary(repoUrl: string): Promise<{ name: string, description: string }> {
  // Initialize AI client per request for dynamic context safety
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user wants to host a site from this repository: ${repoUrl}.
    Suggest a short, professional Name and a 1-sentence Description for this site based ONLY on the URL name.
    
    Return JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["name", "description"]
      }
    }
  });

  try {
    // Accessing .text property directly as per @google/genai specification
    return JSON.parse(response.text?.trim() || "{}");
  } catch (e) {
    return { name: "New Guyka Site", description: "A site hosted on the Guyka platform." };
  }
}
