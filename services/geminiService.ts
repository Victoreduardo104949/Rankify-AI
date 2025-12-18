
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
  // A Vercel precisa que a chave esteja configurada em Settings -> Environment Variables
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    throw new Error("API_KEY_MISSING: A chave de API não foi encontrada. Se você está na Vercel, configure a variável de ambiente 'API_KEY' nas configurações do projeto e faça um redeploy.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Atue como um estrategista sênior de SEO especializado em Google Search.
    
    Palavra-chave alvo: "${keyword}"
    
    Gere uma estratégia completa e um PLANO ESTRATÉGICO DE IMPLEMENTAÇÃO detalhado:
    1. Título da Página (Title Tag): Keyword no início, 50-60 caracteres, focado em CTR.
    2. Meta Descrição: Persuasiva, com gatilhos mentais e CTA, 140-160 caracteres.
    3. Plano Estratégico: Divida em 3 fases (Fundação, Autoridade, Expansão). Para cada fase, sugira uma tarefa técnica ou de conteúdo extremamente prática.
    
    Importante: Retorne os dados estritamente em Português do Brasil no formato JSON conforme o schema definido.
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
      throw new Error("O modelo retornou uma resposta vazia. Tente uma palavra-chave diferente.");
    }

    try {
      return JSON.parse(text) as SEOData;
    } catch (parseError) {
      console.error("Erro ao processar JSON da IA:", text);
      throw new Error("Erro de formatação nos dados gerados pela IA. Por favor, tente novamente.");
    }
  } catch (error: any) {
    console.error("Erro na geração de SEO:", error);
    
    // Tratamento de erros específicos da API
    if (error.message?.includes('429')) {
      throw new Error("Limite de requisições atingido (Quota). Aguarde 60 segundos.");
    }
    if (error.message?.includes('403') || error.message?.includes('API_KEY_INVALID')) {
      throw new Error("Chave de API inválida ou sem permissão. Verifique sua conta no Google AI Studio.");
    }
    if (error.message?.includes('User location is not supported')) {
      throw new Error("A API do Gemini não está disponível na sua região atual (CORS/VPN pode ser necessário ou verifique as restrições do Google).");
    }
    
    throw new Error(error.message || "Falha na conexão com o motor de IA.");
  }
};
