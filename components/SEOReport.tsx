
import React from 'react';
import { SEOData, AgencyConfig } from '../types';
import { 
  Target, 
  Layers, 
  HelpCircle, 
  Zap, 
  Mail, 
  Globe, 
  Link as LinkIcon, 
  Image as ImageIcon,
  ChevronRight,
  LayoutList,
  CheckCircle2,
  MousePointer2,
  FileSearch,
  Trophy,
  ArrowRight,
  Calendar,
  BarChart3,
  TrendingUp,
  Clock
} from 'lucide-react';

interface SEOReportProps {
  data: SEOData;
  config: AgencyConfig;
  isPreview?: boolean;
}

export const SEOReport: React.FC<SEOReportProps> = ({ data, config, isPreview = false }) => {
  const primaryColor = config.enabled ? config.primaryColor : '#4f46e5';
  const containerClass = isPreview ? "w-full bg-white text-slate-900 font-sans shadow-2xl" : "w-full bg-white text-slate-900 font-sans";

  return (
    <div 
      className={containerClass}
      style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as any}
    >
      {/* PÁGINA 1: CAPA */}
      <div className="min-h-[296mm] flex flex-col justify-between p-20 border-[24px] bg-white relative overflow-hidden" style={{ borderColor: primaryColor }}>
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" style={{ backgroundColor: primaryColor }} />
        <div className="flex items-center justify-between relative z-10">
          {config.enabled && config.logoUrl ? (
            <img src={config.logoUrl} alt={config.name} className="h-16 object-contain" />
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Zap size={28} fill="currentColor" />
              </div>
              <span className="text-3xl font-black tracking-tight">Rankify AI</span>
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Relatório Estratégico de SEO</p>
            <p className="text-xs font-black px-4 py-1.5 bg-slate-900 text-white rounded-full inline-block">PLANO DE DOMÍNIO SERP</p>
          </div>
        </div>
        <div className="max-w-4xl py-12">
          <p className="text-lg font-black uppercase tracking-[0.4em] mb-6" style={{ color: primaryColor }}>Análise e Planejamento</p>
          <h1 className="text-7xl font-black leading-[1.1] tracking-tighter mb-12 italic">
            Blueprint de <br/>
            Ranqueamento: <br/>
            <span className="opacity-40">"{data.h1}"</span>
          </h1>
          <div className="grid grid-cols-2 gap-16 mt-20">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Consultoria Responsável</p>
              <p className="text-xl font-bold">{config.enabled ? config.name : 'Rankify Intelligence Systems'}</p>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Data de Emissão</p>
              <p className="text-xl font-bold">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-2xl" style={{ backgroundColor: primaryColor }}>
              <Target size={40} />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Intenção de Busca</p>
              <p className="text-3xl font-black tracking-tight">{data.searchIntent}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}></div>

      {/* PÁGINA 2: METADADOS */}
      <div className="p-20 min-h-[296mm] flex flex-col">
        <div className="flex items-center gap-6 mb-16">
           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
             <Layers size={28} />
           </div>
           <div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic">01. Metadados e URL</h2>
             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Otimização On-Page & CTR Engine</p>
           </div>
        </div>
        <div className="space-y-12">
          <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100 relative">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Título da Página (Meta Title)</p>
            <p className="text-3xl font-black text-slate-900 leading-tight mb-6">{data.titleTag}</p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Meta Description</p>
            <p className="text-xl font-medium text-slate-700 leading-relaxed italic mb-4">"{data.metaDescription}"</p>
          </div>
        </div>
        <div className="mt-auto pt-10 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>{config.enabled ? config.name : 'Rankify AI'}</span>
           <span>Página 02 / 06</span>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}></div>

      {/* PÁGINA 3: ARQUITETURA */}
      <div className="p-20 min-h-[296mm] flex flex-col">
        <div className="flex items-center gap-6 mb-16">
           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
             <LayoutList size={28} />
           </div>
           <div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic">02. Estrutura e Semântica</h2>
             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Hierarquia de Tópicos & Termos LSI</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Outline de Conteúdo</h3>
            <div className="space-y-4">
              {data.contentTopicSuggestions.map((topic, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: primaryColor }}>
                    H{i < 3 ? '2' : '3'}
                  </div>
                  <span className="font-bold text-slate-700">{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Palavras Secundárias</h3>
              <div className="flex flex-wrap gap-2">
                {data.secondaryKeywords.map((kw, i) => <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-black text-slate-600">{kw}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-10 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>{config.enabled ? config.name : 'Rankify AI'}</span>
           <span>Página 03 / 06</span>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}></div>

      {/* PÁGINA 4: FAQ E LINKS */}
      <div className="p-20 min-h-[296mm] flex flex-col">
        <div className="flex items-center gap-6 mb-16">
           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
             <HelpCircle size={28} />
           </div>
           <div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic">03. Autoridade e FAQ</h2>
             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Featured Snippets & Backlinks</p>
           </div>
        </div>
        <div className="space-y-8">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Featured Snippets (FAQ)</h3>
          <div className="space-y-6">
            {data.faq.map((item, i) => (
              <div key={i} className="bg-white border-l-8 pl-8 py-4 border-slate-100">
                <p className="text-lg font-black text-slate-900 mb-2">{item.question}</p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-10 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>{config.enabled ? config.name : 'Rankify AI'}</span>
           <span>Página 04 / 06</span>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}></div>

      {/* PÁGINA 5: PLANO ESTRATÉGICO (NOVA) */}
      <div className="p-20 min-h-[296mm] flex flex-col bg-slate-900 text-white">
        <div className="flex items-center gap-6 mb-16">
           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg bg-white">
             <TrendingUp size={28} />
           </div>
           <div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Plano Estratégico</h2>
             <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest mt-1">Cronograma de Ações e KPIs</p>
           </div>
        </div>

        <div className="flex-1 space-y-12">
          <div className="grid grid-cols-1 gap-8">
            {data.strategicPlan.map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex gap-8 items-start relative group">
                <div className="absolute top-0 right-0 p-6 opacity-20 text-[60px] font-black italic">{idx + 1}</div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                   <Clock size={24} style={{ color: primaryColor }} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">{step.phase}</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                      step.priority === 'Crítica' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>Prioridade {step.priority}</span>
                  </div>
                  <h4 className="text-2xl font-black mb-4">{step.task}</h4>
                  <div className="h-1 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-600 p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10"><BarChart3 size={120} /></div>
             <h3 className="text-2xl font-black mb-6 flex items-center gap-3 italic"><TrendingUp size={24} /> KPIs para Monitoramento</h3>
             <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 opacity-60">Visibilidade</p>
                   <p className="text-xl font-bold italic">Impressões Google</p>
                </div>
                <div className="space-y-2 border-l border-white/20 pl-8">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 opacity-60">Interação</p>
                   <p className="text-xl font-bold italic">CTR Orgânico</p>
                </div>
                <div className="space-y-2 border-l border-white/20 pl-8">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 opacity-60">Conversão</p>
                   <p className="text-xl font-bold italic">Tráfego Qualificado</p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-auto pt-10 border-t border-white/10 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <span>PLANO ESTRATÉGICO EXCLUSIVO</span>
           <span>Página 05 / 06</span>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}></div>

      {/* PÁGINA 6: MANUAL DO CLIENTE */}
      <div className="p-20 min-h-[296mm] flex flex-col bg-slate-50">
        <div className="flex items-center gap-6 mb-12">
           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
             <FileSearch size={28} />
           </div>
           <div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic">Manual de Implementação</h2>
             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Orientações de Execução Técnica</p>
           </div>
        </div>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white p-12 rounded-[48px] shadow-xl border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Trophy size={24} style={{ color: primaryColor }} /> Como implementar os dados
            </h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0"><MousePointer2 size={24} style={{ color: primaryColor }} /></div>
                <div>
                  <h4 className="text-lg font-black text-slate-800">Meta Dados</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Copie e cole os metadados da Página 02 nas configurações de SEO do seu site.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-10 border-t border-slate-200 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>{config.enabled ? config.footerText : 'Rankify AI Strategic Intelligence'}</span>
           <span>Página 06 / 06</span>
        </div>
      </div>
    </div>
  );
};
