import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  isLight?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  isLight = false,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 38, text: 'text-base', sub: 'text-[10px]' },
    lg: { icon: 52, text: 'text-xl', sub: 'text-xs' },
    xl: { icon: 72, text: 'text-2xl', sub: 'text-sm' },
    '2xl': { icon: 96, text: 'text-3xl', sub: 'text-base' },
  };

  const { icon, text, sub } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Ícone Vetorial Exclusivo */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-300"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Gradiente da Folha Base */}
            <linearGradient id="cv-logo-base" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            {/* Gradiente do Brilho IA / Acento */}
            <linearGradient id="cv-logo-accent" x1="16" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            {/* Gradiente da Dobra da Folha */}
            <linearGradient id="cv-logo-fold" x1="30" y1="4" x2="42" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Sombra suave de fundo do contêiner */}
          <rect x="5" y="5" width="38" height="38" rx="10" fill="#0f172a" fillOpacity="0.08" />

          {/* Placa principal com cantos arredondados modernos */}
          <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#cv-logo-base)" />

          {/* Linhas estilizadas de currículo (conteúdo textual minimalista) */}
          <rect x="11" y="14" width="16" height="3.5" rx="1.75" fill="#ffffff" fillOpacity="0.95" />
          <rect x="11" y="21" width="22" height="2.5" rx="1.25" fill="#ffffff" fillOpacity="0.75" />
          <rect x="11" y="27" width="18" height="2.5" rx="1.25" fill="#ffffff" fillOpacity="0.75" />
          <rect x="11" y="33" width="12" height="2.5" rx="1.25" fill="#ffffff" fillOpacity="0.75" />

          {/* Seta Dinâmica de Crescimento / Carreira com Brilho de IA */}
          <path
            d="M37 25L37 35C37 36.1 36.1 37 35 37L25 37"
            stroke="url(#cv-logo-accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 26L37 37"
            stroke="url(#cv-logo-accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Estrela / Faísca de Inteligência Artificial no topo direito */}
          <path
            d="M34 10C34 13.5 31.5 16 28 16C31.5 16 34 18.5 34 22C34 18.5 36.5 16 40 16C36.5 16 34 13.5 34 10Z"
            fill="url(#cv-logo-accent)"
          />
        </svg>
      </div>

      {/* Tipografia da Marca */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${text} ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              Connect <span className="text-blue-600">Currículo</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 rounded">
              AI
            </span>
          </div>
          <span
            className={`font-medium tracking-tight mt-0.5 ${sub} ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Plataforma Inteligente · ATS 2026
          </span>
        </div>
      )}
    </div>
  );
};
