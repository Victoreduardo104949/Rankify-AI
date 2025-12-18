
import React from 'react';
import { SEOData } from '../types';
import { Download, Copy, Check, Crown, AlertCircle, Zap, Target, Gauge } from 'lucide-react';

interface SEOTableProps {
  data: SEOData;
  isPro?: boolean;
}

export const SEOTable: React.FC<SEOTableProps> = ({ data, isPro = false }) => {
  const [copiedRow, setCopiedRow] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);

  const getStatus = (content: string, type: string) => {
    const len = content.length;
    if (type === 'title') return len >= 50 && len <= 60 ? 'perfect' : 'warning';
    if (type === 'meta') return len >= 140 && len <= 160 ? 'perfect' : 'warning';
    return 'neutral';
  };

  const rows = [
    { 
      component: 'Título da Página', 
      tag: 'TITLE',
      criteria: '50-60 chars', 
      content: data.titleTag,
      impact: 'Alto',
      type: 'title'
    },
    { 
      component: 'Meta Descrição', 
      tag: 'META',
      criteria: '140-160 chars', 
      content: data.metaDescription,
      impact: 'Alto',
      type: 'meta'
    },
    { 
      component: 'Slug da URL', 
      tag: 'URL',
      criteria: 'Curto / Amigável', 
      content: data.slug,
      impact: 'Médio',
      type: 'slug'
    },
    { 
      component: 'H1 Principal', 
      tag: 'H1',
      criteria: 'Foco Keyword', 
      content: data.h1,
      impact: 'Alto',
      type: 'h1'
    },
    { 
      component: 'Intenção de Busca', 
      tag: 'INTENT',
      criteria: 'Alinhamento Google', 
      content: data.searchIntent,
      impact: 'Crítico',
      type: 'intent'
    }
  ];

  const handleCopyRow = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedRow(idx);
    setTimeout(() => setCopiedRow(null), 2000);
  };

  const copyAllToClipboard = () => {
    const text = rows.map(r => `${r.component} [${r.tag}]:\n${r.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Premium */}
      <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
            <Gauge size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Auditoria Estratégica
              <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md uppercase tracking-widest font-black">v2.0</span>
            </h3>
            <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
              <Zap size={14} className="text-amber-400 fill-amber-400" /> 
              Pronto para implementação direta no CMS
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={copyAllToClipboard} 
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${
              copiedAll ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {copiedAll ? <><Check size={16} /> Copiado!</> : <><Copy size={16} /> Copiar Todos</>}
          </button>
          
          <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isPro ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            <Download size={16} /> Exportar CSV {!isPro && <Crown size={12} className="ml-1 text-amber-500" />}
          </button>
        </div>
      </div>
      
      {/* Banner PRO Contextual */}
      {!isPro && (
        <div className="bg-indigo-600 px-8 py-3 flex items-center justify-between text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
            <Target size={14} className="text-indigo-200" />
            Planilha White Label e exportação CSV disponível no plano PRO
          </p>
          <button className="text-[10px] font-black underline uppercase tracking-widest hover:text-indigo-200 transition-colors">Upgrade Ilimitado</button>
        </div>
      )}

      {/* Tabela de Alta Performance */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-400 uppercase text-[10px] font-black tracking-[0.25em]">
              <th className="pl-10 pr-6 py-6 border-b border-slate-100">Componente / Tag</th>
              <th className="px-6 py-6 border-b border-slate-100">Status</th>
              <th className="px-6 py-6 border-b border-slate-100">Impacto</th>
              <th className="px-6 py-6 border-b border-slate-100">Métrica de Otimização</th>
              <th className="px-6 py-6 border-b border-slate-100">Sugestão Gerada</th>
              <th className="pr-10 pl-6 py-6 border-b border-slate-100 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((row, idx) => {
              const status = getStatus(row.content, row.type);
              return (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-all duration-300 group">
                  <td className="pl-10 pr-6 py-7">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{row.component}</span>
                      <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">TAG: &lt;{row.tag}&gt;</span>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    {status === 'perfect' ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg w-fit">
                        <Check size={12} className="stroke-[4px]" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Ideal</span>
                      </div>
                    ) : status === 'warning' ? (
                      <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg w-fit">
                        <AlertCircle size={12} className="stroke-[4px]" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Ajustar</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-3 py-1 rounded-lg w-fit">
                        <span className="text-[10px] font-black uppercase tracking-tighter">Info</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-7">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      row.impact === 'Alto' || row.impact === 'Crítico' ? 'text-rose-500' : 'text-indigo-400'
                    }`}>
                      {row.impact}
                    </span>
                  </td>
                  <td className="px-6 py-7">
                    <span className="text-slate-400 font-bold italic text-xs">{row.criteria}</span>
                  </td>
                  <td className="px-6 py-7">
                    <div className="max-w-md">
                      <p className="text-slate-700 font-bold leading-relaxed">{row.content}</p>
                      {(row.type === 'title' || row.type === 'meta') && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${status === 'perfect' ? 'bg-emerald-500' : 'bg-amber-400'}`} 
                              style={{ width: `${Math.min((row.content.length / (row.type === 'title' ? 60 : 160)) * 100, 100)}%` }} 
                            />
                          </div>
                          <span className="text-[9px] font-black text-slate-300 tabular-nums">{row.content.length}ch</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="pr-10 pl-6 py-7 text-right">
                    <button 
                      onClick={() => handleCopyRow(row.content, idx)}
                      className={`p-3 rounded-xl transition-all shadow-sm ${
                        copiedRow === idx 
                        ? 'bg-emerald-500 text-white rotate-0' 
                        : 'bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md'
                      }`}
                    >
                      {copiedRow === idx ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer da Planilha */}
      <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                  {i}
                </div>
              ))}
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Auditoria validada pela Engine de IA Rankify
           </p>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Strategic Sheet v2.0
        </p>
      </div>
    </div>
  );
};
