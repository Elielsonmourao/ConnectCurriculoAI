import React, { useState, useRef, useEffect } from 'react';
import { FileText, Download, Printer, RotateCcw, ShieldCheck, Eye, ChevronDown, Home } from 'lucide-react';
import { ATSCheckResult } from '../types';
import { AppLogo } from './AppLogo';

interface HeaderProps {
  atsScore: ATSCheckResult;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isPrinting?: boolean;
  onDownloadDoc: (format?: 'sidebar' | 'classic' | 'modern') => void;
  onReset: () => void;
  isAiOnline: boolean;
  onToggleMobilePreview: () => void;
  showMobilePreview: boolean;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  atsScore,
  onDownloadPDF,
  onPrint,
  isPrinting = false,
  onDownloadDoc,
  onReset,
  isAiOnline,
  onToggleMobilePreview,
  showMobilePreview,
  onGoHome,
}) => {
  const [showDocDropdown, setShowDocDropdown] = useState(false);
  const docDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (docDropdownRef.current && !docDropdownRef.current.contains(event.target as Node)) {
        setShowDocDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-300';
    return 'bg-rose-50 text-rose-700 border-rose-300';
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Logo & Marca (Clicável para voltar à Home) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center text-left cursor-pointer hover:opacity-90 transition-opacity focus:outline-hidden"
            title="Ir para a Tela Inicial (Home)"
          >
            <AppLogo size="md" showText={true} />
          </button>

          {onGoHome && (
            <button
              type="button"
              onClick={onGoHome}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
              title="Voltar para a Tela Inicial"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Início</span>
            </button>
          )}

          <span className="hidden xl:inline-flex items-center text-[11px] font-medium text-slate-500 pl-2 border-l border-slate-200">
            Desenvolvido por <strong className="ml-1 text-slate-700 font-semibold">Elielson Mourão</strong>
          </span>
        </div>

        {/* Status de conexão e Pontuação ATS */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${isAiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
            <span className="hidden md:inline">{isAiOnline ? 'Assistente Conectado' : 'Banco LinkedIn Ativo'}</span>
          </div>

          {/* ATS Score Indicator */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold ${getScoreColor(atsScore.score)}`} title="Qualidade e completude do currículo">
            <ShieldCheck className="w-4 h-4" />
            <span>Qualidade: {atsScore.score}%</span>
          </div>

          {/* Botão para alternar prévia no Mobile */}
          <button
            onClick={onToggleMobilePreview}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showMobilePreview ? 'Editar' : 'Ver Currículo'}</span>
          </button>

          {/* Botões de Ação Direta */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              title="Baixar diretamente em arquivo PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar PDF</span>
            </button>

            <button
              onClick={onPrint}
              disabled={isPrinting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 disabled:bg-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Imprimir documento ou gerar folha A4 para sua impressora"
            >
              <Printer className={`w-3.5 h-3.5 ${isPrinting ? 'animate-spin text-amber-300' : ''}`} />
              <span>{isPrinting ? 'Preparando...' : 'Imprimir'}</span>
            </button>

            {/* Dropdown de Exportação Word */}
            <div className="relative" ref={docDropdownRef}>
              <button
                type="button"
                onClick={() => setShowDocDropdown((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                title="Escolha o modelo de documento Word (.DOC)"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>DOC</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showDocDropdown && (
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Modelos Word (.DOC)
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('modern');
                      setShowDocDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-indigo-50/70 flex flex-col gap-0.5 cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Word Moderno</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">Destaque</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Cabeçalho contemporâneo em bloco e tipografia moderna
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('sidebar');
                      setShowDocDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50/70 flex flex-col gap-0.5 cursor-pointer transition-colors border-t border-slate-100"
                  >
                    <span className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Word com Coluna Lateral</span>
                      <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-bold">1 Página</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Visual idêntico à prévia com barra lateral
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('classic');
                      setShowDocDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50/50 flex flex-col gap-0.5 cursor-pointer transition-colors border-t border-slate-100"
                  >
                    <span className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Word Clássico ATS</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded font-bold">Margem 2,5 cm</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Texto linear com margens de 2,5 cm em todos os lados
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onReset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Restaurar dados de exemplo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
