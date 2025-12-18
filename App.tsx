
import React, { useState, useEffect } from 'react';
import { generateSEOStrategy } from './services/geminiService';
import { SEOData, UserCredits, AgencyConfig, User } from './types';
import { ResultsDisplay } from './components/ResultsDisplay';
import { SEOTable } from './components/SEOTable';
import { UserGuide } from './components/UserGuide';
import { AdUnit } from './components/AdUnit';
import { BrandingSettings } from './components/BrandingSettings';
import { PartnerPerks } from './components/PartnerPerks';
import { SEOReport } from './components/SEOReport';
import { AuthModal } from './components/AuthModal';
import { 
  Search, 
  Sparkles, 
  Crown, 
  LayoutGrid, 
  Table as TableIcon, 
  Check, 
  X,
  Loader2,
  ExternalLink,
  Target,
  Zap,
  BookOpen,
  Building2,
  Printer,
  Gift,
  PartyPopper,
  Lock,
  Star,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  FileText,
  Eye,
  User as UserIcon,
  LogOut,
  TrendingUp
} from 'lucide-react';

const STRIPE_PAYMENT_LINK: string = 'https://buy.stripe.com/test_aFadR9fPM0SQ8V4fIh87K00'; 
const IS_TEST_MODE = STRIPE_PAYMENT_LINK.includes('test_');

const SAMPLE_DATA: SEOData = {
  titleTag: "SEO Master: O Guia Definitivo para Rankear em 2025",
  metaDescription: "Descubra as estratégias secretas que as agências usam para dominar a primeira página do Google. Conteúdo atualizado com foco em IA e Core Web Vitals.",
  slug: "guia-definitivo-seo-2025",
  h1: "Como Dominar o Google em 2025 com Inteligência Artificial",
  contentTopicSuggestions: [
    "O que mudou no SEO com a Inteligência Artificial",
    "Fatores de Rankeamento Críticos (Core Web Vitals)",
    "Otimização de Conteúdo para Intenção de Busca",
    "Estratégias de Link Building de Alta Autoridade",
    "FAQ: Principais dúvidas sobre o futuro do SEO"
  ],
  secondaryKeywords: ["seo para ia", "otimização de buscas", "ctr engine", "vitals google", "estratégia de conteúdo"],
  imageAltSuggestions: [
    "Gráfico mostrando aumento de tráfego orgânico com Rankify AI",
    "Interface do dashboard de SEO otimizado",
    "Exemplo de meta tags estruturadas"
  ],
  internalLinkIdeas: ["Blog: O que é SEO?", "Serviços: Consultoria", "Cases de Sucesso"],
  externalLinkIdeas: ["Google Search Central", "Ahrefs Guide", "Moz Beginner Guide"],
  faq: [
    { question: "Quanto tempo demora para ver resultados?", answer: "Geralmente entre 3 a 6 meses para estratégias competitivas." },
    { question: "O que é LSI?", answer: "Latent Semantic Indexing são termos relacionados ao tópico principal." }
  ],
  searchIntent: "Informativa e Educacional",
  targetAudience: "Donos de agências, Consultores de Marketing e Blogueiros",
  strategicPlan: [
    { phase: "Fase 1: Fundação", task: "Implementar Meta Title e H1 Otimizados conforme Página 2", priority: "Crítica" },
    { phase: "Fase 2: Autoridade", task: "Adicionar FAQ Schema para capturar Featured Snippets", priority: "Alta" },
    { phase: "Fase 3: Expansão", task: "Iniciar Link Building interno focando nas keywords LSI", priority: "Média" }
  ]
};

const App: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [data, setData] = useState<SEOData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'guide' | 'agency' | 'perks'>('guide');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const [credits, setCredits] = useState<UserCredits>(() => {
    // Inicialização do estado via função para ler o localStorage imediatamente
    const savedCredits = localStorage.getItem('rankify_credits');
    if (savedCredits) {
      return JSON.parse(savedCredits);
    }
    return {
      remaining: 3,
      total: 3,
      isPro: false,
      isAgency: false
    };
  });

  const [agencyConfig, setAgencyConfig] = useState<AgencyConfig>({
    name: 'Minha Agência Digital',
    logoUrl: '',
    primaryColor: '#4f46e5',
    contactEmail: 'contato@agencia.com',
    websiteUrl: 'www.agencia.com',
    footerText: 'Estratégia SEO Profissional',
    enabled: false
  });

  // Sincroniza créditos com localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('rankify_credits', JSON.stringify(credits));
  }, [credits]);

  // Persistência de Sessão e Verificação de URL
  useEffect(() => {
    const savedUser = localStorage.getItem('rankify_session');
    if (savedUser) {
      const user = JSON.parse(savedUser) as User;
      handleLogin(user);
    }

    try {
      if (typeof window !== 'undefined' && window.location?.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('success') === 'true' || params.get('session_id')) {
          activatePro();
        }
      }
    } catch (e) {
      console.warn("Ambiente restrito: Não foi possível ler parâmetros da URL.");
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('rankify_session', JSON.stringify(user));
    
    if (user.isPro) {
      setCredits({
        remaining: 9999,
        total: 9999,
        isPro: true,
        isAgency: true
      });
    } else {
      // Se logar como não-pro, mantém os créditos que já tinha no navegador
      const savedCredits = localStorage.getItem('rankify_credits');
      if (savedCredits) {
        setCredits(JSON.parse(savedCredits));
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rankify_session');
    // Ao deslogar, reseta para os créditos salvos localmente ou o padrão
    const savedCredits = localStorage.getItem('rankify_credits');
    if (savedCredits) {
      setCredits(JSON.parse(savedCredits));
    } else {
      setCredits({
        remaining: 3,
        total: 3,
        isPro: false,
        isAgency: false
      });
    }
    setViewMode('guide');
  };

  const activatePro = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const proCredits = {
        remaining: 9999,
        total: 9999,
        isPro: true,
        isAgency: true
      };
      setCredits(proCredits);
      localStorage.setItem('rankify_credits', JSON.stringify(proCredits));
      
      setShowSuccessToast(true);
      setIsUpgradeModalOpen(false);
      setIsProcessingPayment(false);
    }, 1500);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    if (credits.remaining <= 0 && !credits.isPro) {
      setIsUpgradeModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateSEOStrategy(keyword);
      if (result) {
        setData(result);
        setViewMode('cards');
        if (!credits.isPro) {
          setCredits(prev => {
            const next = { ...prev, remaining: Math.max(0, prev.remaining - 1) };
            return next;
          });
        }
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setViewMode('guide');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleData = () => {
    setData(SAMPLE_DATA);
    setViewMode('cards');
  };

  const handlePrint = () => {
    if (!data) return;
    setIsPreparingPDF(true);
    setTimeout(() => {
      window.print();
      setIsPreparingPDF(false);
    }, 800);
  };

  const primaryStyle = (agencyConfig.enabled && credits.isPro) 
    ? { backgroundColor: agencyConfig.primaryColor } 
    : { backgroundColor: '#4f46e5' };

  const primaryText = (agencyConfig.enabled && credits.isPro) 
    ? { color: agencyConfig.primaryColor } 
    : { color: '#4f46e5' };

  const headerLogo = agencyConfig.enabled && agencyConfig.logoUrl && credits.isPro ? (
    <img src={agencyConfig.logoUrl} alt={agencyConfig.name} className="h-8 object-contain" />
  ) : (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg text-white" style={primaryStyle}>
        <Zap size={20} fill="currentColor" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        Rank<span style={primaryText}>ify</span>
      </span>
    </div>
  );

  return (
    <>
      <div className="no-print min-h-screen flex flex-col">
        {showSuccessToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-top-4 duration-500 w-full max-w-sm px-4">
            <div className="bg-emerald-600 text-white p-5 rounded-[28px] shadow-2xl flex items-center gap-4 border border-emerald-500">
              <div className="bg-white/20 p-3 rounded-2xl">
                <PartyPopper size={28} />
              </div>
              <div className="flex-1">
                <p className="font-black text-base">Rankify Pro Ativo!</p>
                <p className="text-[11px] opacity-90 font-bold uppercase tracking-wider">Acesso Ilimitado Liberado</p>
              </div>
              <button onClick={() => setShowSuccessToast(false)} className="hover:opacity-60 p-2"><X size={24} /></button>
            </div>
          </div>
        )}

        {isPreparingPDF && (
          <div className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="flex flex-col items-center max-w-sm text-center">
              <div className="bg-slate-900 w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-6 animate-pulse">
                <FileText size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Construindo Relatório</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6">
                Sincronizando as 6 páginas estratégicas com Plano Estratégico e Marca Própria...
              </p>
            </div>
          </div>
        )}

        <header className="sticky top-0 z-40 glass border-b border-gray-200/50 h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">{headerLogo}</div>
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Logado como</p>
                    <p className="text-xs font-bold text-slate-700 leading-none">{currentUser.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Sair"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors"
                >
                  <UserIcon size={18} /> Login
                </button>
              )}

              <button 
                onClick={() => !credits.isPro && setIsUpgradeModalOpen(true)} 
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${credits.isPro ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {credits.isPro ? <><Check size={16} /> Plano Pro</> : <><Crown size={16} className="text-amber-400" /> Upgrade Pro</>}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
          {error && (
            <div className="max-w-2xl mx-auto mb-8 animate-in slide-in-from-top-2 duration-300">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-700">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p className="text-sm font-bold">{error}</p>
                <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><X size={18} /></button>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
              Estratégias SEO com <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${agencyConfig.enabled && credits.isPro ? agencyConfig.primaryColor : '#4f46e5'}, ${agencyConfig.enabled && credits.isPro ? agencyConfig.primaryColor + 'cc' : '#7c3aed'})` }}>Inteligência Pura.</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium mb-8">Análises detalhadas para dominar a primeira página.</p>

            <form onSubmit={handleGenerate} className="relative group max-w-2xl mx-auto mb-4">
              <div className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" style={primaryStyle} />
              <div className="relative flex items-center bg-white rounded-2xl border border-gray-200 shadow-xl p-2">
                <Search className="ml-4 text-slate-400" size={22} />
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Digite sua palavra-chave..." className="w-full pl-4 pr-4 py-4 outline-none text-lg text-slate-700 font-medium bg-transparent" disabled={isLoading} />
                <button type="submit" disabled={isLoading || !keyword.trim()} className="text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg min-w-[140px] hover:brightness-110 active:scale-95" style={primaryStyle}>
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Analisar'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 glass p-2 rounded-2xl border border-gray-200/50">
              <div className="flex flex-wrap gap-1">
                <button onClick={() => setViewMode('guide')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'guide' ? 'bg-white shadow-sm' : 'text-slate-500'}`} style={viewMode === 'guide' ? primaryText : {}}><BookOpen size={18} /> Guia de Uso</button>
                <button onClick={() => setViewMode('perks')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'perks' ? 'bg-white shadow-sm' : 'text-slate-500'}`} style={viewMode === 'perks' ? primaryText : {}}><Gift size={18} /> Parceiros</button>
                <div className="w-px h-6 bg-slate-200 mx-2 self-center" />
                <button onClick={() => setViewMode('agency')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'agency' ? 'bg-white shadow-sm' : 'text-slate-500'}`} style={viewMode === 'agency' ? primaryText : {}}>
                  <Building2 size={18} /> Marca Própria {!credits.isPro && <Lock size={12} className="ml-1" />}
                </button>
                {data && (
                  <>
                    <button onClick={() => setViewMode('cards')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'cards' ? 'bg-white shadow-sm' : 'text-slate-500'}`} style={viewMode === 'cards' ? primaryText : {}}><LayoutGrid size={18} /> Dashboard</button>
                    <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-slate-500'}`} style={viewMode === 'table' ? primaryText : {}}><TableIcon size={18} /> Planilha</button>
                  </>
                )}
              </div>
              {data && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsPreviewOpen(true)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 transition-all"><Eye size={16} /> Preview</button>
                  {credits.isPro ? (
                    <button onClick={handlePrint} disabled={isPreparingPDF} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                      {isPreparingPDF ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />} 
                      Gerar PDF Completo
                    </button>
                  ) : (
                    <button onClick={() => setIsUpgradeModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-xs font-bold hover:bg-amber-100 transition-all"><Crown size={14} /> Liberar PDF</button>
                  )}
                </div>
              )}
            </div>

            {viewMode === 'guide' && <UserGuide />}
            {viewMode === 'perks' && <PartnerPerks />}
            {viewMode === 'agency' && (credits.isPro ? <BrandingSettings config={agencyConfig} onUpdate={setAgencyConfig} /> : (
              <div className="p-20 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-indigo-50 w-24 h-24 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Lock size={40} className="text-indigo-200" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Marca Própria (White Label)</h4>
                <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
                  Gere relatórios profissionais com sua logo e cores para seus clientes por apenas <span className="text-indigo-600 font-black">R$ 29,90/mês</span>.
                </p>
                <button 
                  onClick={() => setIsUpgradeModalOpen(true)} 
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  Ativar Modo PRO Agora
                </button>
              </div>
            ))}
            {data && viewMode === 'cards' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-6 rounded-3xl text-white shadow-xl shadow-slate-100" style={primaryStyle}>
                    <Target className="mb-4 opacity-80" size={32} />
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Intenção</p>
                    <h4 className="text-2xl font-black">{data.searchIntent}</h4>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4" style={primaryText}><Sparkles size={20} /><span className="text-xs font-bold uppercase tracking-wider">Público</span></div>
                    <p className="text-slate-600 font-medium leading-relaxed">{data.targetAudience}</p>
                  </div>
                  {!credits.isPro && <AdUnit type="sidebar" />}
                </div>
                <div className="lg:col-span-3"><ResultsDisplay data={data} showAds={!credits.isPro} /></div>
              </div>
            )}
            {data && viewMode === 'table' && <SEOTable data={data} isPro={credits.isPro} />}
          </div>
        </main>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Modal de Preview do Relatório */}
      {isPreviewOpen && data && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-8 no-print animate-in fade-in duration-300">
          <div className="bg-white rounded-[48px] w-full max-w-5xl h-full flex flex-col shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Prévia do Relatório White Label</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Confira o layout antes de exportar</p>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-colors"><X size={24} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-12 bg-slate-100 custom-scrollbar flex flex-col items-center gap-12">
                <div className="max-w-[210mm] w-full origin-top">
                  <SEOReport data={data} config={agencyConfig} isPreview={true} />
                </div>
             </div>
          </div>
        </div>
      )}

      {isUpgradeModalOpen && (
         <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[150] flex items-center justify-center p-4 no-print">
            <div className="bg-white rounded-[48px] p-0 max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
              <div className="bg-indigo-600 md:w-5/12 p-10 text-white flex flex-col">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-md"><Crown size={32} className="text-amber-300" /></div>
                  <h3 className="text-3xl font-black italic tracking-tighter">Rankify Professional</h3>
                </div>
                <div className="space-y-6 mt-auto">
                  <div className="flex gap-4"><Star size={18} className="text-amber-300 fill-amber-300" /><p className="text-sm font-bold text-indigo-100">Utilizado por +500 agências.</p></div>
                  <div className="flex gap-4"><ShieldCheck size={18} className="text-emerald-300" /><p className="text-sm font-bold text-indigo-100">Garantia total de satisfação.</p></div>
                  <div className="flex gap-4"><TrendingUp size={18} className="text-indigo-300" /><p className="text-sm font-bold text-indigo-100">Rankeamento 3x mais rápido.</p></div>
                </div>
              </div>
              <div className="md:w-7/12 p-10 relative">
                <button onClick={() => setIsUpgradeModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600"><X size={24} /></button>
                <h4 className="text-slate-900 font-black text-xl mb-6">Desbloqueie agora:</h4>
                <div className="space-y-4 mb-8">
                  {[
                    { label: "Análises Ilimitadas", icon: <Zap size={16}/> },
                    { label: "Marca Própria (White Label)", icon: <Building2 size={16}/> },
                    { label: "Plano Estratégico Detalhado", icon: <TrendingUp size={16}/> },
                    { label: "Exportação PDF Sem Ads", icon: <Printer size={16}/> }
                  ].map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-indigo-50 text-indigo-600 p-1.5 rounded-lg">{b.icon}</div>
                      <p className="font-black text-slate-800 text-sm">{b.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 relative">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assinatura Mensal</p>
                   <div className="flex items-baseline justify-between w-full">
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap"><span className="text-3xl font-black text-slate-900">R$ 29,90</span><span className="text-sm font-bold text-slate-400">/mês</span></div>
                      <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Melhor Valor</div>
                   </div>
                </div>

                <a href={STRIPE_PAYMENT_LINK} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl group">Ativar Modo PRO <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></a>
              </div>
            </div>
         </div>
      )}

      <div className="print-only">
        {data && <SEOReport data={data} config={agencyConfig} />}
      </div>
    </>
  );
};

export default App;
