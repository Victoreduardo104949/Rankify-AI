
export interface FaqItem {
  question: string;
  answer: string;
}

export interface StrategicTask {
  phase: string;
  task: string;
  priority: 'Crítica' | 'Alta' | 'Média';
}

export interface SEOData {
  titleTag: string;
  metaDescription: string;
  slug: string;
  h1: string;
  contentTopicSuggestions: string[];
  secondaryKeywords: string[];
  imageAltSuggestions: string[];
  internalLinkIdeas: string[];
  externalLinkIdeas: string[];
  faq: FaqItem[];
  searchIntent: string;
  targetAudience: string;
  strategicPlan: StrategicTask[];
}

export interface User {
  email: string;
  isPro: boolean;
  token?: string;
}

export interface UserCredits {
  remaining: number;
  total: number;
  isPro: boolean;
  isAgency?: boolean;
}

export interface AgencyConfig {
  name: string;
  logoUrl: string;
  primaryColor: string;
  contactEmail?: string;
  websiteUrl?: string;
  footerText?: string;
  enabled: boolean;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  data: SEOData | null;
}
