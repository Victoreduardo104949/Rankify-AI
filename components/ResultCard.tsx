
import React from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  content?: string | React.ReactNode;
  copyableText?: string;
  charCount?: number;
  charLimit?: { min: number; max: number };
}

export const ResultCard: React.FC<ResultCardProps> = ({ 
  title, 
  icon, 
  content, 
  copyableText,
  charCount,
  charLimit
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (copyableText) {
      navigator.clipboard.writeText(copyableText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Falha ao copiar texto: ', err);
        });
    }
  };

  const getLimitStatus = () => {
    if (!charLimit || charCount === undefined) return null;
    if (charCount < charLimit.min) return 'too-short';
    if (charCount > charLimit.max) return 'too-long';
    return 'perfect';
  };

  const status = getLimitStatus();

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 p-6 sm:p-8 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            {icon}
          </div>
          <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">{title}</h3>
        </div>
        {copyableText && (
          <button 
            onClick={handleCopy}
            className="text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-xl transition-all"
            title="Copiar texto"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
          </button>
        )}
      </div>
      
      <div className="text-slate-600 leading-relaxed font-medium">
        {content}
      </div>

      {charCount !== undefined && charLimit && (
        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${
              status === 'perfect' ? 'bg-emerald-500' : 'bg-amber-400'
            }`} />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {status === 'perfect' ? 'Tamanho Ideal' : 'Otimize o Tamanho'}
            </span>
          </div>
          <span className={`text-xs font-bold ${
            status === 'perfect' ? 'text-emerald-600' : 'text-slate-400'
          }`}>
            {charCount} / {charLimit.max} chars
          </span>
        </div>
      )}
    </div>
  );
};
