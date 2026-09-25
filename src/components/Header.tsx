import React, { useState, useRef, useEffect } from 'react';
import { FileText, Download, Printer, RotateCcw, ShieldCheck, Eye, ChevronDown, Home, Columns, Edit3, Sun, Moon } from 'lucide-react';
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
  editorViewMode?: 'split' | 'preview' | 'editor';
  onChangeViewMode?: (mode: 'split' | 'preview' | 'editor') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
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
  editorViewMode = 'split',
  onChangeViewMode,
  theme = 'light',
  onToggleTheme,
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
    <header className={`no-print border-b sticky top-0 z-30 shadow-xs transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Logo & Marca (Clicável para voltar à Home) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center text-left cursor-pointer hover:opacity-90 transition-opacity focus:outline-hidden"
            title="Ir para a Tela Inicial (Home)"
          >
            <AppLogo size="md" showText={true} isLight={theme === 'dark'} />
          </button>

          {onGoHome && (
            <button
              type="button"
              onClick={onGoHome}
              className={`hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-transparent hover:border-slate-700'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200'
              }`}
              title="Voltar para a Tela Inicial"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Início</span>
            </button>
          )}

          <span className={`hidden xl:inline-flex items-center text-[11px] font-medium pl-2 border-l ${
            theme === 'dark' ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200'
          }`}>
            Desenvolvido por <strong className={`ml-1 font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Elielson Mourão</strong>
          </span>
        </div>

        {/* Status de conexão e Pontuação ATS */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
            theme === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isAiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
            <span className="hidden md:inline">{isAiOnline ? 'Assistente Conectado' : 'Banco LinkedIn Ativo'}</span>
          </div>

          {/* ATS Score Indicator */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold ${getScoreColor(atsScore.score)}`} title="Qualidade e completude do currículo">
            <ShieldCheck className="w-4 h-4" />
            <span>Qualidade: {atsScore.score}%</span>
          </div>

          {/* Seletor de Modo de Visualização */}
          {onChangeViewMode && (
            <div className={`flex items-center p-0.5 rounded-xl border text-xs ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => onChangeViewMode('split')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold ${
                  editorViewMode === 'split'
                    ? theme === 'dark' ? 'bg-slate-700 text-white shadow-xs font-bold' : 'bg-white text-blue-700 shadow-xs font-bold'
                    : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Modo Dividido: Formulário e Prévia lado a lado"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Dividido</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeViewMode('preview')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold ${
                  editorViewMode === 'preview'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : theme === 'dark' ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-700'
                }`}
                title="Modo Visualização: Foco total na folha A4 do currículo"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualização</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeViewMode('editor')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold ${
                  editorViewMode === 'editor'
                    ? theme === 'dark' ? 'bg-slate-700 text-white shadow-xs font-bold' : 'bg-white text-blue-700 shadow-xs font-bold'
                    : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Modo Edição: Foco total no formulário"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Edição</span>
              </button>
            </div>
          )}

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
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Escolha o modelo de documento Word (.DOC)"
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>DOC</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showDocDropdown && (
                <div className={`absolute right-0 mt-1 w-64 rounded-xl shadow-lg border py-1.5 z-50 animate-fadeIn ${
                  theme === 'dark' ? 'bg-[#151f32] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className={`px-3 py-1 border-b text-[10px] font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-400'
                  }`}>
                    Modelos Word (.DOC)
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('modern');
                      setShowDocDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 cursor-pointer transition-colors ${
                      theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-indigo-50/70'
                    }`}
                  >
                    <span className={`font-bold flex items-center justify-between ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      <span>Word Moderno</span>
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold">Destaque</span>
                    </span>
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Cabeçalho contemporâneo em bloco e tipografia moderna
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('sidebar');
                      setShowDocDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 cursor-pointer transition-colors border-t ${
                      theme === 'dark' ? 'border-slate-700/80 hover:bg-slate-800' : 'border-slate-100 hover:bg-blue-50/70'
                    }`}
                  >
                    <span className={`font-bold flex items-center justify-between ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      <span>Word com Coluna Lateral</span>
                      <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.2 rounded font-bold">1 Página</span>
                    </span>
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Visual idêntico à prévia com barra lateral
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDownloadDoc('classic');
                      setShowDocDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 cursor-pointer transition-colors border-t ${
                      theme === 'dark' ? 'border-slate-700/80 hover:bg-slate-800' : 'border-slate-100 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span className={`font-bold flex items-center justify-between ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      <span>Word Clássico ATS</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-bold">Margem 2,5 cm</span>
                    </span>
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Texto linear com margens de 2,5 cm em todos os lados
                    </span>
                  </button>
                </div>
              )}
            </div>

            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title={theme === 'dark' ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
                <span className="hidden xl:inline">{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
            )}

            <button
              onClick={onReset}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
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
