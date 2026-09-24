import React, { useState, useEffect } from 'react';
import { AppLogo } from './AppLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

const LOADING_MESSAGES = [
  'Iniciando assistente inteligente de carreira...',
  'Carregando banco de dados de competências do LinkedIn...',
  'Calibrando métricas de aprovação para robôs ATS...',
  'Preparando ambiente de criação em PDF e Word...',
  'Tudo pronto para impulsionar seu futuro profissional!'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 1400,
}) => {
  const [progress, setProgress] = useState<number>(10);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Incremento suave da barra de progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 10;
        return Math.min(100, prev + step);
      });
    }, 180);

    // Rotação sutil das mensagens institucionais
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  // Quando o progresso atinge 100%, faz fade-out gracioso
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 350);
        return () => clearTimeout(exitTimer);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 40%, #0f172a 0%, #020617 100%)',
      }}
    >
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo Central */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Logo com pulso suave */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-xl animate-pulse" />
          <div className="relative p-3 bg-slate-800/80 border border-slate-700/60 rounded-3xl shadow-2xl backdrop-blur-md">
            <AppLogo size="xl" showText={false} isLight />
          </div>
        </div>

        {/* Título e Subtítulo da Marca */}
        <h1 className="text-2xl font-black tracking-tight text-white mb-1">
          Connect <span className="text-blue-400">Currículo</span> <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">AI</span>
        </h1>
        <p className="text-xs text-slate-400 mb-2 font-medium">
          Plataforma de Alta Performance para Currículos & LinkedIn
        </p>
        <p className="text-[11px] text-blue-400 font-medium mb-8">
          Desenvolvido por Elielson Mourão
        </p>

        {/* Barra de Progresso com Gradiente */}
        <div className="w-full bg-slate-800/90 rounded-full h-2 p-0.5 border border-slate-700/80 shadow-inner mb-3">
          <div
            className="h-full rounded-full bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-200 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Informações de Status */}
        <div className="flex items-center justify-between w-full text-[11px] text-slate-400 font-mono mb-4 px-1">
          <span className="truncate pr-2 text-slate-300 font-sans">
            {LOADING_MESSAGES[messageIndex]}
          </span>
          <span className="font-bold text-sky-400 shrink-0">{progress}%</span>
        </div>

        {/* Botão sutil para pular imediatamente */}
        <button
          type="button"
          onClick={onComplete}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-800/60 border border-transparent hover:border-slate-700"
        >
          <span>Pular introdução</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Rodapé discreto */}
      <div className="absolute bottom-6 text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>Connect Currículo AI · Desenvolvido por Elielson Mourão · Padrão ATS 2026</span>
      </div>
    </div>
  );
};
