
import React from 'react';
import { ExternalLink, Zap, Shield, Globe, Server, CheckCircle2, Gift, Timer, Star } from 'lucide-react';

export const PartnerPerks: React.FC = () => {
  const HOSTINGER_AFFILIATE_LINK = 'https://www.hostinger.com.br/rankify'; // Exemplo de link

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both space-y-8 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#673de6] to-[#4e28c0] rounded-[40px] p-8 md:p-16 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <Star size={16} className="text-yellow-300 fill-yellow-300" />
              <span className="text-xs font-black uppercase tracking-widest text-white/90">Parceria Exclusiva</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
              Sua estratégia merece a <span className="text-yellow-300 underline decoration-wavy underline-offset-8">melhor hospedagem.</span>
            </h2>
            <p className="text-indigo-100 text-lg font-medium mb-8 leading-relaxed max-w-xl">
              Não adianta ter o melhor SEO se o seu site é lento. Garanta 99.9% de uptime e servidores otimizados para WordPress com desconto especial para usuários Rankify.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={HOSTINGER_AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-indigo-950 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-xl shadow-indigo-900/20"
              >
                Resgatar 75% OFF + 3 Meses Grátis <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Hostinger_logo.svg/2560px-Hostinger_logo.svg.png" 
                alt="Hostinger" 
                className="h-8 object-contain"
              />
            </div>
            <div className="space-y-4 w-full">
              {[
                { icon: <Zap className="text-yellow-300" />, text: "Servidores LiteSpeed 10x mais rápidos" },
                { icon: <Globe className="text-yellow-300" />, text: "Domínio Grátis (.com ou .com.br)" },
                { icon: <Shield className="text-yellow-300" />, text: "SSL Grátis Ilimitado" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  {item.icon}
                  <span className="font-bold text-sm text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Hostinger Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Server size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">SEO Technical Ready</h4>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            A Hostinger entrega os melhores scores de Core Web Vitals do mercado, essencial para subir no ranking do Google.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Gift size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Bônus Especial AI</h4>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Ao assinar pelo Rankify, você ganha o Criador de Sites com IA da Hostinger para subir seu projeto em minutos.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <Timer size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Urgência de Rankeamento</h4>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Não espere amanhã. Sites rápidos rankeiam mais rápido. Comece hoje mesmo sua jornada para o topo.
          </p>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-slate-900 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-yellow-300">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-white font-black text-lg">Garantia de Reembolso de 30 Dias</p>
            <p className="text-slate-400 text-sm font-medium">Experimente sem riscos a melhor hospedagem do mundo.</p>
          </div>
        </div>
        <a 
          href={HOSTINGER_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-indigo-600 hover:text-white transition-all whitespace-nowrap"
        >
          Ver Planos Hostinger
        </a>
      </div>
    </div>
  );
};
