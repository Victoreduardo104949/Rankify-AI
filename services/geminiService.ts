
import { GoogleGenAI, Type } from "@google/genai";
import { SEOData } from "../types";

const seoSchema = {
  type: Type.OBJECT,
  properties: {
    titleTag: { type: Type.STRING },
    metaDescription: { type: Type.STRING },
    slug: { type: Type.STRING },
    h1: { type: Type.STRING },
    contentTopicSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
    imageAltSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    internalLinkIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
    externalLinkIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
    faq: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING }
        },
        required: ["question", "answer"]
      }
    },
    searchIntent: { type: Type.STRING },
    targetAudience: { type: Type.STRING },
    strategicPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING, description: "Fase 1: Fundação, Fase 2: Autoridade ou Fase 3: Expansão" },
          task: { type: Type.STRING, description: "Ação específica baseada nos dados acima" },
          priority: { type: Type.STRING, enum: ["Crítica", "Alta", "Média"] }
        },
        required: ["phase", "task", "priority"]
      }
    }
  },
  required: [
    "titleTag", "metaDescription", "slug", "h1", 
    "contentTopicSuggestions", "secondaryKeywords", 
    "imageAltSuggestions", "internalLinkIdeas", 
    "externalLinkIdeas", "faq", "searchIntent", "targetAudience",
    "strategicPlan"
  ]
};

export const generateSEOStrategy = async (keyword: string): Promise<SEOData> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("A chave de API não foi configurada corretamente no ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Atue como um estrategista sênior de SEO.
    
    Palavra-chave alvo: "${keyword}"
    
    Gere uma estratégia completa e um PLANO ESTRATÉGICO DE IMPLEMENTAÇÃO:
    1. Título da Página (Title Tag): Keyword no início, 50-60 caracteres.
    2. Meta Descrição: Persuasiva, com CTA, 140-160 caracteres.
    3. Plano Estratégico: Divida em 3 fases (Fundação, Autoridade, Expansão). Para cada fase, sugira uma tarefa prática baseada na análise.
    
    Retorne os dados em Português do Brasil no formato JSON estrito conforme o schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: seoSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("O modelo não retornou conteúdo. Tente novamente.");
    }

    return JSON.parse(text) as SEOData;
  } catch (error: any) {
    console.error("Erro na geração de SEO:", error);
    if (error.message?.includes('429')) {
      throw new Error("Muitas requisições. Por favor, aguarde alguns segundos antes de tentar novamente.");
    }
    throw new Error(error.message || "Falha ao gerar estratégia de SEO.");
  }
};
