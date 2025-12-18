
import React, { useRef, useState, useEffect } from 'react';
import { AgencyConfig } from '../types';
import { 
  Building2, 
  Palette, 
  Image as ImageIcon, 
  Save, 
  Check, 
  Globe, 
  Upload, 
  X, 
  MousePointerClick, 
  Mail, 
  Link as LinkIcon, 
  Type,
  Eye,
  Settings2,
  Undo2,
  Target,
  UserCircle,
  FileSearch,
  BookOpen,
  ArrowRight,
  Trophy
} from 'lucide-react';

interface BrandingSettingsProps {
  config: AgencyConfig;
  onUpdate: (config: AgencyConfig) => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ config, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState<AgencyConfig>(config);
  const [saved, setSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'info'>('visual');
  const [previewPage, setPreviewPage] = useState<'capa' | 'manual'>('capa');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(localConfig);
    }, 300);
    return () => clearTimeout(timer);
  }, [localConfig]);

  const handleSave = () => {
    onUpdate(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultConfig: AgencyConfig = {
      name: 'Minha Agência Digital',
      logoUrl: '',
      primaryColor: '#4f46e5',
      contactEmail: 'contato@agencia.com',
      websiteUrl: 'www.agencia.com',
      footerText: 'Estratégia SEO Profissional',
      enabled: false
    };
    setLocalConfig(defaultConfig);
    onUpdate(defaultConfig);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalConfig({ ...localConfig, logoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const colorPresets = [
    { name: 'Rankify', color: '#4f46e5' },
    { name: 'Midnight', color: '#0f172a' },
    { name: 'Emerald', color: '#059669' },
    { name: 'Rose', color: '#e11d48' },
    { name: 'Ocean', color: '#0369a1' },
    { name: 'Amber', color: '#d97706' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both">
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Coluna de Configurações */}
          <div className="lg:w-1/2 p-8 md:p-12 border-r border-slate-50">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 text-white rounded-2xl">
                  <Settings2 size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Studio Agency</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Configuração White Label</p>
                </div>
              </div>
              <button onClick={handleReset} className="p-2 text-slate-300 hover:text-slate-900 transition-colors" title="Resetar para o padrão">
                <Undo2 size={20} />
              </button>
            </div>

            <div className="flex gap-2 mb-8 bg-slate-50 p-1.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'visual' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
              >
                Identidade Visual
              </button>
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
              >
                Dados e Instruções
              </button>
            </div>

            <div className="space-y-8 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {activeTab === 'visual' ? (
                <>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <ImageIcon size={14} /> Seu Logotipo Profissional
                    </label>
                    {!localConfig.logoUrl ? (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file) processFile(file); }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full aspect-[4/1] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                      >
                        <Upload size={24} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-400">Arraste seu logo (PNG ou SVG)</span>
                        <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files?.[0]; if (file) processFile(file); }} className="hidden" accept="image/*" />
                      </div>
                    ) : (
                      <div className="relative group aspect-[4/1] bg-slate-50 rounded-3xl border border-slate-100 p-6 flex items-center justify-center">
                        <img src={localConfig.logoUrl} className="max-h-full object-contain" alt="Logo Preview" />
                        <button onClick={() => setLocalConfig({...localConfig, logoUrl: ''})} className="absolute -top-2 -right-2 bg-slate-900 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Palette size={14} /> Cor de Destaque da Marca
                    </label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {colorPresets.map(p => (
                        <button 
                          key={p.color} 
                          onClick={() => setLocalConfig({...localConfig, primaryColor: p.color})}
                          className={`w-10 h-10 rounded-xl border-2 transition-all ${localConfig.primaryColor === p.color ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: p.color }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <input type="color" value={localConfig.primaryColor} onChange={(e) => setLocalConfig({...localConfig, primaryColor: e.target.value})} className="w-12 h-12 rounded-xl cursor-pointer" />
                      <input type="text" value={localConfig.primaryColor} onChange={(e) => setLocalConfig({...localConfig, primaryColor: e.target.value})} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 font-mono font-bold text-slate-700 uppercase" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Building2 size={14} /> Nome para o Relatório</label>
                    <input type="text" value={localConfig.name} onChange={(e) => setLocalConfig({...localConfig, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700" placeholder="Ex: SEO Master Pro" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Mail size={14} /> E-mail para Suporte do Cliente</label>
                    <input type="email" value={localConfig.contactEmail} onChange={(e) => setLocalConfig({...localConfig, contactEmail: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700" placeholder="agencia@sua.com" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Type size={14} /> Texto de Rodapé (Legal)</label>
                    <input type="text" value={localConfig.footerText} onChange={(e) => setLocalConfig({...localConfig, footerText: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700" placeholder="Copyright © 2025 Sua Agência" />
                  </div>
                </>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div 
                  className={`w-12 h-7 rounded-full transition-all relative ${localConfig.enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  onClick={() => setLocalConfig({...localConfig, enabled: !localConfig.enabled})}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${localConfig.enabled ? 'left-6' : 'left-1'}`} />
                </div>
                <span className="text-sm font-black text-slate-700">Ativar Marca Própria</span>
              </label>
              <button 
                onClick={handleSave}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                {saved ? <><Check size={18} /> Configurado!</> : <><Save size={18} /> Salvar Tudo</>}
              </button>
            </div>
          </div>

          {/* Coluna de Preview Realista */}
          <div className="lg:w-1/2 bg-slate-50/50 p-8 md:p-12 flex flex-col items-center justify-start relative">
            <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm">
               <button 
                onClick={() => setPreviewPage('capa')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewPage === 'capa' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Capa do Relatório
               </button>
               <button 
                onClick={() => setPreviewPage('manual')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewPage === 'manual' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Manual do Cliente
               </button>
            </div>

            <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-right-4 duration-500">
              {previewPage === 'capa' ? (
                <div className="bg-white rounded-lg shadow-2xl border border-slate-100 aspect-[1/1.41] p-10 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full" style={{ backgroundColor: localConfig.primaryColor }} />
                  <div className="flex items-center justify-between mb-16 relative z-10">
                     {localConfig.enabled && localConfig.logoUrl ? (
                      <img src={localConfig.logoUrl} className="h-8 object-contain" />
                    ) : (
                      <div className="h-8 w-24 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest">Sua Logo</div>
                    )}
                    <div className="text-[6px] font-black uppercase tracking-[0.3em] text-slate-300">Entrega Profissional</div>
                  </div>
                  <div className="h-1.5 w-12 mb-6 rounded-full" style={{ backgroundColor: localConfig.primaryColor }} />
                  <h4 className="text-3xl font-black leading-tight mb-3 tracking-tighter italic">Estratégia <br/>SEO Master</h4>
                  <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-10">Preparado por: <span className="text-slate-900">{localConfig.name}</span></p>
                  <div className="mt-auto space-y-6">
                    <div className="flex justify-between items-end border-t border-slate-50 pt-6">
                      <div className="space-y-2">
                        <div className="text-[6px] font-black text-slate-300 uppercase tracking-widest">Data de Emissão</div>
                        <div className="h-4 w-24 bg-slate-50 rounded-lg" />
                      </div>
                      <div className="text-[6px] font-black text-slate-300 text-right uppercase tracking-[0.2em] leading-relaxed">
                        {localConfig.websiteUrl || 'WWW.SUAAGENCIA.COM'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg shadow-2xl border border-slate-100 aspect-[1/1.41] p-8 flex flex-col relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: localConfig.primaryColor }}>
                      <FileSearch size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[12px] font-black text-slate-900 tracking-tighter italic leading-none">Manual do Cliente</h4>
                      <p className="text-[6px] text-slate-400 font-bold uppercase tracking-widest mt-1">Como usar este relatório</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy size={10} style={{ color: localConfig.primaryColor }} />
                      <span className="text-[8px] font-black text-slate-900 uppercase">Instruções de Implementação</span>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-3">
                          <div className="w-5 h-5 rounded bg-slate-50 shrink-0 flex items-center justify-center">
                            <MousePointerClick size={10} style={{ color: localConfig.primaryColor }} />
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 w-20 bg-slate-100 rounded" />
                            <div className="h-1.5 w-full bg-slate-50 rounded" />
                            <div className="h-1.5 w-4/5 bg-slate-50 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center text-[6px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{localConfig.footerText}</span>
                    <span>Página 05 / 05</span>
                  </div>
                </div>
              )}
              <p className="mt-6 text-[10px] text-slate-400 font-bold text-center italic max-w-[300px] mx-auto leading-relaxed">
                Este manual explica ao seu cliente cada termo técnico (Meta Title, H1, LSI) e como ele deve aplicá-los no site dele.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
