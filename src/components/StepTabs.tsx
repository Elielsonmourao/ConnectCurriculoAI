import React from 'react';
import { Palette, User, FileText, Briefcase, GraduationCap, Wrench, Download, Share2 } from 'lucide-react';

interface StepTabsProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { num: 1, title: 'Estilo & Cargo', icon: Palette, short: 'Cargo' },
  { num: 2, title: 'Dados de Contato', icon: User, short: 'Contato' },
  { num: 3, title: 'Resumo Profissional', icon: FileText, short: 'Resumo' },
  { num: 4, title: 'Experiências', icon: Briefcase, short: 'Experiência' },
  { num: 5, title: 'Formação & Cursos', icon: GraduationCap, short: 'Cursos' },
  { num: 6, title: 'Habilidades', icon: Wrench, short: 'Habilidades' },
  { num: 7, title: 'Finalizar & Baixar', icon: Download, short: 'Baixar' },
  { num: 8, title: 'LinkedIn (Opcional)', icon: Share2, short: 'LinkedIn', isOptional: true },
];

export const StepTabs: React.FC<StepTabsProps> = ({ currentStep, onSelectStep }) => {
  return (
    <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-4 py-2.5">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {STEPS.map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <button
              key={step.num}
              onClick={() => onSelectStep(step.num)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : isDone
                  ? 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : isDone
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step.num}
              </div>
              <span className="hidden md:inline">{step.title}</span>
              <span className="md:hidden">{step.short}</span>
              {step.isOptional && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-normal ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  Opt.
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Barra de progresso linear */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(Math.min(currentStep, 7) / 7) * 100}%` }}
        />
      </div>
    </div>
  );
};
