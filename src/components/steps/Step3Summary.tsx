import React from 'react';
import { CVData, LinkedInRoleTemplate } from '../../types';
import { Sparkles, CheckCircle2, AlertCircle, Info, Check, Copy } from 'lucide-react';

interface Step3Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  currentRoleTemplate?: LinkedInRoleTemplate;
}

export const Step3Summary: React.FC<Step3Props> = ({ cvData, onChange, currentRoleTemplate }) => {
  const charCount = cvData.summary ? cvData.summary.length : 0;
  const isOptimal = charCount >= 100 && charCount <= 450;

  return (
    <div className="space-y-5">
      
      {/* GUIA EXPLICATIVO PARA O RESUMO */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Como Escrever seu Resumo Profissional
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          O resumo é um pequeno parágrafo de 3 a 5 linhas que resume quem você é profissionalmente. Pense nele como uma resposta rápida para a pergunta: <em>"Fale um pouco sobre você e o que você faz"</em>.
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>1ª frase:</strong> Sua área de atuação ou formação (ex: <em>"Profissional com formação técnica em Eletromecânica pelo SENAI..."</em>).
          </li>
          <li>
            <strong>2ª frase:</strong> Suas principais habilidades práticas ou ferramentas que domina (ex: <em>"Experiência prática em manutenção preventiva, montagem de painéis..."</em>).
          </li>
          <li>
            <strong>3ª frase:</strong> Sua atitude e disposição de trabalho (ex: <em>"Comprometido com a segurança, trabalho em equipe e busca contínua por resultados..."</em>).
          </li>
        </ul>
        <p className="text-[11px] text-blue-900/90 pt-1">
          💡 <strong>Dica Prática:</strong> Você não precisa começar do zero! Veja abaixo os modelos prontos selecionados especialmente para <strong>{currentRoleTemplate?.roleName || 'seu cargo'}</strong>.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Seu Resumo Profissional
            </h3>
            <p className="text-xs text-slate-500">
              Escreva ou edite seu texto abaixo:
            </p>
          </div>

          {/* Indicador de Caracteres */}
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${isOptimal ? 'text-emerald-600' : 'text-slate-500'}`}>
              {charCount} caracteres
            </span>
            {isOptimal ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <span className="text-[11px] text-slate-400 font-normal">(tamanho ideal: 120 a 400 letras)</span>
            )}
          </div>
        </div>

        <div>
          <textarea
            rows={5}
            value={cvData.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder={`Digite aqui o resumo sobre você para ${currentRoleTemplate?.roleName || 'sua área'} ou consulte as sugestões e modelos do Centro de IA abaixo...`}
            className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all leading-relaxed text-slate-800 bg-white"
          />
        </div>
      </div>

    </div>
  );
};

