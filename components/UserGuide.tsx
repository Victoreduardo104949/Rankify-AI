
import React from 'react';
import { 
  Lightbulb, 
  MousePointer2, 
  Layout, 
  Link2, 
  Share2, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Target,
  FileSearch,
  Timer,
  BarChart3,
  Cpu,
  Trophy
} from 'lucide-react';

export const UserGuide: React.FC = () => {
  const implementationSteps = [
    {
      title: "Otimização de Cabeçalhos",
      icon: <Layout className="text-indigo-500" />,
      points: [
        "Use apenas um H1 por página com a palavra-chave.",
        "Mantenha os H2s como subtópicos diretos da keyword.",
        "H3s devem detalhar os subtópicos do H2."
      ]
    },
    {
      title: "Estratégia de CTR",
      icon: <MousePointer2 className="text-blue-500" />,
      points: [
        "Coloque a palavra-chave nos primeiros 50% do Title Tag.",
        "Crie uma Meta Description que instigue a curiosidade.",
        "Use números ou anos no título (ex: 2025) para atualidade."
      ]
    },
    {
      title: "Linkagem de Autoridade",
      icon: <Link2 className="text-emerald-500" />,
      points: [
        "Link para 2-3 páginas internas suas relacionadas.",
        "Link para 1 site de autoridade (.edu, .gov ou grandes portais).",
        "Use textos âncoras descritivos, evite 'clique aqui'."
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both space-y-12 pb-12">
      
      {/* Why Rankify? Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 mb-2">
          <Zap size={14} className="text-indigo-600 fill-indigo-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Por que o Rankify AI?</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Sua estratégia de SEO em <br/>
          <span className="text-indigo-600 italic">segundos, não horas.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
              <Cpu size={24} />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-3">Inteligência Estratégica</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              O Gemini AI analisa não apenas a palavra-chave, mas a intenção semântica profunda, garantindo que você cubra todos os tópicos que o Google espera.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-violet-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-100">
              <BarChart3 size={24} />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-3">Foco em Performance</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Planos prontos para implementação: do Title Tag ao FAQ Schema. Tudo otimizado para aumentar seu CTR e tempo de permanência na página.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
              <Trophy size={24} />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-3">Autoridade de Agência</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Gere relatórios profissionais com sua marca (White Label). Entregue valor imediato para seus clientes com documentos visualmente impecáveis.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Guide */}
      <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-100/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <BookOpen size={240} className="text-indigo-600" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">O Blueprint do Rankeamento</h2>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
            Não basta gerar o plano, a execução é o que separa a primeira página do esquecimento. Siga este roteiro de implementação profissional após gerar sua análise.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main Implementation Path */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Passo a Passo da Implementação</h3>
            {implementationSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm">
                    {step.icon}
                  </div>
                  {idx !== implementationSteps.length - 1 && <div className="w-px h-full bg-slate-100 my-2" />}
                </div>
                <div className="pb-8">
                  <h4 className="text-lg font-bold text-slate-800 mb-4">{step.title}</h4>
                  <ul className="space-y-3">
                    {step.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-500 font-medium leading-relaxed">
                        <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Timer className="text-indigo-400" size={20} /> Dicas Rápidas
                </h4>
                <div className="space-y-4 text-sm text-slate-400 font-medium">
                  <p className="flex items-center gap-2 group-hover:text-slate-200 transition-colors">
                    <ArrowRight size={14} className="text-indigo-500" /> Otimize imagens para &lt; 100kb.
                  </p>
                  <p className="flex items-center gap-2 group-hover:text-slate-200 transition-colors">
                    <ArrowRight size={14} className="text-indigo-500" /> Responda à dúvida principal no início.
                  </p>
                  <p className="flex items-center gap-2 group-hover:text-slate-200 transition-colors">
                    <ArrowRight size={14} className="text-indigo-500" /> Use negrito em termos importantes.
                  </p>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl" />
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8">
              <h4 className="text-red-700 font-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <XCircle size={18} /> Evite Erros Comuns
              </h4>
              <ul className="space-y-3 text-xs text-red-600/80 font-bold leading-relaxed">
                <li className="flex items-start gap-2 italic">
                  <span>•</span> Não repita a palavra-chave sem contexto.
                </li>
                <li className="flex items-start gap-2 italic">
                  <span>•</span> Evite conteúdo duplicado ou copiado.
                </li>
                <li className="flex items-start gap-2 italic">
                  <span>•</span> Não ignore a experiência em dispositivos móveis.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Blueprint */}
        <div className="mt-12 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
               <FileSearch size={32} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-slate-900 font-black">Pronto para o Próximo Nível?</p>
              <p className="text-slate-400 text-sm font-medium">Digite uma palavra-chave acima para gerar sua primeira estratégia completa e dominar a SERP.</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <p className="text-emerald-800 text-sm font-black mb-1">Métrica de Sucesso:</p>
            <p className="text-emerald-600 text-xs font-medium italic">"Seu conteúdo deve ser a melhor resposta existente na internet para essa pesquisa."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
