
import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight, Loader2, ShieldCheck, Zap, Star } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'success'>('email');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setIsLoading(true);
    
    // Simulação de verificação rápida de backend
    setTimeout(() => {
      const isProEmail = email.includes('pro') || email.includes('admin') || email.includes('agencia');
      const userData: User = {
        email: email,
        isPro: isProEmail,
        token: btoa(email)
      };
      
      setStep('success');
      setIsLoading(false);
      
      setTimeout(() => {
        onLogin(userData);
        onClose();
        setStep('email');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          {step === 'email' ? (
            <>
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
                  <Zap size={32} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Acesso Rápido</h3>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Identifique-se para continuar</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                  <input
                    autoFocus
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 font-bold text-slate-700 outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 shadow-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                    <>Entrar Agora <ArrowRight size={18} /></>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                  Não possui conta PRO? <br/>
                  <span className="text-indigo-600">Acesse créditos gratuitos no modo Guest.</span>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Login Realizado!</h3>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Sincronizando seu Dashboard...</p>
              
              {email.includes('pro') && (
                <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-100">
                  <Star size={14} className="fill-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Usuário PRO Identificado</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
