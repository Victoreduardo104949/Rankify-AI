
import React from 'react';
import { ExternalLink, Info, Activity, Cpu } from 'lucide-react';

interface AdUnitProps {
  type: 'sidebar' | 'horizontal' | 'banner';
}

export const AdUnit: React.FC<AdUnitProps> = ({ type }) => {
  const HOSTINGER_LINK = 'https://www.hostinger.com.br/rankify';

  if (type === 'sidebar') {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Configuração Sugerida</span>
          <Activity size={12} className="text-indigo-400 animate-pulse" />
        </div>
        <div className="aspect-square bg-slate-50 rounded-2xl mb-4 flex items-center justify-center border border-dashed border-slate-200 group-hover:bg-indigo-50/50 transition-colors">
          <div className="text-center p-4">
            <Cpu size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Análise de Latência</p>
          </div>
        </div>
        <h5 className="font-bold text-slate-800 text-sm mb-2">Infraestrutura Hostinger Pro</h5>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">Essencial para suportar o volume de tráfego orgânico previsto nesta estratégia de SEO.</p>
        <a 
          href={HOSTINGER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
        >
          Validar Servidor <ExternalLink size={12} />
        </a>
      </div>
    );
  }

  if (type === 'horizontal') {
    return (
      <div className="w-full bg-indigo-50/30 border border-indigo-100/50 rounded-[32px] p-6 flex flex-col md:flex-row items-center gap-6 my-8">
        <div className="flex-shrink-0 w-full md:w-48 h-32 bg-white rounded-2xl border border-indigo-100 flex items-center justify-center">
           <span className="text-xs font-black text-indigo-300 uppercase tracking-tighter italic">Infra Analysis</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h5 className="font-black text-slate-800">Hostinger LiteSpeed: Upgrade Obrigatório</h5>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            O Google prioriza Core Web Vitals. Sem um servidor LiteSpeed, sua taxa de indexação para estas palavras-chave será reduzida.
          </p>
        </div>
        <a 
          href={HOSTINGER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:-translate-y-1 transition-all"
        >
          Sincronizar Hospedagem
        </a>
      </div>
    );
  }

  return (
    <div className="w-full py-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      {/* Banner removido ou oculto para manter a estética orgânica */}
    </div>
  );
};
