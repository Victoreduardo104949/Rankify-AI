
import React from 'react';
import { SEOData } from '../types';
import { ResultCard } from './ResultCard';
import { AdUnit } from './AdUnit';
import { 
  Type, 
  Link, 
  Image as ImageIcon, 
  List, 
  Search, 
  FileText, 
  HelpCircle,
  Hash,
  Share2,
  Zap,
  Activity,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ResultsDisplayProps {
  data: SEOData;
  showAds?: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, showAds }) => {
  const HOSTINGER_LINK = 'https://www.hostinger.com.br/rankify';

  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      {/* Alerta de Infraestrutura Técnica - Contextual */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-[32px] p-1 overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-[30px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
            <Activity className="text-indigo-400 animate-pulse" size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-white font-black text-lg mb-1 italic">Check de Viabilidade Técnica</h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              O Google confirmou: sites que usam <span className="text-indigo-300 font-bold">LiteSpeed Cache</span> têm 3x mais chance de rankear para "<span className="text-white italic">{data.h1}</span>".
            </p>
          </div>
          <a 
            href={HOSTINGER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all group"
          >
            Garantir Performance <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Tag */}
        <div className="md:col-span-2">
          <ResultCard
            title="Título da Página"
            icon={<Type size={24} />}
            content={<p className="text-xl font-bold text-slate-900 leading-tight">{data.titleTag}</p>}
            copyableText={data.titleTag}
            charCount={data.titleTag.length}
            charLimit={{ min: 50, max: 60 }}
          />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <ResultCard
            title="Meta Descrição"
            icon={<FileText size={24} />}
            content={<p className="text-slate-600 font-medium leading-relaxed">{data.metaDescription}</p>}
            copyableText={data.metaDescription}
            charCount={data.metaDescription.length}
            charLimit={{ min: 140, max: 160 }}
          />
        </div>

        {/* URL Slug */}
        <ResultCard
          title="URL Amigável"
          icon={<Link size={24} />}
          content={<div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 text-indigo-700 font-mono text-sm break-all font-bold">/{data.slug}</div>}
          copyableText={data.slug}
        />

        {/* H1 */}
        <ResultCard
          title="Tag H1 Principal"
          icon={<Hash size={24} />}
          content={<h1 className="text-xl font-black text-slate-900">{data.h1}</h1>}
          copyableText={data.h1}
        />

        {/* Secondary Keywords */}
        <ResultCard
          title="Termos LSI / Secundários"
          icon={<Search size={24} />}
          content={
            <div className="flex flex-wrap gap-2">
              {data.secondaryKeywords.map((kw, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-xl text-xs font-extrabold border border-indigo-100">
                  {kw}
                </span>
              ))}
            </div>
          }
        />

        {/* Image Alt Texts */}
        <ResultCard
          title="Acessibilidade de Imagens"
          icon={<ImageIcon size={24} />}
          content={
            <div className="space-y-3">
              {data.imageAltSuggestions.map((alt, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-600 bg-slate-50/50 p-2 rounded-xl">
                  <span className="text-indigo-400 font-bold font-mono">#{idx+1}</span>
                  <span className="italic">"{alt}"</span>
                </div>
              ))}
            </div>
          }
        />

        {/* Content Outline */}
        <div className="md:col-span-2">
          <ResultCard
            title="Arquitetura de Conteúdo"
            icon={<List size={24} />}
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {data.contentTopicSuggestions.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 text-[10px] font-black">
                        H{idx < 3 ? '2' : '3'}
                      </div>
                      <span className="text-slate-700 font-semibold">{topic}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-600 p-6 rounded-[32px] text-white shadow-xl shadow-indigo-100 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={18} className="text-indigo-200" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Fator de Velocidade</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed mb-4">
                    Para este tópico, o tempo de resposta do servidor (TTFB) é crucial. Sites lentos perdem 40% dos visitantes antes mesmo do H1 carregar.
                  </p>
                  <a href={HOSTINGER_LINK} target="_blank" className="text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 text-white/80 hover:text-white transition-colors underline">
                    Ver setup otimizado para este conteúdo <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            }
          />
        </div>

        {/* Links */}
        <div className="md:col-span-2">
          <ResultCard
            title="Estratégia de Linkagem"
            icon={<Link size={24} />}
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-4 text-xs uppercase tracking-widest">Âncoras Internas</h4>
                  <div className="space-y-2">
                    {data.internalLinkIdeas.map((link, idx) => (
                      <div key={idx} className="bg-emerald-50/50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-4 text-xs uppercase tracking-widest">Fontes de Autoridade</h4>
                  <div className="space-y-2">
                    {data.externalLinkIdeas.map((link, idx) => (
                      <div key={idx} className="bg-blue-50/50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* FAQ */}
        <div className="md:col-span-2">
          <ResultCard
            title="FAQ (Featured Snippets)"
            icon={<HelpCircle size={24} />}
            content={
              <div className="space-y-6">
                {data.faq.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                    <p className="font-black text-slate-900 mb-2 flex gap-3">
                      <span className="text-indigo-500">P.</span> {item.question}
                    </p>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
